README - Full-Stack Authentication App
Overview

This is a full-stack authentication application built using React, TypeScript, Express.js, Prisma ORM, and PostgreSQL. It includes user login with JWT authentication, React Hook Form for form handling, and Zod for validation.

Tech Stack

Frontend:
React (Vite)
TypeScript
Tailwind CSS
React Hook Form (form validation)
Zod (schema validation)
React Query (API requests)
Backend:
Node.js
Express.js
Prisma ORM (PostgreSQL database)
TypeScript
Zod (input validation)
bcryptjs (password hashing)
jsonwebtoken (JWT authentication)


Installation and Setup

1. Clone the Repository
git clone https://github.com/yourusername/auth-app.git
cd auth-app
2. Backend Setup
Navigate to the backend folder:
cd backend
Install dependencies:
npm install
Configure environment variables:
Create a .env file in the backend directory and add the following:
DATABASE_URL="postgresql://user:password@localhost:5432/auth_db"
JWT_SECRET="your_secret_key"
Run database migrations:
npx prisma migrate dev --name init
Start the backend server:
npm run dev
The API will be available at http://localhost:5001/api.
3. Frontend Setup
Navigate to the frontend folder:
cd ..
cd frontend
Install dependencies:
npm install
Create an .env file and add the API URL:
VITE_API_URL=http://localhost:5001/api
Start the frontend:
npm run dev
Open the app in your browser at http://localhost:5173.


Project Structure

auth-app/
│── backend/       # Backend (Express + Prisma)
│   ├── src/
│   │   ├── controllers/ # Login & Register logic
│   │   ├── routes/      # API routes
│   │   ├── index.ts     # Server entry point
│   ├── prisma/          # Database migrations
│   ├── .env
│   ├── package.json
│── frontend/       # Frontend (React + TypeScript)
│   ├── src/
│   │   ├── pages/     # Login, Dashboard  
│   │   ├── App.tsx     # Routes configuration
│   │   ├── main.tsx    # React entry point
│   ├── public/
│   ├── .env
│   ├── package.json
│── README.md


How It Works

User Login
Users enter their email and password.
The login form is validated using React Hook Form and Zod.
A request is sent to the backend using React Query.
Backend Authentication
The backend verifies the user’s credentials using Prisma ORM and bcryptjs.
If valid, a JWT token is generated and sent to the frontend.
Protected Routes
The dashboard is accessible only if the user is authenticated.
JWT-based authentication is enforced on protected routes.
Key Features

✅ Full Authentication (Login with JWT)
✅ Type Safety (Full TypeScript Support)
✅ Validation with Zod (Frontend & Backend)
✅ Form Handling with React Hook Form
✅ API Requests with React Query
✅ Secure Password Storage (bcrypt)
✅ Database Management with Prisma

Troubleshooting

Database Connection Issues
Ensure PostgreSQL is running on your system.
Double-check your DATABASE_URL in .env.
CORS Issues
If the frontend cannot connect to the backend, check if CORS is properly set up in Express:
app.use(cors({ origin: "http://localhost:5173" }));
Conclusion

This project demonstrates full-stack authentication with React and Express using modern best practices. The integration of React Hook Form, Zod, React Query, and Prisma ensures a robust, scalable, and maintainable authentication system. 🚀