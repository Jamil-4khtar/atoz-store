# A-Z Store E-commerce Application

**Live Demo**: [https://atoz-store.onrender.com/](https://atoz-store.onrender.com/)

A full-featured e-commerce platform with user and admin functionalities, built with the MERN stack (MongoDB, Express, React, Node.js).

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Usage](#usage)
- [Admin Features](#admin-features)
- [User Features](#user-features)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)

## ✨ Features

### 🛒 Shopping Experience
- Product browsing with categories and search functionality
- Detailed product pages with images, descriptions, and reviews
- Rating system for products
- Image zoom functionality for product images
- Cart management

### 👤 User Features
- User registration and authentication
- Profile management
- Order history and tracking
- Review and rating system
- Secure checkout process

### 👑 Admin Dashboard
- Product management (add, edit, delete)
- User management
- Order processing and tracking
- Analytics dashboard
- Chat support system

### 💳 Payment Integration
- PayPal integration
- Cash on delivery option

## 🛠️ Tech Stack

### Frontend
- React.js with Vite
- Redux for state management
- React Bootstrap for UI components
- Socket.io for real-time chat
- React Router for navigation

### Backend
- Node.js with Express
- MongoDB with Mongoose
- JWT for authentication
- bcrypt for password hashing
- Socket.io for real-time communication

## 📁 Project Structure

```
e-commerce/
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Page components
│   │   ├── redux/          # Redux state management
│   │   └── utils/          # Utility functions
│   └── public/             # Static assets
└── server/                 # Backend Node.js application
    ├── seeder/             # Database seeding scripts
    ├── controllers/        # API controllers
    ├── models/             # MongoDB models
    ├── routes/             # API routes
    └── utils/              # Utility functions
```

## 🚀 Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB

### Setup

1. Clone the repository
```bash
git clone https://github.com/yourusername/e-commerce.git
cd e-commerce
```

2. Install dependencies
```bash
npm install
cd client
npm install
cd ../server
npm install
```

3. Set up environment variables
   - Create a `.env` file in the server directory
   - Add the following variables:
     ```
     PORT=5000
     MONGODB_URI=your_mongodb_connection_string
     JWT_SECRET=your_jwt_secret
     PAYPAL_CLIENT_ID=your_paypal_client_id
     ```

4. Seed the database (optional)
```bash
cd server
npm run seeder
```

## 🖥️ Usage

### Development Mode

Run both frontend and backend concurrently:
```bash
npm run dev
```

Or run them separately:

Backend:
```bash
cd server
npm run dev
```

Frontend:
```bash
cd client
npm run dev
```

### Production Build
```bash
cd client
npm run build
cd ../server
npm start
```

## 👑 Admin Features

### Product Management
- Add, edit, and delete products
- Upload and manage product images
- Set product attributes and categories

### User Management
- View and manage user accounts
- Admin privileges assignment

### Order Management
- View all orders
- Update order status (processing, shipped, delivered)
- Mark orders as delivered

### Analytics
- Sales reports
- User statistics
- Product performance

## 👤 User Features

### Account Management
- Register and login
- Update profile information
- View order history

### Shopping
- Browse products by category
- Search for products
- Add products to cart
- Checkout process
- Payment options (PayPal, Cash on Delivery)

### Reviews
- Write product reviews
- Rate products

## 🔌 API Endpoints

### Products
- `GET /api/products` - Get all products
- `GET /api/products/p/:id` - Get product details
- `POST /api/products/admin` - Create a product (admin only)
- `PUT /api/products/admin/:id` - Update a product (admin only)
- `DELETE /api/products/admin/:id` - Delete a product (admin only)

### Users
- `POST /api/users/login` - User login
- `POST /api/users/register` - User registration
- `GET /api/users/profile/:id` - Get user profile
- `PUT /api/users/profile` - Update user profile
- `POST /api/users/review/:productId` - Add product review

### Orders
- `POST /api/orders` - Create an order
- `GET /api/orders/user/:id` - Get order details
- `PUT /api/orders/paid/:id` - Mark order as paid
- `PUT /api/orders/delivered/:id` - Mark order as delivered (admin only)

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

Built with ❤️ by Jamil Akhtar Laskar
