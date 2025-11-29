const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Employee {
    id: ID!
    name: String!
    age: Int!
    class: String!
    subjects: [String!]!
    attendance: Int!
  }

  type EmployeeConnection {
    employees: [Employee!]!
    totalCount: Int!
    page: Int!
    pageSize: Int!
    hasNextPage: Boolean!
    hasPreviousPage: Boolean!
  }

  input EmployeeInput {
    name: String!
    age: Int!
    class: String!
    subjects: [String!]!
    attendance: Int!
  }

  input EmployeeUpdateInput {
    name: String
    age: Int
    class: String
    subjects: [String!]
    attendance: Int
  }

  input EmployeeFilter {
    class: String
    minAge: Int
    maxAge: Int
    minAttendance: Int
    name: String
  }

  enum SortField {
    NAME
    AGE
    CLASS
    ATTENDANCE
  }

  enum SortOrder {
    ASC
    DESC
  }

  input SortInput {
    field: SortField!
    order: SortOrder!
  }

  type AuthPayload {
    token: String!
    user: User!
  }

  type User {
    id: ID!
    username: String!
    role: Role!
  }

  enum Role {
    ADMIN
    EMPLOYEE
  }

  type Query {
    # Get all employees with optional filters, pagination, and sorting
    employees(
      filter: EmployeeFilter
      page: Int = 1
      pageSize: Int = 10
      sort: SortInput
    ): EmployeeConnection!
    
    # Get a single employee by ID
    employee(id: ID!): Employee
    
    # Get current user info (for auth check)
    me: User
  }

  type Mutation {
    # Add a new employee (Admin only)
    addEmployee(input: EmployeeInput!): Employee!
    
    # Update an existing employee (Admin only)
    updateEmployee(id: ID!, input: EmployeeUpdateInput!): Employee!
    
    # Login mutation
    login(username: String!, password: String!): AuthPayload!
    
    # Register mutation (for demo purposes)
    register(username: String!, password: String!, role: Role!): AuthPayload!
  }
`;

module.exports = typeDefs;

