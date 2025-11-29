const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const DataLoader = require('dataloader');

// In-memory user store (in production, use a database)
const users = [
  {
    id: '1',
    username: 'admin',
    password: bcrypt.hashSync('admin123', 10),
    role: 'ADMIN'
  },
  {
    id: '2',
    username: 'employee',
    password: bcrypt.hashSync('emp123', 10),
    role: 'EMPLOYEE'
  }
];

// DataLoader for batch loading employees (performance optimization)
const employeeLoader = new DataLoader(async (ids) => {
  const employees = global.employees || [];
  return ids.map(id => employees.find(emp => emp.id === id) || null);
});

// Helper function to check authentication
function requireAuth(context) {
  if (!context.user) {
    throw new Error('Authentication required');
  }
  return context.user;
}

// Helper function to check admin role
function requireAdmin(context) {
  const user = requireAuth(context);
  if (user.role !== 'ADMIN') {
    throw new Error('Admin access required');
  }
  return user;
}

// Helper function for pagination
function paginate(array, page, pageSize) {
  const start = (page - 1) * pageSize;
  const end = start + pageSize;
  return {
    data: array.slice(start, end),
    totalCount: array.length,
    page,
    pageSize,
    hasNextPage: end < array.length,
    hasPreviousPage: page > 1
  };
}

// Helper function for sorting
function sortEmployees(employees, sort) {
  if (!sort) return employees;
  
  const sorted = [...employees];
  sorted.sort((a, b) => {
    let aVal, bVal;
    
    switch (sort.field) {
      case 'NAME':
        aVal = a.name.toLowerCase();
        bVal = b.name.toLowerCase();
        break;
      case 'AGE':
        aVal = a.age;
        bVal = b.age;
        break;
      case 'CLASS':
        aVal = a.class.toLowerCase();
        bVal = b.class.toLowerCase();
        break;
      case 'ATTENDANCE':
        aVal = a.attendance;
        bVal = b.attendance;
        break;
      default:
        return 0;
    }
    
    if (aVal < bVal) return sort.order === 'ASC' ? -1 : 1;
    if (aVal > bVal) return sort.order === 'ASC' ? 1 : -1;
    return 0;
  });
  
  return sorted;
}

// Helper function for filtering
function filterEmployees(employees, filter) {
  if (!filter) return employees;
  
  return employees.filter(emp => {
    if (filter.class && emp.class !== filter.class) return false;
    if (filter.minAge && emp.age < filter.minAge) return false;
    if (filter.maxAge && emp.age > filter.maxAge) return false;
    if (filter.minAttendance && emp.attendance < filter.minAttendance) return false;
    if (filter.name && !emp.name.toLowerCase().includes(filter.name.toLowerCase())) return false;
    return true;
  });
}

const resolvers = {
  Query: {
    employees: (parent, args, context) => {
      requireAuth(context);
      
      let employees = global.employees || [];
      
      // Apply filters
      employees = filterEmployees(employees, args.filter);
      
      // Apply sorting
      employees = sortEmployees(employees, args.sort);
      
      // Apply pagination
      const paginated = paginate(employees, args.page, args.pageSize);
      
      return {
        employees: paginated.data,
        totalCount: paginated.totalCount,
        page: paginated.page,
        pageSize: paginated.pageSize,
        hasNextPage: paginated.hasNextPage,
        hasPreviousPage: paginated.hasPreviousPage
      };
    },
    
    employee: (parent, args, context) => {
      requireAuth(context);
      // Use DataLoader for performance optimization
      return employeeLoader.load(args.id);
    },
    
    me: (parent, args, context) => {
      if (!context.user) return null;
      return {
        id: context.user.id,
        username: context.user.username,
        role: context.user.role
      };
    }
  },
  
  Mutation: {
    addEmployee: (parent, args, context) => {
      requireAdmin(context);
      
      const newEmployee = {
        id: String(global.employees.length + 1),
        ...args.input
      };
      
      global.employees.push(newEmployee);
      return newEmployee;
    },
    
    updateEmployee: (parent, args, context) => {
      requireAdmin(context);
      
      const index = global.employees.findIndex(emp => emp.id === args.id);
      if (index === -1) {
        throw new Error('Employee not found');
      }
      
      global.employees[index] = {
        ...global.employees[index],
        ...args.input
      };
      
      // Clear DataLoader cache for this employee
      employeeLoader.clear(args.id);
      
      return global.employees[index];
    },
    
    login: (parent, args) => {
      const user = users.find(u => u.username === args.username);
      if (!user || !bcrypt.compareSync(args.password, user.password)) {
        throw new Error('Invalid credentials');
      }
      
      const token = jwt.sign(
        { id: user.id, username: user.username, role: user.role },
        process.env.JWT_SECRET || 'your-super-secret-jwt-key-change-in-production',
        { expiresIn: '24h' }
      );
      
      return {
        token,
        user: {
          id: user.id,
          username: user.username,
          role: user.role
        }
      };
    },
    
    register: (parent, args) => {
      // Check if user already exists
      if (users.find(u => u.username === args.username)) {
        throw new Error('Username already exists');
      }
      
      const newUser = {
        id: String(users.length + 1),
        username: args.username,
        password: bcrypt.hashSync(args.password, 10),
        role: args.role
      };
      
      users.push(newUser);
      
      const token = jwt.sign(
        { id: newUser.id, username: newUser.username, role: newUser.role },
        process.env.JWT_SECRET || 'your-super-secret-jwt-key-change-in-production',
        { expiresIn: '24h' }
      );
      
      return {
        token,
        user: {
          id: newUser.id,
          username: newUser.username,
          role: newUser.role
        }
      };
    }
  }
};

module.exports = resolvers;


