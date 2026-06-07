# 🔍 Lost & Found Portal — MERN Stack

Lost & Found Portal is a full-stack web application that allows community members to report lost and found items, search for them, and connect with each other to return belongings. It is built using the MERN stack (MongoDB, Express.js, React.js, Node.js) with JWT-based authentication and Multer for image uploads.

Live - https://lost-and-found-six-iota.vercel.app/login

---

## 📁 Project Structure

```
lost-and-found/
├── backend/
│   ├── middleware/
│   │   ├── auth.js          # JWT protect middleware
│   │   └── upload.js        # Multer image upload middleware
│   ├── models/
│   │   ├── User.js          # User mongoose model
│   │   └── Item.js          # Item mongoose model
│   ├── routes/
│   │   ├── auth.js          # /api/auth/register, /api/auth/login
│   │   └── items.js         # Full CRUD for items
│   ├── uploads/             # Uploaded images (auto-created)
│   ├── server.js            # Express app entry point
│   ├── package.json
│   └── .env.example
│
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   │   └── index.js     # Axios instance + API calls
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   └── ItemCard.jsx
│   │   ├── context/
│   │   │   └── AuthContext.jsx
│   │   ├── pages/
│   │   │   ├── Login.jsx
│   │   │   ├── Signup.jsx
│   │   │   ├── Home.jsx
│   │   │   ├── ReportLost.jsx
│   │   │   ├── ReportFound.jsx
│   │   │   ├── LostItems.jsx
│   │   │   ├── FoundItems.jsx
│   │   │   └── MyReports.jsx
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   ├── vite.config.js
│   ├── package.json
│   └── .env.example
│
├── sample-data.js           # MongoDB seed data
└── README.md
```

---

## 🚀 STEP 1 — Install Dependencies

### Backend
```bash
cd backend
npm install
```

### Frontend
```bash
cd frontend
npm install
```

----

## ⚙️ STEP 2 — Configure Environment Variables

### Backend — create `backend/.env`
```env
MONGO_URI=mongodb+srv://lnfuser:lnfpass123@cluster0.xxxxx.mongodb.net/lostandfound?retryWrites=true&w=majority
JWT_SECRET=mysuper_secret_jwt_key_2024_lnfportal
PORT=5000
CLIENT_URL=http://localhost:5173
```

### Frontend — create `frontend/.env`
```env
VITE_API_URL=http://localhost:5000
```

---

## ▶️ STEP 3 — Run Locally

### Terminal 1 — Start Backend
```bash
cd backend
npm run dev
```
You should see:
```
✅ MongoDB connected successfully
🚀 Server running on port 5000
```

### Terminal 2 — Start Frontend
```bash
cd frontend
npm run dev
```
Open **http://localhost:5173** in your browser.

---





 

> **Note on image uploads**: Render's free tier has an ephemeral filesystem — uploaded images will be lost on redeploy. For production, use **Cloudinary** or **AWS S3**. For a college project, this is fine.

---



## 🧪 API Routes Reference

### Auth
| Method | Route | Description | Auth |
|--------|-------|-------------|------|
| POST | /api/auth/register | Register new user | Public |
| POST | /api/auth/login | Login user | Public |

### Items
| Method | Route | Description | Auth |
|--------|-------|-------------|------|
| POST | /api/items | Create item report | Private |
| GET | /api/items | Get all items (with ?status=Lost/Found&search=) | Public |
| GET | /api/items/my | Get logged-in user's items | Private |
| GET | /api/items/:id | Get single item | Public |
| PUT | /api/items/:id | Update item (owner only) | Private |
| DELETE | /api/items/:id | Delete item (owner only) | Private |

---

## 📱 Features Summary

- ✅ JWT Authentication (Register/Login/Protected Routes)
- ✅ Report Lost Items (with image upload)
- ✅ Report Found Items (with image upload)
- ✅ Browse Lost Items (with search)
- ✅ Browse Found Items (with search)
- ✅ My Reports (Edit + Delete own reports)
- ✅ Real-time stats on Home dashboard
- ✅ Responsive design (mobile-friendly)
- ✅ Form validation (frontend + backend)
- ✅ Error handling throughout

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React 18 + Vite |
| Routing | React Router v6 |
| HTTP Client | Axios |
| Backend | Node.js + Express.js |
| Database | MongoDB + Mongoose |
| Auth | JWT + bcryptjs |
| File Upload | Multer |
| Deployment (BE) | Render |
| Deployment (FE) | Vercel |
