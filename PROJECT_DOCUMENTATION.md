# Warehouse Management System - Project Documentation

## 📋 Table of Contents
- [Project Overview](#project-overview)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Data Models](#data-models)
- [API Endpoints](#api-endpoints)
- [Frontend Architecture](#frontend-architecture)
- [Setup & Installation](#setup--installation)
- [Environment Variables](#environment-variables)

---

## 🎯 Project Overview

The Warehouse Management System is a full-stack MERN application designed to manage inventory and warehouse operations efficiently. The system allows users to:
- View and manage products
- Track inventory levels
- Organize warehouse garages
- Perform CRUD operations on products and garages

---

## 🛠 Technology Stack

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js v5.1.0
- **Database**: MongoDB with Mongoose ODM v8.19.4
- **Environment Management**: dotenv v17.2.3
- **Architecture**: RESTful API with MVC pattern

### Frontend
- **Library**: React v19.2.0
- **Routing**: React Router DOM v7.9.6
- **Styling**: CSS3 with modern design patterns
- **Build Tool**: Create React App (react-scripts v5.0.1)
- **HTTP Client**: Fetch API
- **Testing**: Jest, React Testing Library

### Development Tools
- **Backend Dev Server**: Nodemon (for hot-reloading)
- **Frontend Dev Server**: React Scripts
- **Proxy Configuration**: Frontend proxies API requests to `http://localhost:5000`

---

## 📁 Project Structure

```
Warehouse/
│
├── backend/                      # Backend Node.js/Express application
│   ├── server.js                 # Main server entry point
│   ├── package.json              # Backend dependencies
│   │
│   ├── controllers/              # Business logic layer
│   │   ├── productController.js  # Product CRUD operations
│   │   └── garageController.js   # Garage CRUD operations
│   │
│   ├── models/                   # MongoDB schema definitions
│   │   ├── productModel.js       # Product data model
│   │   └── garageModel.js        # Garage data model
│   │
│   ├── routes/                   # API route definitions
│   │   ├── products.js           # Product endpoints
│   │   └── garages.js            # Garage endpoints
│   │
│   └── public/                   # Static files (if any)
│
├── frontend/                     # Frontend React application
│   ├── package.json              # Frontend dependencies
│   ├── public/                   # Static assets
│   │   ├── index.html            # HTML template
│   │   ├── manifest.json         # PWA manifest
│   │   └── robots.txt            # SEO configuration
│   │
│   └── src/                      # Source code
│       ├── index.js              # React entry point
│       ├── index.css             # Global styles
│       ├── App.js                # Main app component with routing
│       │
│       ├── components/           # Reusable components
│       │   ├── NavBar.js         # Navigation bar component
│       │   └── ProductCard.js    # Product card display component
│       │
│       └── pages/                # Page components
│           ├── Home.js           # Home/landing page
│           └── Products.js       # Products listing page
│
└── README.md                     # Project readme
```

---

## 🗄 Data Models

### Product Model

**Schema**: `productModel.js`

```javascript
{
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  quantity: {
    type: Number,
    required: true
  }
}
```

**Collection Name**: `products`

**Fields**:
- `_id`: MongoDB ObjectId (auto-generated)
- `name`: Product name (required)
- `price`: Product price in currency units (required)
- `quantity`: Available stock quantity (required)
- `__v`: Version key (Mongoose default)

### Garage Model

**Schema**: `garageModel.js`

```javascript
{
  num: {
    type: Number,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  size: {
    capacity: Number,
    required: true
  }
}
```

**Collection Name**: `garages`

**Fields**:
- `_id`: MongoDB ObjectId (auto-generated)
- `num`: Garage identification number (required)
- `name`: Garage name (required)
- `size.capacity`: Storage capacity (required)
- `__v`: Version key (Mongoose default)

---

## 🔌 API Endpoints

### Product Endpoints

**Base URL**: `/api/products`

| Method | Endpoint | Description | Request Body | Response |
|--------|----------|-------------|--------------|----------|
| GET | `/` | Get all products | - | `{ products: Product[] }` |
| GET | `/create` | Get create page info | - | `{ message: string }` |
| POST | `/create` | Create new product | `{ name, price, quantity }` | `{ message, product }` |
| GET | `/:id` | Get product by ID | - | `{ product: Product }` |
| PUT | `/:id` | Update product | `{ name?, price?, quantity? }` | `{ message, product }` |
| DELETE | `/:id` | Delete product | - | `{ message }` |
| PATCH | `/:id` | Partial update | Product fields | `{ message }` |

### Garage Endpoints

**Base URL**: `/api/garages` (route file created but not connected in server.js)

| Method | Endpoint | Description | Request Body | Response |
|--------|----------|-------------|--------------|----------|
| GET | `/` | Get all garages | - | `{ garages: Garage[] }` |
| GET | `/:id` | Get garage by ID | - | `{ garage: Garage }` |
| POST | `/create` | Create new garage | `{ num, name, capacity }` | `{ message }` |
| DELETE | `/:id` | Delete garage | - | `{ message }` |

**Note**: Garage routes are defined but not yet mounted in `server.js`

---

## ⚛️ Frontend Architecture

### Routing Structure

The application uses React Router DOM for client-side routing:

```javascript
BrowserRouter
  ├── / (Home)           → Home.js
  └── /products          → Products.js
```

### Component Hierarchy

```
App.js
├── NavBar (persistent across all routes)
└── Routes
    ├── Home
    └── Products
        └── ProductCard (rendered for each product)
```

### Key Components

#### 1. **App.js**
- Root component
- Configures routing with React Router
- Renders NavBar globally

#### 2. **NavBar.js**
- Navigation component
- Links to Home, Products, and Contact pages
- Displays app branding "Warehouse Management System"

#### 3. **Home.js**
- Landing page component
- Simple welcome message
- Introduction to inventory management features

#### 4. **Products.js**
- Displays all products fetched from API
- Uses React hooks (`useState`, `useEffect`)
- Fetches data from `/api/products/` endpoint
- Maps over products and renders `ProductCard` components
- Includes error handling

#### 5. **ProductCard.js**
- Receives `product` as prop
- Displays product name, price, and stock
- Reusable component for product display

### State Management

Currently using **React Hooks** for local state:
- `useState`: Managing component state (products list, loading, errors)
- `useEffect`: Handling side effects (API calls)

### API Integration

- **Proxy Configuration**: Frontend proxies requests to `http://localhost:5000`
- **Fetch API**: Used for HTTP requests
- **Error Handling**: Try-catch blocks with console error logging

---

## 🚀 Setup & Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn package manager

### Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create .env file with required variables
# MONGO_URI=mongodb://localhost:27017/warehouse
# PORT=5000

# Start development server
npm run dev

# Or start production server
npm start
```

### Frontend Setup

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start development server (runs on port 3000)
npm start

# Build for production
npm run build
```

### Full Stack Development

1. Start MongoDB service
2. Run backend server: `cd backend && npm run dev`
3. Run frontend dev server: `cd frontend && npm start`
4. Access application at `http://localhost:3000`

---

## 🔐 Environment Variables

### Backend (.env)

Create a `.env` file in the `backend` directory:

```env
# MongoDB Connection String
MONGO_URI=mongodb://localhost:27017/warehouse
# Or for MongoDB Atlas:
# MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/warehouse

# Server Port
PORT=5000

# Node Environment (optional)
NODE_ENV=development
```

### Frontend

The frontend uses a proxy configuration in `package.json`:

```json
{
  "proxy": "http://localhost:5000"
}
```

This proxies API requests from the React dev server to the Express backend.

---

## 📦 Available Scripts

### Backend Scripts

```bash
npm start      # Start production server
npm run dev    # Start development server with nodemon
npm test       # Run tests (not configured yet)
```

### Frontend Scripts

```bash
npm start      # Start development server (port 3000)
npm run build  # Build for production
npm test       # Run test suite
npm run eject  # Eject from Create React App (irreversible)
```

---

## 🔄 Application Flow

### Product Management Flow

1. **View Products**: User navigates to `/products`
2. **Fetch Data**: `Products.js` fetches from `/api/products/`
3. **Display**: Each product rendered as `ProductCard`
4. **Create Product**: POST request to `/api/products/create`
5. **Update Product**: PUT request to `/api/products/:id`
6. **Delete Product**: DELETE request to `/api/products/:id`

### Request-Response Cycle

```
Browser → React App → Proxy → Express Server → MongoDB
   ↑                                              ↓
   └────────────── JSON Response ←────────────────┘
```

---

## 🎨 Design Patterns

### Backend Patterns
- **MVC (Model-View-Controller)**: Separation of concerns
  - Models: Data structure (Mongoose schemas)
  - Controllers: Business logic
  - Routes: URL endpoints (acts as view layer for API)
- **RESTful API**: Standard HTTP methods and endpoints
- **Middleware Pattern**: Express middleware for request processing

### Frontend Patterns
- **Component-Based Architecture**: Reusable UI components
- **Container/Presentational Pattern**: 
  - Container: `Products.js` (fetches data)
  - Presentational: `ProductCard.js` (displays data)
- **Routing Pattern**: Client-side routing with React Router

---

## 🔍 Future Enhancements

### Planned Features
1. **Authentication & Authorization**: User login and role-based access
2. **Garage Management Integration**: Connect garage routes to UI
3. **Advanced Search & Filtering**: Search products by various criteria
4. **Pagination**: Handle large datasets efficiently
5. **Real-time Updates**: WebSocket integration for live inventory updates
6. **Analytics Dashboard**: Inventory reports and statistics
7. **Image Upload**: Product images with cloud storage
8. **Responsive Design**: Mobile-optimized UI
9. **State Management**: Redux or Context API for global state
10. **Testing**: Unit tests, integration tests, E2E tests

### Technical Improvements
- Input validation with libraries (Joi, Yup)
- API rate limiting and security (helmet, cors)
- Logging system (Winston, Morgan)
- Error handling middleware
- Database indexing for performance
- Caching strategy (Redis)
- API documentation (Swagger/OpenAPI)

---

## 📝 Notes

- **Garage Routes**: The garage router exists but is not yet imported/mounted in `server.js`
- **Error Handling**: Basic try-catch blocks implemented; could be enhanced with custom error classes
- **Validation**: Currently no input validation on backend or frontend
- **Testing**: Test framework installed but no tests written yet
- **Stock Field**: ProductCard references `product.stock`, but the model uses `quantity` - needs alignment

---

## 👥 Contributing

This is a learning/development project. To contribute:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

---

## 📄 License

ISC License (as specified in package.json)

---

**Last Updated**: January 28, 2026
**Version**: 1.0.0
