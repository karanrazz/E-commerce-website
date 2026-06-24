# 🛍️ ShopEasy - Full Stack E-Commerce Application

A complete e-commerce web application built with **React.js**, **Node.js**, **Express**, and **MongoDB**.

---

## 🚀 Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React.js, React Router v6, Context API |
| Backend | Node.js, Express.js |
| Database | MongoDB + Mongoose ODM |
| Auth | JWT (JSON Web Tokens) + bcryptjs |
| Styling | Pure CSS (no frameworks) |
| Notifications | react-hot-toast |

---

## ✨ Features

### Customer Features
- 🔐 User registration & login (JWT auth)
- 🏠 Home page with hero section & featured products
- 🔍 Search products by keyword
- 📂 Filter products by category
- 📄 Product detail page with reviews
- ⭐ Write product reviews & ratings
- 🛒 Cart management (add, remove, update qty)
- 💳 Checkout with shipping address
- 📦 COD & Razorpay payment options
- 📋 Order history & tracking with progress bar

### Admin Features
- 📊 Admin dashboard with revenue stats
- ➕ Add / Edit / Delete products
- 📦 View all orders
- 🔄 Update order status (Pending → Processing → Shipped → Delivered)

---

## 📁 Project Structure

```
ecommerce/
├── backend/
│   ├── controllers/
│   │   ├── authController.js      # Register, login, profile
│   │   ├── productController.js   # CRUD + reviews
│   │   └── orderController.js     # Create, track, manage orders
│   ├── middleware/
│   │   └── authMiddleware.js      # JWT protect + admin check
│   ├── models/
│   │   ├── User.js                # User schema with bcrypt
│   │   ├── Product.js             # Product + reviews schema
│   │   └── Order.js               # Order schema
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── productRoutes.js
│   │   ├── orderRoutes.js
│   │   └── cartRoutes.js
│   ├── server.js                  # Express app entry point
│   ├── seed.js                    # Seed database with sample data
│   └── .env.example
│
└── frontend/
    └── src/
        ├── context/
        │   ├── AuthContext.js     # Global auth state
        │   └── CartContext.js     # Global cart state (localStorage)
        ├── components/
        │   ├── Navbar/            # Sticky navbar with cart badge
        │   ├── ProductCard.js     # Reusable product card
        │   └── Footer.js
        ├── pages/
        │   ├── HomePage.js        # Hero + categories + featured
        │   ├── ProductsPage.js    # All products with filters
        │   ├── ProductDetailPage.js
        │   ├── CartPage.js
        │   ├── CheckoutPage.js
        │   ├── LoginPage.js
        │   ├── RegisterPage.js
        │   ├── OrdersPage.js
        │   ├── OrderDetailPage.js # Order progress tracker
        │   └── admin/
        │       ├── AdminDashboard.js
        │       ├── AdminProducts.js
        │       └── AdminOrders.js
        └── App.js                 # Routes (protected + admin)
```

---

## ⚙️ Setup & Installation

### Prerequisites
- Node.js v16+
- MongoDB (local or MongoDB Atlas)

### Step 1: Clone the project
```bash
git clone <your-repo-url>
cd ecommerce
```

### Step 2: Setup Backend
```bash
cd backend
npm install

# Create .env file
cp .env.example .env
# Edit .env and add your MongoDB URI and JWT secret

# Seed the database with sample products
node seed.js

# Start backend server
npm run dev
# Server runs on http://localhost:5000
```

### Step 3: Setup Frontend
```bash
cd frontend
npm install

# Start React app
npm start
# App runs on http://localhost:3000
```

---

## 🔑 Environment Variables (backend/.env)

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/ecommerce
JWT_SECRET=your_super_secret_key_here
```

For MongoDB Atlas (free cloud DB):
```env
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/ecommerce
```

---

## 👤 Demo Accounts (after seeding)

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@shopeasy.com | admin123 |
| User | john@example.com | john123 |

---

## 📡 API Endpoints

### Auth
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/auth/register | Register new user |
| POST | /api/auth/login | Login |
| GET | /api/auth/profile | Get profile (protected) |
| PUT | /api/auth/profile | Update profile (protected) |

### Products
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/products | Get all products (search + filter) |
| GET | /api/products/:id | Get single product |
| POST | /api/products | Create product (admin) |
| PUT | /api/products/:id | Update product (admin) |
| DELETE | /api/products/:id | Delete product (admin) |
| POST | /api/products/:id/reviews | Add review (protected) |

### Orders
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/orders | Place order (protected) |
| GET | /api/orders/myorders | Get my orders (protected) |
| GET | /api/orders/:id | Get order details |
| PUT | /api/orders/:id/pay | Mark as paid |
| GET | /api/orders | All orders (admin) |
| PUT | /api/orders/:id/status | Update status (admin) |

---

## 🌐 Deployment

### Deploy Backend (Render - Free)
1. Push code to GitHub
2. Go to render.com → New Web Service
3. Connect GitHub repo → set root to `backend`
4. Add environment variables
5. Deploy!

### Deploy Frontend (Vercel - Free)
1. Go to vercel.com → Import Project
2. Connect GitHub repo → set root to `frontend`
3. Set environment variable: `REACT_APP_API_URL=<your-render-backend-url>`
4. Deploy!

---

## 🎯 Key Concepts Demonstrated

- **REST API design** with proper HTTP methods
- **JWT Authentication** with protected routes
- **MongoDB** with Mongoose schemas & relationships
- **React Context API** for global state management
- **React Router v6** with protected routes
- **Component-based** architecture
- **Responsive design** without CSS frameworks
- **Admin panel** with role-based access control

---

*Built by [Your Name] | B.Tech Final Year Project*
