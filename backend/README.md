# Backend – Bajarangs Backend Developer Assignment

This is the **Node.js + Express + MongoDB** backend for the assignment.

## ⚙️ Setup

```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your Mongo URI and JWT secret
npm run dev   # or: npm start
```

The server will start on `http://localhost:5000` (or the `PORT` configured in `.env`).

### Main Endpoints (API v1)

- `GET /api/v1/health`
- `POST /api/v1/auth/register`
- `POST /api/v1/auth/login`
- `GET /api/v1/auth/me` (requires JWT)
- `POST /api/v1/tasks` (requires JWT)
- `GET /api/v1/tasks` (requires JWT)
- `GET /api/v1/tasks/:id` (requires JWT)
- `PUT /api/v1/tasks/:id` (requires JWT)
- `DELETE /api/v1/tasks/:id` (requires JWT)

Include the JWT in the `Authorization` header:

```http
Authorization: Bearer <token>
```

API documentation is provided as a Postman collection in `../docs/postman_collection.json`.
