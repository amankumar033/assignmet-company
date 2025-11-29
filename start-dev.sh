#!/bin/bash

# Start backend server in background
echo "Starting backend server..."
cd backend
npm run dev &
BACKEND_PID=$!

# Wait a bit for backend to start
sleep 3

# Start frontend server
echo "Starting frontend server..."
cd ..
npm run dev

# Kill backend when frontend stops
kill $BACKEND_PID



