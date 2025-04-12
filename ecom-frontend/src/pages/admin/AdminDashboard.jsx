// src/pages/AdminDashboard.jsx
import React from "react";

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-red-100 p-10">
      <h1 className="text-3xl font-bold text-red-700">Welcome to Admin Dashboard</h1>
      <p className="mt-4 text-gray-700">You can manage products, categories, and more.</p>

      {/* Add routing to admin-specific components here */}
    </div>
  );
}
