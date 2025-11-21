# Primetrade.ai – Backend Developer Assignment

## Overview
This project implements a complete backend system with **JWT authentication**, **role-based access**, and a fully functional **CRUD module**, along with a polished frontend UI to test APIs.

This submission meets **all evaluation criteria** from the assignment:

### API design  
- REST principles  
- Proper status codes  
- Modular routing + controllers  
- Input validation  

### Database schema design  
- Normalized models (User, Task)  
- MongoDB Atlas cloud DB  
- Referential ownership constraints  

### Security best practices  
- Secure JWT handling  
- Bcrypt password hashing  
- Authorization middleware  
- Input sanitization  

### Functional frontend integration  
- Fully working UI using HTML, CSS, JS  
- CRUD operations visible instantly  
- JWT auto-stored in localStorage  
- Error/success UI messages  

### Scalability & deployment readiness  
- Modular folder structure  
- Horizontal scaling possibilities  
- Scaling note included  
- Postman collection included  

---

# Backend Setup (Runs on PORT **5001**)

### 1. Navigate to backend folder:
```
cd backend
```

### 2. Install dependencies:
```
npm install
```

### 3. Create `.env`:
```
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_secret
PORT=5001
```

### 4. Start backend:
```
npm run dev
```

Expected output:
```
MongoDB connected
Server running on port 5001
```

Backend Base URL:
```
http://localhost:5001/api/v1
```

---

# Frontend Setup (VS Code Live Server REQUIRED)

The frontend needs Live Server due to browser CORS + Fetch API restrictions.

### Steps:
1. Open the `frontend` folder in VS Code  
2. Right-click on `index.html`  
3. Select **"Open with Live Server"**

Live Server will open something like:
```
http://127.0.0.1:5500/frontend/index.html
```

The frontend directly connects to backend running on:
```
http://localhost:5001/api/v1
```

---

# Features Implemented

### Authentication
- Register (User/Admin)
- Login with JWT
- Auto-load logged-in user
- Auth middleware on protected routes

### Role-Based Access Control
- Admin-only routes example
- Users can only manage their own tasks

### Task Management (CRUD)
- Create Task
- Read Tasks
- Update Task
- Delete Task
- Ownership enforced

### Frontend UI
- Clean layout  
- Live task list  
- Error/success message logs  
- Edit/delete buttons  
- Token viewer window  

---

# API Documentation
A complete Postman Collection is included:

```
docs/postman_collection.json
```

Import into Postman → Ready to test.

---

# Scalability Notes  
Located in:

```
docs/scalability-notes.md
```

Includes:
- Microservices readiness  
- Caching (Redis)  
- API gateway  
- NGINX reverse proxy  
- Containerization (Docker)  
- Sharding & indexing  

---

# Project Structure

```
primetrade-backend-assignment/
│
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── middlewares/
│   │   ├── models/
│   │   ├── routes/
│   │   └── server.js
│   ├── package.json
│   └── .env.example
│
├── frontend/
│   ├── index.html
│   ├── styles.css
│   └── app.js
│
└── docs/
    ├── postman_collection.json
    └── scalability-notes.md
```

---

# Final Deliverable Checklist

### Backend hosted in GitHub with README  
### Authentication APIs  
### CRUD APIs  
### Beautiful frontend UI connected to backend  
### Postman API documentation  
### Scalability & deployment note  

Everything required in the assignment has been implemented.

---

**Author:** Bhumika Khatwani

**Project:** Primetrade.ai – Backend Developer Assignment  
