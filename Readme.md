# 🛍️ E-Commerce Web Application

A full-stack e-commerce web application built with Laravel for the backend and Vite + TailwindCSS for the frontend. It features product listings, user authentication, cart functionality, order management, and secure eSewa payment integration.

---

## 📁 Project Structure

/
├── ecom-backend # Laravel-based backend API
├── ecom-frontend # Vite + TailwindCSS-based frontend

---

## 🚀 Features

- 🔐 User authentication and authorization
- 🛒 Shopping cart functionality
- 📦 Product listing and detailed views
- 🧾 Order management system
- 💳 Payment integration with eSewa
- 🌐 RESTful API endpoints
- 🖥️ Responsive frontend design

---

## 🧰 Tech Stack

### Backend (Laravel)

- PHP (>= 8.1)
- Laravel Framework
- MySQL or compatible relational database
- Composer
- eSewa Payment API

### Frontend (Vite + TailwindCSS)

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
- MySQL or equivalent RDBMS

---

## 📦 Backend Setup

cd ecom-backend

# Install PHP dependencies
composer install

# Copy environment config
cp .env.example .env

# Generate application key
php artisan key:generate

# Configure database in .env and run migrations
php artisan migrate

# (Optional) Seed the database
php artisan db:seed

# Start the local development server
php artisan serve
💻 Frontend Setup

cd ecom-frontend

# Install dependencies
npm install

# Start the development server
npm run dev
💳 Payment Integration (eSewa)
This application integrates with eSewa, a leading digital payment platform in Nepal.

To configure:

Update your backend .env file with:

ESEWA_MERCHANT_CODE=your_merchant_code
ESEWA_SECRET_KEY=your_secret_key
ESEWA_SUCCESS_URL=http://yourdomain.com/payment/success
ESEWA_FAILURE_URL=http://yourdomain.com/payment/failure
Ensure you are handling eSewa verification response and callback routes in Laravel.

Use appropriate endpoints for testing (uat.esewa.com.np) or production (esewa.com.np).

🌐 API Integration
The frontend communicates with the backend via RESTful APIs.

Make sure the backend server is running (e.g., http://localhost:8000) and configure frontend .env accordingly if needed.

📂 Environment Variables
Backend (ecom-backend/.env)
DB credentials

App key and URL

eSewa credentials and endpoints

Frontend (ecom-frontend/.env)
VITE_API_URL or similar (if used)


🙌 Acknowledgements
Laravel Documentation

TailwindCSS

Vite

eSewa Developer Guide

