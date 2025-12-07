# How Data Storage Works Without a Database

## Overview
This application uses **in-memory storage** instead of a database. This means all data is stored in JavaScript arrays/objects in the server's RAM (memory). This is fine for development and demos, but **data is lost when the server restarts**.

---

## How Employee Data is Stored

### 1. Initial Setup (server.js)

```javascript
// In-memory data store (in production, use a database)
const employees = [
  {
    id: '1',
    name: 'John Doe',
    age: 28,
    class: 'Engineering',
    subjects: ['Mathematics', 'Physics', 'Computer Science'],
    attendance: 95
  },
  // ... more employees
];

// Make employees available to resolvers
global.employees = employees;
```

**What happens:**
- When the server starts, an array of 10 employees is created in memory
- This array is stored in `global.employees` (a global variable accessible everywhere in Node.js)
- The data exists only in the server's RAM

---

## How Adding an Employee Works

### Step-by-Step Flow:

#### 1. Frontend sends GraphQL mutation:
```graphql
mutation {
  addEmployee(input: {
    name: "New Employee"
    age: 25
    class: "Engineering"
    subjects: ["Math", "Physics"]
    attendance: 90
  }) {
    id
    name
  }
}
```

#### 2. Backend receives mutation (resolvers.js):
```javascript
addEmployee: (parent, args, context) => {
  requireAdmin(context);  // Check if user is admin
  
  // Create new employee object
  const newEmployee = {
    id: String(global.employees.length + 1),  // Auto-generate ID
    ...args.input  // Spread all input fields
  };
  
  // Add to the in-memory array
  global.employees.push(newEmployee);
  
  return newEmployee;
}
```

**What happens:**
- The new employee object is created
- It's **pushed** into the `global.employees` array
- The array now has one more item
- The new employee is immediately available for queries

#### 3. Data is now in memory:
```javascript
global.employees = [
  // ... existing employees
  {
    id: '11',  // Auto-generated
    name: "New Employee",
    age: 25,
    class: "Engineering",
    subjects: ["Math", "Physics"],
    attendance: 90
  }
]
```

---

## How Querying Works

### When you query employees:

```graphql
query {
  employees {
    employees {
      id
      name
      age
    }
  }
}
```

### Backend process (resolvers.js):

```javascript
employees: (parent, args, context) => {
  requireAuth(context);  // Check authentication
  
  // Get the in-memory array
  let employees = global.employees || [];
  
  // Apply filters (if any)
  employees = filterEmployees(employees, args.filter);
  
  // Apply sorting (if any)
  employees = sortEmployees(employees, args.sort);
  
  // Apply pagination
  const paginated = paginate(employees, args.page, args.pageSize);
  
  return {
    employees: paginated.data,
    totalCount: paginated.totalCount,
    // ... pagination info
  };
}
```

**What happens:**
1. Reads from `global.employees` array (in memory)
2. Applies filters, sorting, pagination using JavaScript array methods
3. Returns the filtered/sorted/paginated results

---

## Key Points

### ✅ What Works:
- **Adding employees**: Data is added to the array immediately
- **Reading employees**: Data is read from the array
- **Updating employees**: Array items are modified in place
- **Filtering/Sorting**: JavaScript array methods (`filter`, `sort`, `slice`)
- **Pagination**: JavaScript `slice()` method

### ❌ Limitations:
1. **Data is lost on server restart**: When the server restarts, `global.employees` resets to the initial 10 employees
2. **No persistence**: Data doesn't survive server crashes or deployments
3. **Single server only**: If you have multiple server instances, each has its own memory
4. **Memory limits**: Large datasets will consume server RAM

---

## Data Flow Diagram

```
┌─────────────┐
│  Frontend   │
│  (React)    │
└──────┬──────┘
       │
       │ GraphQL Mutation: addEmployee
       ▼
┌─────────────────────────────────────┐
│  Backend (Node.js Server)           │
│                                     │
│  global.employees = [              │
│    { id: '1', name: 'John', ... }, │
│    { id: '2', name: 'Jane', ... },  │
│    ...                              │
│  ]                                  │
│                                     │
│  addEmployee mutation:              │
│  1. Create new employee object      │
│  2. global.employees.push(newEmp)  │
│  3. Return new employee             │
└─────────────────────────────────────┘
       │
       │ Response with new employee
       ▼
┌─────────────┐
│  Frontend   │
│  Updates UI │
└─────────────┘
```

---

## How It's Different from a Database

### With Database (Production):
```javascript
// Would use something like:
await db.employees.insert(newEmployee);  // Saved to disk
const employees = await db.employees.find();  // Read from disk
```
- Data is saved to disk (persistent)
- Survives server restarts
- Can handle millions of records
- Multiple servers can share the same data

### Without Database (Current):
```javascript
global.employees.push(newEmployee);  // Saved to RAM only
const employees = global.employees;  // Read from RAM
```
- Data is only in RAM (temporary)
- Lost on server restart
- Limited by server memory
- Each server instance has separate data

---

## Where Data Lives

### In Memory:
- **Location**: Server's RAM (Random Access Memory)
- **Variable**: `global.employees` (global array)
- **Type**: JavaScript Array of Objects
- **Lifetime**: Only while server is running

### Example in Memory:
```
Server RAM:
┌─────────────────────────────────────┐
│ global.employees = [                 │
│   { id: '1', name: 'John', ... },    │
│   { id: '2', name: 'Jane', ... },    │
│   { id: '11', name: 'New', ... }     │ ← Just added
│ ]                                    │
└─────────────────────────────────────┘
```

---

## Summary

1. **Storage**: JavaScript array (`global.employees`) in server RAM
2. **Adding**: `global.employees.push(newEmployee)` - adds to array
3. **Reading**: `global.employees` - reads from array
4. **Updating**: Modifies array item in place
5. **Persistence**: ❌ None - data lost on restart
6. **Best for**: Development, demos, testing
7. **Not for**: Production applications

---

## To Add Real Database Later

You would replace:
```javascript
global.employees.push(newEmployee);
```

With:
```javascript
await EmployeeModel.create(newEmployee);  // MongoDB/Mongoose
// OR
await db.query('INSERT INTO employees ...');  // SQL
```

The GraphQL schema and resolvers structure would stay the same, only the data access layer changes!

