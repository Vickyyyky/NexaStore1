# NexaStore1

NexaStore1 is a full-stack e-commerce platform featuring an admin dashboard, a customer-facing storefront, and a backend API. It enables product management, order processing, user authentication, and favorites, making it suitable for modern online stores.

---

## Project Structure

```
NexaStore1/
  admin/      # Admin dashboard (React + Vite)
  backend/    # Node.js/Express backend API
  frontend/   # Customer-facing frontend (React + Vite)
```

---

## 1. Admin
- **Path:** `admin/`
- **Tech:** React, Vite
- **Purpose:** Admin dashboard for managing products, orders, and users.
- **Start:**
  ```sh
  cd admin
  npm install
  npm run dev
  ```

---

## 2. Backend
- **Path:** `backend/`
- **Tech:** Node.js, Express, MongoDB
- **Purpose:** RESTful API for products, users, orders, and favorites.
- **Start:**
  ```sh
  cd backend
  npm install
  node server.js
  ```
- **API Endpoints:**
  - `/api/items` - Product management
  - `/api/users` - User management
  - `/api/orders` - Order management
  - `/api/favs` - Favorites management

---

## 3. Frontend
- **Path:** `frontend/`
- **Tech:** React, Vite
- **Purpose:** Customer-facing e-commerce site.
- **Start:**
  ```sh
  cd frontend
  npm install
  npm run dev
  ```

---

## Features
- Product listing, details, and management
- User authentication and management
- Order creation and tracking
- Favorites system
- Admin dashboard for store management

---

## Setup & Development
1. Clone the repository.
2. Install dependencies in each module (`admin`, `backend`, `frontend`).
3. Start backend, then frontend/admin as needed.
4. Configure environment variables as required (e.g., database connection in `backend/config/db.js`).

---

## License
MIT License
