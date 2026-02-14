# Campus Eco-Compliance System

A full-stack MERN web application designed to manage campus environmental complaints with transparency, structured workflow, and real-time status tracking.

The system enables students to report issues such as waste accumulation, water leakage, damaged infrastructure, and sanitation problems, while allowing administrators to assign roles, update status, and monitor resolution progress efficiently.

## Tech Stack

### Frontend
- React.js (Vite)
- React Router
- Axios
- Google Maps API

### Backend
- Node.js
- Express.js
- JWT Authentication
- bcrypt (Password Hashing)
- Socket.IO (Real-time updates)

### Database
- MongoDB
- Mongoose (Schema and Validation)

### Version Control
- Git and GitHub

## Key Features
- User Authentication (JWT-based login and role control)
- Complaint Submission with Location Tagging
- Transparency Map (Google Maps Integration)
- Check Status Dashboard with Progress Tracking
- Real-time Status Updates using Socket.IO
- Admin Complaint Assignment and Role Management
- Image Upload Support (Cloud Storage Ready)
- Structured Complaint Lifecycle Management

## Workflow Overview
1. User registers and logs in.
2. User submits a complaint with location details.
3. Complaint is stored in MongoDB.
4. Complaint appears on Transparency Map.
5. Admin reviews and assigns staff/roles.
6. Status updates are reflected in real time.
7. User tracks complaint progress via Check Status dashboard.

## Security Practices
- Passwords stored using bcrypt hashing
- JWT-based authentication for protected routes
- Role-based access control for admin actions
- Environment variables for sensitive credentials

## Future Enhancements
- Advanced analytics dashboard
- AI-based duplicate complaint detection
- Notification system (Email/SMS)
- Deployment to cloud (AWS / Render / Vercel)

## Installation

### Prerequisites
- Node.js: `^20.19.0` or `>=22.12.0`
- npm (included with Node.js)
- Git

### Steps
```bash
git clone <your-repo-url>
cd KURAL_DUMMY
npm install
```

## Setup

No environment variables are required for the current frontend build.

If you later add API keys or backend URLs, create a `.env` file in the project root and expose variables with the `VITE_` prefix.

Example:

```env
VITE_API_BASE_URL=http://localhost:5000
```

## Run Locally

```bash
npm run dev
```

Then open the local URL shown in the terminal (usually `http://localhost:5173`).

## Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build production assets
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint

## Build for Production

```bash
npm run build
```

Build output is generated in the `dist/` folder.

## Author
Developed as part of a campus eco-management system project.

## License
This project is developed for academic and educational purposes.
