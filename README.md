# 🚀 Employee Management System

A full-stack **Employee Management System** built using **Next.js, Apollo Client, GraphQL, and Node.js**, featuring role-based access, interactive UI components, and clean API architecture.

---

## 🌐 Live Deployment

| Service | Status | URL |
|---------|--------|-----|
| Frontend (Vercel) | ✅ Live | https://ultraship-test.vercel.app/ |
| Backend (Render) | 🚀 Live | https://assignmet-company.onrender.com/graphql |

---

## 🛠 Tech Stack

### **Frontend**
- Next.js (App Router)
- React
- TypeScript
- Apollo Client
- Tailwind CSS
- JWT Authentication

### **Backend**
- Node.js
- Express.js
- Apollo Server (GraphQL)
- JWT Auth + bcryptjs
- DataLoader (Optimization)
- In-memory database (Schema ready for MongoDB/PostgreSQL)

### **Deployment / DevOps**
- Frontend hosted on **Vercel**
- Backend hosted on **Render**
- Environment Variables (secured in .env)
- GitHub for Version Control

---

## 📂 Project Structure

assignmet-company/
├── app/ # Next.js App Router pages
│ ├── components/ # UI components
│ ├── apollo-client.ts # Apollo client config
│ └── globals.css
├── backend/ # GraphQL backend
│ ├── server.js # Express + Apollo setup
│ ├── schema.js # GraphQL typeDefs
│ └── resolvers.js # Business logic
└── lib/ # Helpers / constants