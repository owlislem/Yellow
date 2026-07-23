# Yellow Family API Documentation

Base URL: `http://localhost:3000/api/v1`

## Table of Contents
- [Authentication](#authentication)
- [Users](#users)
- [Tours](#tours)
- [Reviews](#reviews)
- [Bookings](#bookings)

---

## Authentication

All authenticated routes require a JWT token either in the Authorization header or as an HTTP-only cookie.

### Header Authentication
```
Authorization: Bearer <token>
```

### Cookie Authentication
Cookie name: `jwt`

---

## Users

### 1. Sign Up
**POST** `/api/v1/user/signup`

Create a new user account.

**Request Body:**
```json
{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "password123",
  "confirmPassword": "password123"
}
```

**Response:** (201 Created)
```json
{
  "status": "success",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "data": {
    "user": {
      "_id": "60d5ec49f1b2c72b8c8e4f1a",
      "username": "john_doe",
      "email": "john@example.com",
      "role": "User",
      "points": 0,
      "profileImage": "https://...",
      "createdAt": "2024-01-15T10:30:00.000Z"
    }
  }
}
```

---

### 2. Login
**POST** `/api/v1/user/login`

Authenticate and receive a JWT token.

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:** (200 OK)
```json
{
  "status": "success",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "data": {
    "user": {
      "_id": "60d5ec49f1b2c72b8c8e4f1a",
      "username": "john_doe",
      "email": "john@example.com",
      "role": "User"
    }
  }
}
```

---

### 3. Logout
**POST** `/api/v1/user/logout`

Clear authentication cookie.

**Response:** (200 OK)
```json
{
  "status": "success"
}
```

---

### 4. Forgot Password
**POST** `/api/v1/user/forgotPassword`

Request a password reset token via email.

**Request Body:**
```json
{
  "email": "john@example.com"
}
```

**Response:** (200 OK)
```json
{
  "status": "success",
  "message": "Token sent to email!"
}
```

---

### 5. Reset Password
**PATCH** `/api/v1/user/resetPassword/:token`

Reset password using the token received via email.

**Request Body:**
```json
{
  "password": "newpassword123",
  "confirmPassword": "newpassword123"
}
```

**Response:** (200 OK)
```json
{
  "status": "success",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "data": {
    "user": { ... }
  }
}
```

---

### 6. Get All Users (Admin Only)
**GET** `/api/v1/user`

Retrieve all users. Requires admin role.

**Headers:**
```
Authorization: Bearer <admin_token>
```

**Response:** (200 OK)
```json
{
  "status": "success",
  "results": 25,
  "data": {
    "users": [
      {
        "_id": "60d5ec49f1b2c72b8c8e4f1a",
        "username": "john_doe",
        "email": "john@example.com",
        "role": "User",
        "points": 150
      },
      ...
    ]
  }
}
```

---

### 7. Get User by ID
**GET** `/api/v1/user/:id`

Retrieve a specific user by ID.

**Response:** (200 OK)
```json
{
  "status": "success",
  "data": {
    "user": {
      "_id": "60d5ec49f1b2c72b8c8e4f1a",
      "username": "john_doe",
      "email": "john@example.com",
      "firstName": "John",
      "lastName": "Doe",
      "points": 150,
      "profileImage": "https://..."
    }
  }
}
```

---

### 8. Update User
**PATCH** `/api/v1/user/:id`

Update user information. Protected route.

**Request Body:**
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "NumberPhone": "1234567890"
}
```

**Response:** (200 OK)
```json
{
  "status": "success",
  "data": {
    "user": { ... }
  }
}
```

---

### 9. Delete User
**DELETE** `/api/v1/user/:id`

Delete a user. Admin only or own account.

**Response:** (204 No Content)

---

## Tours

### 1. Get All Tours
**GET** `/api/v1/tour`

Retrieve all available tours with optional query parameters.

**Query Parameters:**
- `page` (number): Page number for pagination
- `limit` (number): Number of results per page
- `sort` (string): Sort field (e.g., `-Price`, `DepartureDate`)
- `fields` (string): Comma-separated field names to include
- Any field name for filtering (e.g., `Destination=Paris`)

**Example:**
```
GET /api/v1/tour?page=1&limit=10&sort=-createdAt&Destination=Paris
```

**Response:** (200 OK)
```json
{
  "status": "success",
  "results": 15,
  "data": {
    "tours": [
      {
        "_id": "60d5f1a4f1b2c72b8c8e4f2b",
        "Destination": "Paris",
        "Description": "7-day tour of Paris highlights",
        "Price": "1500",
        "DepartureDate": "2024-06-15T00:00:00.000Z",
        "ReturnDate": "2024-06-22T00:00:00.000Z",
        "NTickets": 20,
        "Image": ["url1", "url2"],
        "Tags": ["culture", "city", "europe"]
      },
      ...
    ]
  }
}
```

---

### 2. Get Tour by ID
**GET** `/api/v1/tour/:id`

Retrieve detailed information about a specific tour.

**Response:** (200 OK)
```json
{
  "status": "success",
  "data": {
    "tour": {
      "_id": "60d5f1a4f1b2c72b8c8e4f2b",
      "Destination": "Paris",
      "Description": "7-day tour of Paris highlights",
      "Price": "1500",
      "DepartureDate": "2024-06-15T00:00:00.000Z",
      "ReturnDate": "2024-06-22T00:00:00.000Z",
      "DeparturePlace": "New York JFK",
      "ReturnPlace": "New York JFK",
      "DTime": "08:00 AM",
      "RTime": "06:00 PM",
      "DressCode": "Casual",
      "Includes": [["Accommodation", "Breakfast"], ["Guide", "Transportation"]],
      "Program": ["Day 1: Eiffel Tower", "Day 2: Louvre Museum", ...],
      "Image": ["url1", "url2", "url3"],
      "NTickets": 20,
      "Deadline": "2024-06-01T00:00:00.000Z",
      "Notes": "Passport required",
      "Tags": ["culture", "city", "europe"],
      "reviews": [...]
    }
  }
}
```

---

### 3. Create Tour (Admin Only)
**POST** `/api/v1/tour`

Create a new tour. Requires admin role.

**Request Body:**
```json
{
  "Destination": "Rome",
  "Description": "Explore ancient Rome",
  "DepartureDate": "2024-07-01T00:00:00.000Z",
  "ReturnDate": "2024-07-08T00:00:00.000Z",
  "Price": "1800",
  "NTickets": 15,
  "Tags": ["history", "culture"],
  "Image": ["url1", "url2"]
}
```

**Response:** (201 Created)
```json
{
  "status": "success",
  "data": {
    "tour": { ... }
  }
}
```

---

### 4. Update Tour (Admin Only)
**PATCH** `/api/v1/tour/:id`

Update tour information. Requires admin role.

**Request Body:**
```json
{
  "Price": "1600",
  "NTickets": 18
}
```

**Response:** (200 OK)
```json
{
  "status": "success",
  "data": {
    "tour": { ... }
  }
}
```

---

### 5. Delete Tour (Admin Only)
**DELETE** `/api/v1/tour/:id`

Delete a tour. Requires admin role.

**Response:** (204 No Content)

---

## Reviews

### 1. Get All Reviews
**GET** `/api/v1/review`

Retrieve all reviews or filter by tour.

**Query Parameters:**
- `tour` (ObjectId): Filter reviews by tour ID

**Response:** (200 OK)
```json
{
  "status": "success",
  "results": 42,
  "data": {
    "reviews": [
      {
        "_id": "60d5f3c1f1b2c72b8c8e4f3c",
        "user": {
          "_id": "60d5ec49f1b2c72b8c8e4f1a",
          "username": "john_doe"
        },
        "tour": "60d5f1a4f1b2c72b8c8e4f2b",
        "rating": 5,
        "review": "Amazing experience!",
        "createdAt": "2024-01-20T14:30:00.000Z"
      },
      ...
    ]
  }
}
```

---

### 2. Create Review (Protected)
**POST** `/api/v1/review`

Create a new review. Must be authenticated.

**Request Body:**
```json
{
  "tour": "60d5f1a4f1b2c72b8c8e4f2b",
  "rating": 5,
  "review": "Excellent tour! Highly recommended."
}
```

**Response:** (201 Created)
```json
{
  "status": "success",
  "data": {
    "review": {
      "_id": "60d5f3c1f1b2c72b8c8e4f3c",
      "user": "60d5ec49f1b2c72b8c8e4f1a",
      "tour": "60d5f1a4f1b2c72b8c8e4f2b",
      "rating": 5,
      "review": "Excellent tour! Highly recommended.",
      "createdAt": "2024-01-20T14:30:00.000Z"
    }
  }
}
```

---

### 3. Update Review (Protected)
**PATCH** `/api/v1/review/:id`

Update your own review.

**Request Body:**
```json
{
  "rating": 4,
  "review": "Good tour, could be better."
}
```

**Response:** (200 OK)
```json
{
  "status": "success",
  "data": {
    "review": { ... }
  }
}
```

---

### 4. Delete Review (Protected/Admin)
**DELETE** `/api/v1/review/:id`

Delete your own review or any review (admin).

**Response:** (204 No Content)

---

## Bookings

### 1. Get All Bookings
**GET** `/api/v1/booking`

Retrieve all bookings (admin) or your own bookings (user).

**Response:** (200 OK)
```json
{
  "status": "success",
  "results": 12,
  "data": {
    "bookings": [
      {
        "_id": "60d5f5d2f1b2c72b8c8e4f4d",
        "tour": {
          "_id": "60d5f1a4f1b2c72b8c8e4f2b",
          "Destination": "Paris",
          "NTickets": 20
        },
        "user": {
          "_id": "60d5ec49f1b2c72b8c8e4f1a",
          "username": "john_doe",
          "email": "john@example.com"
        },
        "price": 1500,
        "status": "Confirmed",
        "paid": true,
        "createdAt": "2024-01-18T10:00:00.000Z"
      },
      ...
    ]
  }
}
```

---

### 2. Get Booking by ID
**GET** `/api/v1/booking/:id`

Retrieve a specific booking.

**Response:** (200 OK)
```json
{
  "status": "success",
  "data": {
    "booking": {
      "_id": "60d5f5d2f1b2c72b8c8e4f4d",
      "tour": { ... },
      "user": { ... },
      "price": 1500,
      "status": "Confirmed",
      "paid": true
    }
  }
}
```

---

### 3. Create Booking (Protected)
**POST** `/api/v1/booking`

Create a new booking. Must be authenticated.

**Request Body:**
```json
{
  "tour": "60d5f1a4f1b2c72b8c8e4f2b",
  "price": 1500
}
```

**Response:** (201 Created)
```json
{
  "status": "success",
  "data": {
    "booking": {
      "_id": "60d5f5d2f1b2c72b8c8e4f4d",
      "tour": "60d5f1a4f1b2c72b8c8e4f2b",
      "user": "60d5ec49f1b2c72b8c8e4f1a",
      "price": 1500,
      "status": "Pending",
      "paid": true
    }
  }
}
```

---

### 4. Update Booking Status (Admin Only)
**PATCH** `/api/v1/booking/:id`

Update booking status. Requires admin role.

**Request Body:**
```json
{
  "status": "Confirmed"
}
```

**Valid Status Values:**
- `Pending`
- `Confirmed`
- `Canceled`

**Response:** (200 OK)
```json
{
  "status": "success",
  "data": {
    "booking": { ... }
  }
}
```

---

### 5. Delete Booking (Admin Only)
**DELETE** `/api/v1/booking/:id`

Delete a booking. Requires admin role.

**Response:** (204 No Content)

---

## Error Responses

All endpoints may return the following error responses:

### 400 Bad Request
```json
{
  "status": "fail",
  "message": "Invalid input data"
}
```

### 401 Unauthorized
```json
{
  "status": "fail",
  "message": "Unauthorized access. Please sign in to continue."
}
```

### 403 Forbidden
```json
{
  "status": "fail",
  "message": "Unauthorized. Please request access from your administrator."
}
```

### 404 Not Found
```json
{
  "status": "fail",
  "message": "Resource not found"
}
```

### 500 Internal Server Error
```json
{
  "status": "error",
  "message": "Something went wrong!"
}
```

---

## Rate Limiting

**Note:** Rate limiting is not currently implemented but is recommended for production deployment.

---

## Authentication Flow

1. **Sign Up** or **Login** to receive a JWT token
2. Include the token in subsequent requests:
   - Header: `Authorization: Bearer <token>`
   - OR: Cookie (automatically sent by browser)
3. Token expires after 24 hours
4. Use **Forgot Password** if credentials are lost

---

## Best Practices

1. **Always use HTTPS** in production
2. **Store tokens securely** (HTTP-only cookies recommended)
3. **Validate input** on the client side before sending requests
4. **Handle errors gracefully** and display user-friendly messages
5. **Implement pagination** for list endpoints to improve performance
6. **Use query parameters** for filtering and sorting

---

**API Version:** 1.0.0  
**Last Updated:** January 2024
