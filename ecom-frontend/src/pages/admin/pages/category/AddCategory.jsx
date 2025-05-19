import React, { useState } from "react";
import { toast } from "react-toastify";
import config from "../../../../config";

export default function AddCategory() {
  const [category_name, setCategoryName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    try {
      const res = await fetch(`${config.API_URL}/api/admin/categories`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ category_name }),
      });

      if (res.ok) {
        toast.success("Category added successfully!");
        setCategoryName(""); // Clear input
      } else {
        console.error("Failed to add category");
      }
    } catch (err) {
      console.error("Error adding category:", err);
    }
  };

  return (
    <div className="min-h-screen w-full bg-gray-100 flex items-center justify-center p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-lg p-8 w-full max-w-lg"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Add New Category</h2>
        <div className="mb-4">
          <label htmlFor="categoryName" className="block text-gray-700 font-medium mb-2">
            Category Name
          </label>
          <input
            type="text"
            id="categoryName"
            value={category_name}
            onChange={(e) => setCategoryName(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-400"
            placeholder="Enter category name"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700 transition duration-200"
        >
          Add Category
        </button>
      </form>
    </div>
  );
}
