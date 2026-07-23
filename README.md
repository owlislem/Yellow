# 🟨 Yellow Family — Tourism Platform

**Yellow Family** is a full-stack tourism platform designed for an excursion agency to manage trips, customer bookings, and administrative operations. The platform provides a seamless user experience for discovering and booking excursions while offering powerful management tools for administrators.

![MERN Stack](https://img.shields.io/badge/Stack-MERN-green)
![License](https://img.shields.io/badge/License-MIT-blue)
![Node](https://img.shields.io/badge/Node.js-18+-green)
![React](https://img.shields.io/badge/React-18.2-blue)

---

## 📋 Table of Contents

- [Project Overview](#-project-overview)
- [Features](#-features)
- [Technology Stack](#-technology-stack)
- [Architecture](#-architecture)
- [Screenshots](#-screenshots)
- [Installation](#-installation)
- [Environment Variables](#-environment-variables)
- [Usage](#-usage)
- [API Documentation](#-api-documentation)
- [Security](#-security)
- [Project Structure](#-project-structure)
- [Future Improvements](#-future-improvements)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🎯 Project Overview

Yellow Family was developed to modernize the digital presence of a tourism agency specializing in excursions. The platform addresses real business needs:

- **Customer-facing features**: Browse excursions, make bookings, leave reviews
- **Administrative tools**: Manage trips, users, bookings, and content
- **Business insights**: Track bookings, user engagement, and reviews

This project demonstrates full-stack web development capabilities including authentication, database design, RESTful API architecture, and responsive UI design.

---

## ✨ Features

### Customer Features

- **User Authentication**
  - Secure signup and login with JWT
  - Password reset via email
  - Profile management with image upload (Firebase Storage)
  
- **Excursion Discovery**
  - Browse available trips with detailed information
  - View departure dates, pricing, and itineraries
  - Search and filter excursions by tags and destinations
  - Interactive image galleries

- **Booking System**
  - Reserve spots on excursions
  - Track booking status (Pending, Confirmed, Canceled)
  - View booking history in user profile
  - Deadline management

- **Reviews & Feedback**
  - Leave reviews and ratings for completed trips
  - View other customer reviews
  - Help future travelers make informed decisions

- **Loyalty Points**
  - Earn points through bookings and engagement
  - Track accumulated points in user profile

### Administrative Features

- **Dashboard Overview**
  - Real-time statistics and metrics
  - Quick access to all management functions
  
- **Trip Management**
  - Add, edit, and delete excursions
  - Set pricing, dates, and availability
  - Manage trip details, programs, and highlights
  - Upload multiple trip images
  
- **User Management**
  - View all registered users
  - Monitor user activity and bookings
  - Manage user roles and permissions
  
- **Booking Management**
  - View all bookings with filtering options
  - Update booking status
  - Track payment information
  
- **Review Moderation**
  - Monitor customer feedback
  - Manage review content
  
- **Content Management**
  - Update website content and images
  - Manage featured destinations

---

## 🛠 Technology Stack

### Frontend

- **React** 18.2 — UI library
- **Vite** — Fast build tool and dev server
- **Redux Toolkit** — State management
- **Redux Persist** — State persistence
- **React Router DOM** — Client-side routing
- **Tailwind CSS** — Utility-first styling
- **Material UI** — Component library
- **Axios** — HTTP client
- **Firebase** — Image storage
- **React Icons** — Icon library

### Backend

- **Node.js** — JavaScript runtime
- **Express.js** — Web framework
- **MongoDB** — NoSQL database
- **Mongoose** — MongoDB ODM
- **JWT** — Authentication tokens
- **Bcrypt.js** — Password hashing
- **Nodemailer** — Email functionality
- **Cookie Parser** — Cookie handling
- **CORS** — Cross-origin resource sharing
- **Validator** — Input validation

---

## 🏗 Architecture

```
┌─────────────────┐
│  React Frontend │ (Vite + Tailwind + Redux)
│  Port: 5173     │
└────────┬────────┘
         │ HTTP/REST
         │
┌────────▼────────┐
│  Express API    │ (Node.js + Express)
│  Port: 3000     │
└────────┬────────┘
         │
    ┌────┴────┬──────────────┐
    │         │              │
┌───▼───┐ ┌──▼─────┐  ┌────▼────┐
│MongoDB│ │Firebase│  │Mailtrap │
│ Atlas │ │Storage │  │  Email  │
└───────┘ └────────┘  └─────────┘
```

### API Structure

RESTful API following best practices:

- **Authentication**: `/api/v1/user` — signup, login, logout, password reset
- **Tours**: `/api/v1/tour` — CRUD operations for excursions
- **Reviews**: `/api/v1/review` — Create, read, update reviews
- **Bookings**: `/api/v1/booking` — Booking management

---

## 📸 Screenshots

> **Note**: Add screenshots to a `screenshots/` folder to showcase your application visually to recruiters.

Recommended screenshots:
- Homepage with featured excursions
- Excursion detail page
- Booking flow
- User profile dashboard
- Admin dashboard
- Mobile responsive views

---

## 🚀 Installation

### Prerequisites

- Node.js (v18 or higher)
- MongoDB Atlas account (or local MongoDB)
- Firebase account (for image storage)
- Git

### Clone the Repository

```bash
git clone https://github.com/yourusername/yellow-family.git
cd yellow-family
```

### Backend Setup

```bash
cd backend
npm install
```

Create a `config.env` file based on `.env.example`:

```bash
cp .env.example config.env
```

Edit `config.env` with your credentials (see [Environment Variables](#-environment-variables)).

Start the backend server:

```bash
npm start
```

The API will run on `http://localhost:3000`

### Frontend Setup

```bash
cd frontend
npm install
```

Create a `.env` file based on `.env.example`:

```bash
cp .env.example .env
```

Edit `.env` with your Firebase credentials.

Start the development server:

```bash
npm run dev
```

The application will run on `http://localhost:5173`

---

## 🔐 Environment Variables

### Backend (`backend/config.env`)

```env
# MongoDB
MONGO_URL=your_mongodb_connection_string
MONGO_PASSWORD=your_mongodb_password

# JWT
JWT_SECR=your_long_secure_jwt_secret_key
JWT_COOKIE_EXPIRES_IN=900000

# Email (Mailtrap for development)
EMAIL_USERNAME=your_mailtrap_username
EMAIL_PASSWORD=your_mailtrap_password
EMAIL_HOST=sandbox.smtp.mailtrap.io
EMAIL_PORT=587
EMAIL_FORM=your_email@example.com

# Environment
NODE_ENV=development
```

### Frontend (`frontend/.env`)

```env
# Firebase Configuration
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id

# API URL
VITE_API_URL=http://localhost:3000/api/v1
```

**⚠️ Security Warning**: Never commit `.env` or `config.env` files to version control. These are included in `.gitignore`.

---

## 📖 Usage

### As a Customer

1. **Sign Up**: Create an account with email and password
2. **Browse Excursions**: Explore available trips on the homepage
3. **View Details**: Click on an excursion to see full details
4. **Book a Trip**: Reserve your spot before the deadline
5. **Leave a Review**: Share your experience after the trip
6. **Track Points**: Monitor your loyalty points in your profile

### As an Administrator

1. **Login**: Use admin credentials to access the dashboard
2. **Manage Trips**: Add new excursions or update existing ones
3. **Monitor Bookings**: Track reservations and update statuses
4. **Manage Users**: View user accounts and activity
5. **Review Feedback**: Monitor customer reviews

---

## 🔒 Security

This application implements industry-standard security practices:

- **Password Security**
  - Passwords hashed with bcrypt (16 salt rounds)
  - Passwords never stored in plain text
  - Password reset tokens expire after 5 minutes

- **Authentication**
  - JWT-based authentication
  - HTTP-only cookies prevent XSS attacks
  - Token expiration (24 hours)
  - Protected routes on frontend and backend

- **API Security**
  - CORS configured for specific origins
  - Input validation with Mongoose schemas
  - Error handling middleware
  - Rate limiting recommended for production

- **Data Protection**
  - MongoDB user credentials not exposed
  - Environment variables for sensitive data
  - Firebase rules for storage access control

**⚠️ Important**: Before deploying to production:
- Change all default secrets
- Use strong, unique passwords
- Enable HTTPS
- Implement rate limiting
- Set up monitoring and logging

---

## 📁 Project Structure

```
yellow-family/
├── backend/
│   ├── controllers/       # Route controllers
│   ├── models/           # Mongoose schemas
│   ├── routes/           # API routes
│   ├── utils/            # Helper functions
│   ├── app.js            # Express app setup
│   ├── server.js         # Server entry point
│   ├── config.env        # Environment variables (gitignored)
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/   # Reusable React components
│   │   ├── pages/        # Page components
│   │   ├── features/     # Redux slices
│   │   ├── app/          # Redux store configuration
│   │   ├── assets/       # Images and static files
│   │   ├── firebase.js   # Firebase configuration
│   │   ├── App.jsx       # Main app component
│   │   └── main.jsx      # Entry point
│   ├── public/           # Public assets
│   ├── .env              # Environment variables (gitignored)
│   └── package.json
│
├── .gitignore
├── LICENSE
└── README.md
```

---

## 🔮 Future Improvements

Potential enhancements for the platform:

### Short Term
- [ ] Implement online payment integration (Stripe/PayPal)
- [ ] Add email notifications for booking confirmations
- [ ] Implement advanced search and filtering
- [ ] Add user-to-admin messaging system
- [ ] Create dashboard analytics with charts

### Medium Term
- [ ] Develop mobile application (React Native)
- [ ] Add multi-language support
- [ ] Implement recommendation system
- [ ] Add social media sharing features
- [ ] Create waiting list for fully booked trips

### Long Term
- [ ] Deploy to cloud infrastructure (AWS/Azure)
- [ ] Implement CI/CD pipeline
- [ ] Add real-time notifications (WebSocket)
- [ ] Create loyalty rewards program
- [ ] Develop partner/affiliate system

---

## 🤝 Contributing

This is a portfolio project, but suggestions and feedback are welcome!

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/improvement`)
3. Commit your changes (`git commit -m 'Add improvement'`)
4. Push to the branch (`git push origin feature/improvement`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👤 Author

**Your Name**

- GitHub: [@yourusername](https://github.com/yourusername)
- LinkedIn: [Your LinkedIn](https://linkedin.com/in/yourprofile)
- Email: your.email@example.com

---

## 🙏 Acknowledgments

- Developed as a full-stack web development project
- Inspired by real-world tourism agency needs
- Built with modern web technologies and best practices

---

**⭐ If you find this project interesting, please consider giving it a star!**
