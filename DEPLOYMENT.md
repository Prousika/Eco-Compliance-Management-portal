# Deployment Guide

This project is set up for:

- Frontend: Vercel
- Backend: Render
- Database: MongoDB Atlas
- Custom domains:
  - `www.yourdomain.com` -> frontend
  - `api.yourdomain.com` -> backend

## Files Added For Deployment

- `vercel.json` -> makes Vercel serve the Vite SPA correctly for React Router routes
- `render.yaml` -> lets Render auto-create the backend service from this repo

## 1. Push To GitHub

```bash
git add .
git commit -m "Add deployment config"
git push
```

## 2. Create MongoDB Atlas Database

1. Open MongoDB Atlas.
2. Create a cluster.
3. Create a database user in `Security -> Database Access`.
4. Allow network access in `Security -> Network Access`.
5. Copy the driver connection string.

Example:

```env
MONGO_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/eco_compliance_portal?retryWrites=true&w=majority
```

## 3. Deploy Backend On Render

1. Open Render dashboard.
2. Click `New +`.
3. Click `Blueprint`.
4. Connect this GitHub repository.
5. Render will detect `render.yaml`.
6. Review the service and click `Apply`.

Then open the created backend service and go to:

- `Environment`

Add these values:

```env
MONGO_URI=your_atlas_connection_string
JWT_SECRET=your_long_random_secret
CORS_ORIGIN=https://www.yourdomain.com,https://yourdomain.com
ADMIN_EMAIL=admin@ecoportal.com
ADMIN_PASSWORD=admin123
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

Render health check:

```text
https://your-render-service.onrender.com/health
```

## 4. Add Backend Custom Domain

1. Open backend service in Render.
2. Click `Settings`.
3. Scroll to `Custom Domains`.
4. Click `Add Custom Domain`.
5. Enter:

```text
api.yourdomain.com
```

6. Copy the DNS target Render shows.
7. Go to your domain DNS panel and add that record.
8. Return to Render and verify the domain.

## 5. Deploy Frontend On Vercel

1. Open Vercel dashboard.
2. Click `Add New...`.
3. Click `Project`.
4. Import this GitHub repository.
5. Vercel should detect `Vite`.
6. In `Environment Variables`, add:

```env
VITE_API_URL=https://eco-compliance-management-portal-backend-fml7.onrender.com/api
```

7. Click `Deploy`.

## 6. Add Frontend Custom Domain

1. Open your Vercel project.
2. Go to `Settings -> Domains`.
3. Add:

```text
www.yourdomain.com
```

4. Add:

```text
yourdomain.com
```

5. Follow the DNS values Vercel shows.

Recommended:

- root domain redirects to `www`

## 7. DNS Summary

Use the exact values shown by each platform.

Typical records look like:

```text
www  -> CNAME -> Vercel target
api  -> CNAME -> Render target
@    -> A/CNAME -> Vercel target for apex domain
```

## 8. Final Environment Values

### Vercel

```env
VITE_API_URL=https://eco-compliance-management-portal-backend-fml7.onrender.com/api
```

### Render

```env
PORT=10000
JWT_EXPIRES_IN=7d
MONGO_URI=your_atlas_connection_string
JWT_SECRET=your_long_random_secret
CORS_ORIGIN=https://www.yourdomain.com,https://yourdomain.com
ADMIN_EMAIL=admin@ecoportal.com
ADMIN_PASSWORD=admin123
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

## 9. Test URLs

```text
https://api.yourdomain.com/health
https://www.yourdomain.com
https://yourdomain.com
```
