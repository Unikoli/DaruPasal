# E-Commerce Web Application

A full-stack e-commerce web application with a Laravel-powered backend and a modern Vite + TailwindCSS frontend.

## 📁 Project Structure

/
├── ecom-backend # Laravel-based backend API
├── ecom-frontend # Vite + TailwindCSS-based frontend

yaml
Copy
Edit

---

## 🚀 Features

- 🔐 User authentication and authorization
- 🛒 Shopping cart functionality
- 🧾 Product listing and details
- 📦 Order management
- 🖥️ Responsive frontend UI
- 🌐 RESTful API integration

---

## 🧰 Tech Stack

### Backend (Laravel)

- PHP
- Laravel Framework
- MySQL (or compatible RDBMS)
- Composer

### Frontend (Vite + React/TailwindCSS)

- JavaScript (ES6+)
- React (or Vanilla JS if applicable)
- TailwindCSS
- Vite

---

## 🔧 Installation

### Prerequisites

- PHP >= 8.1
- Composer
- Node.js & npm
- MySQL or equivalent database

---

## 📦 Backend Setup

```bash
cd ecom-backend

# Install PHP dependencies
composer install

# Copy environment file and generate app key
cp .env.example .env
php artisan key:generate

# Configure your DB settings in .env
# Then run migrations
php artisan migrate

# Optionally seed database
php artisan db:seed

# Run the development server
php artisan serve
💻 Frontend Setup
bash
Copy
Edit
cd ecom-frontend

# Install JS dependencies
npm install

# Start the dev server
npm run dev
🌐 API Integration
Ensure the backend server (Laravel) is running (e.g., at http://localhost:8000), and update API URLs in the frontend if necessary.

📂 Environment Variables
Backend: Configure .env file in ecom-backend.

Frontend: If applicable, configure environment variables in a .env file in ecom-frontend.


🙌 Acknowledgements
Laravel Documentation

Vite.js & TailwindCSS Docs

