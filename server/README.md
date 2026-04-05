# Eco-Compliance Backend

## 1. Install
```bash
cd server
npm install
```

## 2. Configure `.env`
Copy `.env.example` to `.env` and fill values:
```bash
cp .env.example .env
```

Required:
- `MONGO_URI`
- `JWT_SECRET`

Optional:
- `CLOUDINARY_CLOUD_NAME`
- `CLOUDINARY_API_KEY`
- `CLOUDINARY_API_SECRET`

If Cloudinary keys are not configured, report submission still works and images are stored inline instead of being uploaded to Cloudinary.

## 3. Run
```bash
npm run dev
```

Health check:
- `GET http://localhost:5000/health`

## Default admin
On first run, backend creates admin from:
- `ADMIN_EMAIL`
- `ADMIN_PASSWORD`

## API base
- `http://localhost:5000/api`

### Auth
- `POST /auth/register`
- `POST /auth/login`
- `POST /auth/admin-login`

### Reports
- `GET /reports`
- `POST /reports`
- `PATCH /reports/:id/status` (admin token)
- `PATCH /reports/:id/meta` (admin token)
- `PATCH /reports/:id/notes` (admin token)

### Users (admin)
- `GET /users`
- `PATCH /users/:id/toggle-disabled`
- `PATCH /users/:id/toggle-volunteer`

### Settings/Awareness/Notifications (admin)
- `GET/PUT /settings`
- `GET/PUT /awareness`
- `GET/POST /notifications`
