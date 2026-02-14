# 🌱 Campus Eco-Compliance System

A full-stack MERN web application designed to manage campus environmental complaints with transparency, structured workflow, and real-time status tracking.

The system enables students to report issues such as waste accumulation, water leakage, damaged infrastructure, and sanitation problems, while allowing administrators to assign roles, update status, and monitor resolution progress efficiently.

---

## 🚀 Tech Stack

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
- Mongoose (Schema & Validation)

### Version Control
- Git & GitHub

---

## 📂 Project Structure
eco-compliance-system/
│
├── client/                     # React Frontend (Vite)
│   ├── public/
│   ├── src/
│   │   ├── components/         # UI Components
│   │   ├── pages/              # Application Pages
│   │   ├── utils/              # Helper Functions
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
│
├── server/                     # Node.js Backend
│   ├── config/                 # Database & App Config
│   ├── models/                 # Mongoose Schemas
│   ├── routes/                 # API Routes
│   ├── controllers/            # Business Logic
│   ├── middleware/             # Authentication & Error Handling
│   ├── server.js               # Entry Point
│   └── .env
│
├── .gitignore
└── README.md


---

## ✨ Key Features

- 🔐 User Authentication (JWT-based login & role control)
- 📝 Complaint Submission with Location Tagging
- 🗺 Transparency Map (Google Maps Integration)
- 📊 Check Status Dashboard with Progress Tracking
- 🔄 Real-time Status Updates using Socket.IO
- 👨‍💼 Admin Complaint Assignment & Role Management
- 📁 Image Upload Support (Cloud Storage Ready)
- 🗂 Structured Complaint Lifecycle Management

---

## 🔄 Workflow Overview

1. User registers and logs in.
2. User submits a complaint with location details.
3. Complaint is stored in MongoDB.
4. Complaint appears on Transparency Map.
5. Admin reviews and assigns staff/roles.
6. Status updates are reflected in real time.
7. User tracks complaint progress via Check Status dashboard.

---


## 🛡 Security Practices

- Passwords stored using bcrypt hashing.
- JWT-based authentication for protected routes.
- Role-based access control for admin actions.
- Environment variables for sensitive credentials.

---

## 📈 Future Enhancements

- Advanced analytics dashboard
- AI-based duplicate complaint detection
- Notification system (Email/SMS)
- Deployment to cloud (AWS / Render / Vercel)

---

## 👨‍💻 Author

Developed as part of a campus eco-management system project.

---

## 📄 License

This project is developed for academic and educational purposes.

