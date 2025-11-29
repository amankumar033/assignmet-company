## Employee Management System – Technical & Interview Guide

### 1. High-level overview

This project is a small **Employee Management System** built as a **full-stack GraphQL application**:

- **Frontend**: Next.js (App Router), React, TypeScript, Apollo Client, Tailwind-based styling.
- **Backend**: Node.js, Express, Apollo Server (GraphQL), in-memory data store for employees and users.
- **Auth**: Username/password authentication with **JWT tokens**, role-based access control (**ADMIN** vs **EMPLOYEE**).
- **Domain**: Managing employees and their attributes (name, age, class, subjects, attendance) with a modern dashboard UI for admins and a simplified portal for employees.

There are **two main roles**:

- **ADMIN**: Full access – view employees, analytics, reports, create/update employees, etc.
- **EMPLOYEE**: Limited view – their own portal, analytics overview, reports, and settings; no direct access to CRUD on employees.

---

### 2. Tech stack in detail

#### 2.1 Frontend

- **Framework**: `next` (Next.js App Router, version 16)
  - Gives file-based routing under the `app/` directory.
  - Server-side and client-side rendering; here, most interactive pages are `'use client'` components.
- **Language**: `react`, `react-dom` with TypeScript configuration via `tsconfig.json`.
- **GraphQL client**: `@apollo/client`
  - Manages queries, mutations, and caching on the client.
  - Central client created in `lib/apollo-client.ts` and provided app-wide via `app/providers.tsx`.
- **Styling**:
  - Tailwind CSS v4 (via `tailwindcss` and `@tailwindcss/postcss`) with project-specific global styles in `app/globals.css`.
  - Custom utility classes like `card-float`, `shadow-soft`, etc. for the UI theme.
- **Fonts**:
  - `Geist` and `Geist_Mono` via `next/font/google` used to style the entire app in `app/layout.tsx`.

#### 2.2 Backend

Backend lives under `backend/`:

- **Runtime / Framework**:
  - Node.js + Express (`express`).
  - `apollo-server-express` to host a GraphQL API at `/graphql`.
- **GraphQL**:
  - `graphql` – schema and resolvers implemented in:
    - `backend/schema.js` – GraphQL type definitions.
    - `backend/resolvers.js` – Resolver functions and business logic.
- **Auth and security**:
  - `jsonwebtoken` – issue and verify JWTs.
  - `bcryptjs` – hash and compare passwords for demo users.
  - `dotenv` – load `JWT_SECRET` and other env vars (fallback default secret in dev).
  - `cors` – allow requests from the frontend.
- **Data layer**:
  - `global.employees` – in-memory array of employees seeded in `backend/server.js`.
  - `dataloader` – a `DataLoader` instance to batch load employees by ID.

> Note: In production, the in-memory store would be replaced with a proper database (e.g., PostgreSQL, MongoDB).

---

### 3. Routes and pages (frontend)

All routes are in the `app/` directory (Next.js App Router):

- `/` – **Dashboard**
  - Component: `app/page.tsx`.
  - **Role-aware**:
    - **ADMIN**
      - Shows four stats cards (Total Employees, Avg Attendance, Excellent, Needs Improvement).
      - Displays **Employees Overview** with a **Grid / Tile** toggle using:
        - `EmployeeGridView` for a table-like grid.
        - `EmployeeTileView` for card tiles.
      - Each row/tile supports **Edit / Flag / Delete** actions (currently demo alerts).
      - Includes admin-focused **Quick Actions**: New Employee, Employee Directory, Manage Attendance, View Reports.
    - **EMPLOYEE**
      - Shows a simpler “Employee Portal” dashboard:
        - Card: Analytics (single-employee style stats with attendance and performance).
        - Card: Reports.
        - Card: Settings.
      - Employee-specific **Quick Actions**: Open Analytics, View Reports, Open Settings (no employees CRUD).

- `/login` – **Login choice page**
  - Component: `app/login/page.tsx`.
  - Shows “Admin Login” and “Employee Login” cards.
  - Redirects to `/` if a JWT token already exists in `localStorage`.

- `/login/admin` – **Admin login**
  - Component: `app/login/admin/page.tsx`.
  - Uses `LOGIN_MUTATION` (GraphQL) to authenticate.
  - Saves `token` and `user` to `localStorage`.
  - Verifies user has `role === 'ADMIN'`, else shows error.

- `/login/employee` – **Employee login**
  - Component: `app/login/employee/page.tsx`.
  - Same mutation and flow, but enforces `role === 'EMPLOYEE'`.

- `/employees` – **Employees listing**
  - Component: `app/employees/page.tsx`.
  - For admins:
    - Grid/tile view toggle for employees (re-uses `EmployeeGridView` and `EmployeeTileView`).
    - Edit / Flag / Delete actions available.
  - For employees:
    - They can still view employees, but edit/delete actions are disabled unless `role === 'ADMIN'`.

- `/employees/add` – **Add employee**
  - Component: `app/employees/add/page.tsx` (form to add an employee for admins).
  - Uses `addEmployee` mutation (admin-only).

- `/employees/reports` – **Employees-specific reports**
  - Component: `app/employees/reports/page.tsx` (if present; referenced in menu).

- `/analytics` – **Analytics**
  - Component: `app/analytics/page.tsx`.
  - Uses `GET_EMPLOYEES` query to build charts:
    - Attendance trends bar lines.
    - Age distribution segments.

- `/reports` – **General reports**
  - Component: `app/reports/page.tsx`.
  - Shows cards for Attendance Report, Performance Report, Department Report.

- `/settings` – **Settings shell**
  - Route folder: `app/settings/`.
  - Subpages:
    - `/settings/profile` – Profile settings page.
    - `/settings/preferences` – Preferences (theme, etc.) page.

- `/help` – **Help page**
  - Component: `app/help/page.tsx`.

---

### 4. Layout, navigation & hamburger menus

#### 4.1 Root layout

File: `app/layout.tsx`

- Sets HTML structure and fonts.
- Wraps the app in `Providers` (ApolloProvider) and `RouteProgress` (top progress bar + toasts).

```tsx
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="...">
        <Providers>
          <RouteProgress />
          {children}
        </Providers>
      </body>
    </html>
  );
}
```

#### 4.2 Auth-aware page layout

File: `app/components/Layout.tsx`

- Client component that:
  - Reads `token` and `user` from `localStorage`.
  - If missing and not on `/login` routes, redirects to `/login`.
  - Prevents rendering until initialization is complete.
- Role-aware header:
  - Shows **Employee Management** for admins, **Employee Portal** for employees.
  - Includes:
    - `HamburgerMenu` for side navigation.
    - Top navigation bar:
      - Admin: Home, Employees, Analytics, Reports, Settings.
      - Employee: Home, Analytics, Reports, Settings (no Employees tab).
    - User info (username + role pill).
    - Logout button: clears `token` and `user` in `localStorage` and shows login modal (and redirect behavior via Layout).

#### 4.3 Hamburger menu (admin vs employee)

File: `app/components/HamburgerMenu.tsx`

- Reads `user` from `localStorage` to determine `role`.
- Menu items:
  - Dashboard → `/`.
  - Employees submenu:
    - **Admin**:
      - All Employees → `/employees`
      - Add Employee → `/employees/add`
      - Reports → `/employees/reports`
    - **Employee**:
      - Only Reports → `/employees/reports` (no All Employees / Add Employee).
  - Settings submenu:
    - Profile → `/settings/profile`
    - Preferences → `/settings/preferences`
  - Help → `/help`
- Uses transitions and gradients to match the theme.

---

### 5. Authentication and session handling

#### 5.1 Backend auth (JWT)

Backend uses **JWT tokens** created in `backend/resolvers.js`:

- On `login` mutation:
  - Validates a user from in-memory `users` using `bcrypt.compareSync`.
  - If valid, signs a token via `jwt.sign`:
    - Payload: `{ id, username, role }`.
    - Secret: `process.env.JWT_SECRET` or fallback `'your-super-secret-jwt-key-change-in-production'`.
    - `expiresIn: '24h'`.
- On `register` mutation:
  - Creates a new user in memory and issues a similar token.

Token type: **standard JWT** (no refresh tokens).  
Role is embedded in the token payload and later used for authorization checks.

#### 5.2 Context and resolvers

In `backend/server.js`, `ApolloServer` is configured so that on each request:

- The `Authorization` header is read: `Bearer <token>`.
- If present, the token is verified using `jwt.verify`.
- The decoded payload (user info) is attached to `context.user`.
- Resolvers use:
  - `requireAuth(context)` to enforce login.
  - `requireAdmin(context)` to enforce admin-only operations.

The `employees` query requires auth, and `addEmployee` / `updateEmployee` require admin.

#### 5.3 Frontend auth flow

1. **User logs in** (admin or employee):
   - On `/login/admin` or `/login/employee`, submits a username/password.
   - Sends `login` mutation with credentials to GraphQL.
   - On success:
     - Stores `token` and `user` in `localStorage`.
     - Redirects to `/` (dashboard).

2. **Apollo Client attaches token to all GraphQL calls**:
   - In `lib/apollo-client.ts`, `authLink` uses `setContext` to read the token from `localStorage` and add:
     - `Authorization: Bearer <token>` to each request.

3. **Layout enforces session**:
   - `Layout` checks for `token` and `user` on mount.
   - If not available and not on a login route, it redirects to `/login`.
   - This effectively acts as a simple **session guard** using localStorage instead of http-only cookies.

#### 5.4 Browser caching and session

- **Apollo InMemoryCache**:
  - The GraphQL responses are cached in memory by `InMemoryCache`.
  - This cache lives as long as the page is open; it is not persisted to localStorage by default.
- **Session state**:
  - Persistence across reloads is via `localStorage`:
    - `token` – JWT for auth.
    - `user` – JSON string with id, username, and role.
  - On page load:
    - Layout reads `localStorage` to decide if the user is logged in.
    - Apollo client reuses the token from `localStorage` for new GraphQL requests.

There is no server-side session store; the JWT is the source of truth, and `localStorage` is the persistence mechanism.

---

### 6. Data model and GraphQL schema

#### 6.1 Employee type

From `backend/schema.js`:

- `Employee`:
  - `id: ID!`
  - `name: String!`
  - `age: Int!`
  - `class: String!`
  - `subjects: [String!]!`
  - `attendance: Int!` (percentage).

#### 6.2 Pagination, filtering, sorting

- **EmployeeConnection**:
  - `employees: [Employee!]!`
  - `totalCount: Int!`
  - `page`, `pageSize`
  - `hasNextPage`, `hasPreviousPage`

- **Filtering (EmployeeFilter)**:
  - `class`, `minAge`, `maxAge`, `minAttendance`, `name` (search by substring).

- **Sorting (SortInput)**:
  - `field: SortField!` where `SortField` ∈ { NAME, AGE, CLASS, ATTENDANCE }.
  - `order: SortOrder!` where `SortOrder` ∈ { ASC, DESC }.

#### 6.3 Queries and mutations

**Queries**:

- `employees(filter, page, pageSize, sort): EmployeeConnection!`
- `employee(id: ID!): Employee`
- `me: User` – returns current user info based on token.

**Mutations**:

- `addEmployee(input: EmployeeInput!): Employee!` (ADMIN only).
- `updateEmployee(id: ID!, input: EmployeeUpdateInput!): Employee!` (ADMIN only).
- `login(username: String!, password: String!): AuthPayload!`
- `register(username: String!, password: String!, role: Role!): AuthPayload!`

---

### 7. Frontend components and data flow

#### 7.1 Apollo Client setup

File: `lib/apollo-client.ts`

- `createHttpLink` – points to `http://localhost:4000/graphql`.
- `authLink` – wraps `httpLink` and injects `Authorization` header if a `token` exists.
- `ApolloClient`:
  - `link: from([authLink, httpLink])`
  - `cache: new InMemoryCache()`
  - `defaultOptions` with `errorPolicy: 'all'`.

#### 7.2 Dashboard (`app/page.tsx`)

- `GET_EMPLOYEES` query (first 10 employees) to compute stats and show table or cards.
- Uses `useQuery` to fetch data when the dashboard loads.
- For admins:
  - Stats cards:
    - Total employees.
    - Average attendance.
    - Count of excellent vs needs-improvement employees.
  - Employees Overview:
    - `viewMode` state: `'grid' | 'tile'`.
    - `EmployeeGridView` (table with columns and actions).
    - `EmployeeTileView` (card tiles).
    - `EmployeeDetailView` as a modal for details.
- For employees:
  - Simplified cards only (Analytics, Reports, Settings).

#### 7.3 Employee grid “floating” hover effect

File: `app/components/EmployeeGridView.tsx`

- Each `<tr>` row has hover styles:
  - `hover:bg-blue-50/60`
  - `hover:-translate-y-1`
  - `hover:shadow-soft-lg`
  - `hover:border hover:border-blue-200/80`
- This makes rows appear to **float and pop out** when the mouse hovers over them, matching your design request.

#### 7.4 Route progress bar & toasts

File: `app/components/RouteProgress.tsx`

- Listens to:
  - `usePathname()` changes.
  - `document` click events on `<a>` elements.
- Behavior:
  - Starts a progress bar at the top (3px high) with blue gradient.
  - Increments progress to near 90% while “loading”.
  - Reaches 100% after a short time, then hides.
  - Shows toast notifications:
    - `Loading page...` during navigation.
    - `Page loaded` once complete.

---

### 8. How data flows: end-to-end examples

#### 8.1 Admin logs in and sees dashboard

1. Admin visits `/login/admin`.
2. Enters `admin` / `admin123`.
3. `LOGIN_MUTATION` sends credentials to the GraphQL `login` resolver.
4. Resolver checks hashed password, signs a JWT, and returns `{ token, user }`.
5. Frontend stores `token` and `user` in `localStorage`.
6. Browser navigates to `/`.
7. `Layout`:
   - Reads `token` and `user` from `localStorage`.
   - Confirms user is logged in and `role === 'ADMIN'`.
8. `Dashboard` calls `GET_EMPLOYEES` with the `Authorization: Bearer <token>` header attached by Apollo.
9. Backend `employees` resolver:
   - Uses `requireAuth` to check token and user.
   - Reads `global.employees`, applies filter/sort/pagination.
   - Returns `EmployeeConnection`.
10. Frontend renders stats and the grid/tile view.

#### 8.2 Admin adds a new employee

1. Admin navigates via:
   - Top nav **Employees** → `/employees`, or
   - Hamburger menu → Employees → Add Employee → `/employees/add`.
2. Fill in the add form and submit.
3. The form calls `addEmployee` mutation.
4. Backend `addEmployee`:
   - Calls `requireAdmin(context)`, which uses the JWT in `context.user`.
   - Pushes a new record into `global.employees`.
5. Apollo cache updates or refetch occurs, and new employee appears in lists.

#### 8.3 Employee views analytics

1. Employee logs in through `/login/employee` using `employee` / `emp123`.
2. Token + user are saved to `localStorage` with `role: 'EMPLOYEE'`.
3. Visiting `/analytics`:
   - `Layout` allows access because token is present.
   - `AnalyticsPage` calls `GET_EMPLOYEES` (employees query).
4. Backend `employees` resolver:
   - Uses `requireAuth` only (no admin requirement), so employees can read aggregate data.
5. Employee sees charts and distribution data, but not CRUD operations.

---

### 9. Interview questions based on this project

#### 9.1 High-level / architecture

1. **Explain the overall architecture of this Employee Management System.**
2. **Why did you choose Next.js with Apollo Client for the frontend instead of a traditional CRA (Create React App)?**
3. **What are the pros and cons of using GraphQL vs REST in this context?**
4. **How does the App Router in Next.js differ from the Pages Router, and why is it suitable here?**

#### 9.2 Frontend-specific

5. **How does the `Layout` component enforce authentication for all pages?**
6. **What is the role of `Providers` and `ApolloProvider` in this app?**
7. **How does the `RouteProgress` component detect route changes and show loading progress?**
8. **Explain how the grid / tile view switch works for the Employees overview.**
9. **How is role-based UI implemented (ADMIN vs EMPLOYEE) on the dashboard and navigation?**
10. **What are the trade-offs of using `localStorage` for storing JWTs versus http-only cookies?**

#### 9.3 Backend / GraphQL

11. **Walk through the `employees` query resolver and explain filter, sort, and pagination.**
12. **How do you enforce admin-only operations in the backend?**
13. **How is the JWT token generated and what claims does it contain?**
14. **How is the token validated on each request and how is the user attached to the GraphQL context?**
15. **What is DataLoader and how is it used in this project?**
16. **How would you migrate this from an in-memory data store to a real database?**

#### 9.4 Authentication & security

17. **Describe the login flow from the login form to the backend and back to the client.**
18. **What would you change to make the authentication more secure for production?**
19. **How is role-based access implemented on the frontend and backend layers?**
20. **What risks exist when storing JWT tokens in `localStorage`, and how could you mitigate them?**

#### 9.5 Performance & caching

21. **How does Apollo Client cache responses, and how does that affect user experience?**
22. **How might you handle cache invalidation after mutations like `addEmployee` or `updateEmployee`?**
23. **How could you optimize the GraphQL queries for larger datasets?**
24. **What benefits does DataLoader provide in GraphQL backends?**

#### 9.6 Testing & extensibility

25. **How would you write tests for the `employees` resolver?**
26. **How would you add features like pagination controls on the frontend?**
27. **If you had to add a “Departments” feature, how would you extend the schema and UI?**
28. **What steps would you take to deploy this app to production (both frontend and backend)?**

---

### 10. How to present this project in an interview

- Start with the **problem**: managing employees, attendance, and analytics in a clean admin dashboard and employee portal.
- Explain the **architecture**:
  - Next.js frontend with Apollo and Tailwind.
  - Node/Express backend with Apollo Server and GraphQL.
  - JWT-based authentication and role-based access control.
- Walk through a **typical flow**:
  - Admin login → see dashboard → view employees → add/update employee → check analytics and reports.
- Emphasize:
  - **Clean separation of concerns** (frontend vs backend).
  - **Role-based UX** (different dashboards and menus).
  - **Reusable components** like `EmployeeGridView`, `EmployeeTileView`, `EmployeeDetailView`, `Layout`, `HamburgerMenu`.
  - **GraphQL schema design** with filter, sort, pagination.
- End with potential **future improvements**:
  - Move to a real database.
  - Use refresh tokens and http-only cookies.
  - Add more granular permissions.
  - Add tests and CI/CD pipeline.


