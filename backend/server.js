 const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const cors = require('cors');
require('dotenv').config();

const typeDefs = require('./schema');
const resolvers = require('./resolvers');
const { authenticateToken } = require('./middleware/auth');

const app = express();
app.use(cors());
app.use(express.json());

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
  {
    id: '2',
    name: 'Jane Smith',
    age: 32,
    class: 'Management',
    subjects: ['Business', 'Economics', 'Leadership'],
    attendance: 88
  },
  {
    id: '3',
    name: 'Mike Johnson',
    age: 25,
    class: 'Engineering',
    subjects: ['Mathematics', 'Physics', 'Chemistry'],
    attendance: 92
  },
  {
    id: '4',
    name: 'Sarah Williams',
    age: 30,
    class: 'Design',
    subjects: ['Design Principles', 'UI/UX', 'Typography'],
    attendance: 90
  },
  {
    id: '5',
    name: 'David Brown',
    age: 27,
    class: 'Engineering',
    subjects: ['Mathematics', 'Algorithms', 'Data Structures'],
    attendance: 94
  },
  {
    id: '6',
    name: 'Emily Davis',
    age: 29,
    class: 'Management',
    subjects: ['Business', 'Marketing', 'Finance'],
    attendance: 87
  },
  {
    id: '7',
    name: 'Chris Wilson',
    age: 26,
    class: 'Engineering',
    subjects: ['Mathematics', 'Physics', 'Software Engineering'],
    attendance: 96
  },
  {
    id: '8',
    name: 'Lisa Anderson',
    age: 31,
    class: 'Design',
    subjects: ['Design Principles', 'Color Theory', 'Illustration'],
    attendance: 91
  },
  {
    id: '9',
    name: 'Robert Taylor',
    age: 33,
    class: 'Management',
    subjects: ['Business', 'Strategy', 'Operations'],
    attendance: 89
  },
  {
    id: '10',
    name: 'Amanda Martinez',
    age: 24,
    class: 'Engineering',
    subjects: ['Mathematics', 'Physics', 'Machine Learning'],
    attendance: 93
  }
];

// Make employees available to resolvers
global.employees = employees;

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    // Extract token from request headers
    const token = req.headers.authorization?.replace('Bearer ', '') || null;
    let user = null;
    
    if (token) {
      try {
        const jwt = require('jsonwebtoken');
        user = jwt.verify(token, process.env.JWT_SECRET || 'your-super-secret-jwt-key-change-in-production');
      } catch (err) {
        // Invalid token
      }
    }
    
    return { user, employees };
  },
  formatError: (err) => {
    return {
      message: err.message,
      code: err.extensions?.code || 'INTERNAL_ERROR'
    };
  }
});

async function startServer() {
  await server.start();
  server.applyMiddleware({ app, path: '/graphql' });
  
  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => {
    console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`);
  });
}

startServer().catch(console.error);


