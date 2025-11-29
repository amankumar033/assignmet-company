# Employee Management System

A modern, full-stack employee management application built with Next.js, React, GraphQL, and Node.js. Features a beautiful, responsive UI with smooth animations and hover effects.

## Features

### Frontend
- ✅ **Hamburger Menu** with one-level sub-menu navigation
- ✅ **Horizontal Menu** with sample menu items
- ✅ **Grid View** - Beautiful 10-column table displaying employee data
- ✅ **Tile View** - Card-based layout with essential employee information
- ✅ **Employee Detail View** - Expanded popup/modal showing complete employee details
- ✅ **View Toggle** - Seamless switching between grid and tile views
- ✅ **Action Buttons** - Edit, Flag, and Delete options on each tile
- ✅ **Modern UI** - Gradient backgrounds, smooth animations, and hover effects throughout
- ✅ **Authentication** - Login system with role-based access control

### Backend
- ✅ **GraphQL API** - Complete GraphQL schema with queries and mutations
- ✅ **Employee Data Model** - ID, name, age, class, subjects, attendance
- ✅ **Queries**:
  - List employees with optional filters
  - Get single employee details
  - Paginated employee list
- ✅ **Mutations**:
  - Add new employee (Admin only)
  - Update employee (Admin only)
- ✅ **Pagination & Sorting** - Full pagination and sorting support
- ✅ **Authentication & Authorization** - JWT-based auth with role-based access (Admin/Employee)
- ✅ **Performance Optimization** - DataLoader for batch loading, efficient queries

## Tech Stack

### Frontend
- **Next.js 16** - React framework
- **React 19** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS 4** - Styling
- **Apollo Client** - GraphQL client

### Backend
- **Node.js** - Runtime
- **Express** - Web framework
- **Apollo Server Express** - GraphQL server
- **GraphQL** - Query language
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **DataLoader** - Performance optimization

## Getting Started

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. **Install Frontend Dependencies**
   ```bash
   npm install
   ```

2. **Install Backend Dependencies**
   ```bash
   cd backend
   npm install
   cd ..
   ```

### Running the Application

1. **Start the Backend Server** (Terminal 1)
   ```bash
   cd backend
   npm run dev
   ```
   The GraphQL server will start on `http://localhost:4000/graphql`

2. **Start the Frontend Server** (Terminal 2)
   ```bash
   npm run dev
   ```
   The application will be available at `http://localhost:3000`

### Demo Credentials

**Admin Account:**
- Username: `admin`
- Password: `admin123`
- Access: Full access including add/edit/delete operations

**Employee Account:**
- Username: `employee`
- Password: `emp123`
- Access: View-only access (no add/edit/delete)

## Project Structure

```
assignmet-company/
├── app/                    # Next.js app directory
│   ├── components/         # React components
│   │   ├── HamburgerMenu.tsx
│   │   ├── HorizontalMenu.tsx
│   │   ├── LoginModal.tsx
│   │   ├── EmployeeGridView.tsx
│   │   ├── EmployeeTileView.tsx
│   │   └── EmployeeDetailView.tsx
│   ├── page.tsx           # Main page
│   ├── layout.tsx         # Root layout
│   ├── providers.tsx      # Apollo Provider
│   ├── types.ts           # TypeScript types
│   └── globals.css         # Global styles
├── backend/                # GraphQL backend
│   ├── server.js          # Express + Apollo Server
│   ├── schema.js          # GraphQL schema
│   ├── resolvers.js       # GraphQL resolvers
│   └── middleware/        # Auth middleware
├── lib/                    # Utilities
│   └── apollo-client.ts   # Apollo Client setup
└── package.json
```

## Key Features Explained

### Hamburger Menu
- Animated hamburger icon that transforms to X when opened
- Slide-in navigation panel with gradient background
- One-level sub-menu support for nested navigation
- Smooth animations and hover effects

### Grid View
- 10-column table layout showing all employee data
- Color-coded attendance indicators
- Hover effects on rows
- Click to view details

### Tile View
- Card-based layout with employee avatars
- Action menu button (⋯) on each tile
- Edit, Flag, Delete options (role-based)
- Beautiful gradient overlays on hover

### Employee Detail View
- Full-screen modal/popup
- Complete employee information display
- Performance metrics visualization
- Action buttons for admin users
- Smooth animations and transitions

## GraphQL Queries & Mutations

### Queries

**Get Employees (with pagination, sorting, filtering)**
```graphql
query GetEmployees($page: Int, $pageSize: Int, $sort: SortInput, $filter: EmployeeFilter) {
  employees(page: $page, pageSize: $pageSize, sort: $sort, filter: $filter) {
    employees {
      id
      name
      age
      class
      subjects
      attendance
    }
    totalCount
    page
    pageSize
    hasNextPage
    hasPreviousPage
  }
}
```

**Get Single Employee**
```graphql
query GetEmployee($id: ID!) {
  employee(id: $id) {
    id
    name
    age
    class
    subjects
    attendance
  }
}
```

### Mutations

**Login**
```graphql
mutation Login($username: String!, $password: String!) {
  login(username: $username, password: $password) {
    token
    user {
      id
      username
      role
    }
  }
}
```

**Add Employee (Admin only)**
```graphql
mutation AddEmployee($input: EmployeeInput!) {
  addEmployee(input: $input) {
    id
    name
    age
    class
    subjects
    attendance
  }
}
```

**Update Employee (Admin only)**
```graphql
mutation UpdateEmployee($id: ID!, $input: EmployeeUpdateInput!) {
  updateEmployee(id: $id, input: $input) {
    id
    name
    age
    class
    subjects
    attendance
  }
}
```

## Performance Optimizations

1. **DataLoader** - Batch loading of employees to prevent N+1 queries
2. **Pagination** - Efficient data loading with page-based pagination
3. **Caching** - Apollo Client caching for reduced network requests
4. **Optimized Queries** - Only fetch required fields

## Design Highlights

- **Modern Gradient Backgrounds** - Purple, pink, and indigo gradients throughout
- **Smooth Animations** - Fade-in, scale-in, slide-in animations
- **Hover Effects** - Interactive elements respond to user interaction
- **Responsive Design** - Works on desktop, tablet, and mobile
- **Color-Coded Status** - Visual indicators for attendance and performance
- **Beautiful Typography** - Clean, readable fonts with proper hierarchy

## Building for Production

```bash
# Build the frontend
npm run build

# Start production server
npm start
```

## Notes

- The backend uses in-memory storage for demo purposes. In production, connect to a database (MongoDB, PostgreSQL, etc.)
- JWT secret should be changed in production environment
- CORS is enabled for development. Configure appropriately for production

## License

This project is created for assignment purposes.
