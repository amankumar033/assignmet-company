# Quick Start Guide

## 🚀 Getting Started in 3 Steps

### Step 1: Install Dependencies

**Frontend:**
```bash
npm install
```

**Backend:**
```bash
cd backend
npm install
cd ..
```

### Step 2: Start Backend Server

Open Terminal 1:
```bash
cd backend
npm run dev
```

Wait for: `🚀 Server ready at http://localhost:4000/graphql`

### Step 3: Start Frontend Server

Open Terminal 2:
```bash
npm run dev
```

Visit: `http://localhost:3000`

## 🔐 Login Credentials

**Admin (Full Access):**
- Username: `admin`
- Password: `admin123`

**Employee (View Only):**
- Username: `employee`
- Password: `emp123`

## ✨ Features to Test

1. **Hamburger Menu** - Click the animated menu button (top-left)
2. **Horizontal Menu** - Navigate using the colorful menu bar
3. **Grid View** - See employees in a 10-column table
4. **Tile View** - Switch to card-based view using the toggle button
5. **Employee Details** - Click any employee to see full details
6. **Action Buttons** - Use the ⋯ button on tiles for Edit/Flag/Delete (Admin only)
7. **Hover Effects** - Hover over any button, card, or row to see animations

## 🎨 Design Highlights

- Modern gradient backgrounds (purple, pink, indigo)
- Smooth animations on all interactions
- Beautiful hover effects throughout
- Color-coded attendance indicators
- Responsive design for all screen sizes

## 🛠️ Troubleshooting

**Backend not connecting?**
- Make sure backend is running on port 4000
- Check console for CORS errors
- Verify GraphQL endpoint: `http://localhost:4000/graphql`

**Build errors?**
- Run `npm install` again
- Clear `.next` folder: `rm -rf .next` (or delete manually on Windows)
- Check Node.js version (18+ required)

**Login not working?**
- Make sure backend is running
- Check browser console for errors
- Try refreshing the page

Enjoy exploring the application! 🎉




