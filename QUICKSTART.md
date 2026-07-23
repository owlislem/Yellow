# 🚀 Quick Start Guide

Get Yellow Family up and running in 5 minutes!

## Prerequisites

- Node.js 18+ installed
- MongoDB Atlas account (or local MongoDB)
- Firebase account
- Git

## Step 1: Clone & Setup

```bash
# Clone the repository
git clone https://github.com/yourusername/yellow-family.git
cd yellow-family
```

## Step 2: Backend Configuration

```bash
# Navigate to backend
cd backend

# Install dependencies
npm install

# Create environment file
copy .env.example config.env

# Edit config.env with your credentials
notepad config.env
```

**Required credentials:**
- MongoDB connection string (get from MongoDB Atlas)
- JWT secret (generate: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`)
- Email credentials (use Mailtrap for development)

## Step 3: Frontend Configuration

```bash
# Navigate to frontend (from project root)
cd frontend

# Install dependencies
npm install

# Create environment file
copy .env.example .env

# Edit .env with your Firebase credentials
notepad .env
```

**Required credentials:**
- Firebase configuration (get from Firebase Console)

## Step 4: Start the Application

### Start Backend (Terminal 1)
```bash
cd backend
npm start
```

Backend will run on: `http://localhost:3000`

### Start Frontend (Terminal 2)
```bash
cd frontend
npm run dev
```

Frontend will run on: `http://localhost:5173`

## Step 5: Access the Application

Open your browser and visit: `http://localhost:5173`

**Test Accounts:**
- Create a new user account via signup
- For admin access, manually update user role in MongoDB

## 🔧 Troubleshooting

### Database Connection Error
```
Error: connect ECONNREFUSED
```
**Fix:** Check your MongoDB connection string in `backend/config.env`

### CORS Error
```
Access to XMLHttpRequest blocked by CORS policy
```
**Fix:** Ensure `FRONTEND_URL` in `backend/config.env` is set to `http://localhost:5173`

### Firebase Error
```
Firebase: Error (auth/api-key-not-valid)
```
**Fix:** Verify all Firebase credentials in `frontend/.env`

### Port Already in Use
```
Error: listen EADDRINUSE: address already in use :::3000
```
**Fix:** Stop other processes using port 3000 or change PORT in `backend/config.env`

## 📚 Next Steps

- Read the full [README.md](README.md) for detailed information
- Check [API_DOCUMENTATION.md](API_DOCUMENTATION.md) for API reference
- Review [SECURITY.md](SECURITY.md) before deploying
- See [DEPLOYMENT.md](DEPLOYMENT.md) for production deployment

## 🆘 Common Tasks

### Create Admin User
```javascript
// In MongoDB Compass or Shell
db.users.updateOne(
  { email: "youremail@example.com" },
  { $set: { role: "Admin" } }
)
```

### Reset Database
```javascript
// Delete all data
db.tours.deleteMany({})
db.bookings.deleteMany({})
db.reviews.deleteMany({})
db.users.deleteMany({})
```

### Check Server Status
```bash
# Backend
curl http://localhost:3000/api/v1/tour

# Expected: JSON response with tours
```

## 🎯 Testing Checklist

- [ ] Backend server starts without errors
- [ ] Frontend builds and runs
- [ ] Can create new user account
- [ ] Can login with credentials
- [ ] Can view tours list
- [ ] Can view tour details
- [ ] Can create booking (when logged in)
- [ ] Admin dashboard accessible (with admin role)

## 📞 Need Help?

- Check existing [Issues](https://github.com/yourusername/yellow-family/issues)
- Open a new issue with detailed error information
- Review [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines

---

**Happy Coding! 🎉**
