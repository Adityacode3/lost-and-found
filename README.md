# 🔍 Lost & Found Portal — MERN Stack

A full-stack Lost and Found community portal built with MongoDB, Express.js, React (Vite), and Node.js.

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

---

## 🌿 STEP 2 — Set Up MongoDB Atlas (Free Cloud DB)

1. Go to **https://www.mongodb.com/atlas** and create a free account.
2. Click **"Build a Database"** → choose **Free (M0)** → Select region closest to you.
3. Create a database user:
   - Username: e.g. `lnfuser`
   - Password: e.g. `lnfpass123` (save this!)
4. Under **Network Access**, click **"Add IP Address"** → select **"Allow Access from Anywhere"** (0.0.0.0/0).
5. Go to **Database** → click **Connect** → **Connect your application** → Copy the connection string.
   - It looks like: `mongodb+srv://lnfuser:<password>@cluster0.xxxxx.mongodb.net/`
   - Replace `<password>` with your actual password.
   - Add database name: `lostandfound` at the end → `...mongodb.net/lostandfound?retryWrites=true&w=majority`

---

## ⚙️ STEP 3 — Configure Environment Variables

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

## ▶️ STEP 4 — Run Locally

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

## 🌱 STEP 5 — Seed Sample Data (Optional)

1. Open **MongoDB Compass** (download from mongodb.com/compass)
2. Connect using your MONGO_URI
3. Open the `lostandfound` database
4. Open the **MongoDB Shell** (bottom left in Compass) and paste the contents of `sample-data.js`

OR use mongosh in terminal:
```bash
mongosh "your-mongo-uri" --file sample-data.js
```

---

## ☁️ STEP 6 — Deploy Backend on Render (Free)

1. Push your code to **GitHub** (create a new repo, push the `backend` folder).
2. Go to **https://render.com** → Sign up with GitHub.
3. Click **"New +"** → **"Web Service"**
4. Connect your GitHub repo.
5. Configure:
   - **Name**: `lnf-backend`
   - **Root Directory**: `backend` (if pushing the whole project)
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Instance Type**: Free
6. Under **Environment Variables**, add:
   ```
   MONGO_URI    = your-mongodb-atlas-uri
   JWT_SECRET   = your-jwt-secret
   PORT         = 5000
   CLIENT_URL   = https://your-frontend.vercel.app
   ```
   *(you'll update CLIENT_URL after deploying frontend)*
7. Click **"Create Web Service"** — wait 2–3 minutes.
8. Copy your backend URL: `https://lnf-backend.onrender.com`

> **Note on image uploads**: Render's free tier has an ephemeral filesystem — uploaded images will be lost on redeploy. For production, use **Cloudinary** or **AWS S3**. For a college project, this is fine.

---

## 🌐 STEP 7 — Deploy Frontend on Vercel

1. Push your `frontend` folder to GitHub (same or separate repo).
2. Go to **https://vercel.com** → Sign up with GitHub.
3. Click **"New Project"** → Import your GitHub repo.
4. Configure:
   - **Framework Preset**: Vite
   - **Root Directory**: `frontend` (if mono-repo)
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. Under **Environment Variables**, add:
   ```
   VITE_API_URL = https://lnf-backend.onrender.com
   ```
6. Click **Deploy** — wait 1–2 minutes.
7. Your app is live at: `https://your-project.vercel.app`

---

## 🔗 STEP 8 — Connect Frontend & Backend After Deployment

1. Copy your **Vercel frontend URL** (e.g. `https://lnf-portal.vercel.app`)
2. Go back to **Render** → your backend service → **Environment** tab
3. Update `CLIENT_URL` to your Vercel URL:
   ```
   CLIENT_URL = https://lnf-portal.vercel.app
   ```
4. Click **Save Changes** — Render will auto-redeploy.
5. Test your live app — register, login, post items!

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
