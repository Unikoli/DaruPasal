import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";

export default function AddProduct() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    volume: "",
    country: "",
    alcohol: "",
    category_id: "",
    image_url: "",
  });

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [image_url, setimage_url] = useState(null);

  const token = localStorage.getItem("token");

  // Fetch categories for the category dropdown
  useEffect(() => {
    const fetchCategories = async () => {
        console.log(token)
      try {
        const res = await fetch("http://localhost:8000/api/categories", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        console.log(data);
        setCategories(data);
      } catch (err) {
        console.error("Error fetching categories:", err);
        toast.error("Failed to load categories");
      }
    };

    fetchCategories();
  }, [token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };


const handleSubmit = async (e) => {
    e.preventDefault();
  
    const requiredFields = ["name", "price", "category_id"];
    for (let field of requiredFields) {
      if (!formData[field].toString().trim()) {
        toast.warn("Please fill in all required fields.");
        return;
      }
    }
  
    if (!image_url) {
      toast.warn("Please upload an image.");
      return;
    }
  
    setLoading(true);
  
    const formDataToSend = new FormData();
  
    // Append all text fields
    for (const key in formData) {
      formDataToSend.append(key, formData[key]);
    }
  
    // Append image file
    formDataToSend.append("image_url", image_url);
  
    try {
      const res = await fetch("http://localhost:8000/api/admin/products", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          // ❌ Do NOT set Content-Type when sending FormData
        },
        body: formDataToSend,
      });
  
      if (res.ok) {
        toast.success("Product added successfully!");
        setFormData({
          name: "",
          description: "",
          price: "",
          stock: "",
          volume: "",
          country: "",
          alcohol: "",
          category_id: "",
          image_url: "", // this is now redundant but okay to reset
        });
        setimage_url(null);
      } else {
        const errorData = await res.json();
        toast.error(errorData.message || "Failed to add product");
      }
    } catch (err) {
      console.error("Error:", err);
      toast.error("An error occurred while adding the product.");
    } finally {
      setLoading(false);
    }
  };  
const handleimage_urlChange = (e) => {
    const file = e.target.files[0];
    console.log("Selected file:", file);
    if (file) {
      setimage_url(file);
    }
  };
  

  return (
    <div className="min-h-screen w-full bg-gray-100 flex items-center justify-center p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-lg p-8 w-full max-w-3xl"
        encType="multipart/form-data"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Add New Product</h2>

        {[
          { label: "Name", name: "name" },
          { label: "Description", name: "description" },
          { label: "Price", name: "price", type: "number" },
          { label: "Stock", name: "stock", type: "number" },
          { label: "Volume", name: "volume", type: "number" },
          { label: "Country", name: "country" },
          { label: "Alcohol (%)", name: "alcohol", type: "number" },
        //   { label: "image_url URL", name: "image_url_url" },
        ].map(({ label, name, type = "text" }) => (
          <div className="mb-4" key={name}>
            <label
              htmlFor={name}
              className="block text-gray-700 font-medium mb-2"
            >
              {label}
            </label>
            <input
              type={type}
              id={name}
              name={name}
              value={formData[name]}
              onChange={handleChange}
              required={["name", "price", "category_id"].includes(name)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-400"
              placeholder={`Enter ${label.toLowerCase()}`}
            />
          </div>
        ))}

        {/* Category Dropdown */}
        <div className="mb-6">
          <label
            htmlFor="category_id"
            className="block text-gray-700 font-medium mb-2"
          >
            Category
          </label>
          <select
            id="category_id"
            name="category_id"
            value={formData.category_id}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-400"
          >
            <option value="">Select a category</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.category_name}
              </option>
            ))}
          </select>
        </div>
         {/* File Upload */}
         <div className="mb-6">
          <label htmlFor="image" className="block text-gray-700 font-medium mb-2">
            Product image_url_url
          </label>
          <input
            type="file"
            id="image_url"
            name="image_url"
            accept="image/*"
            onChange={handleimage_urlChange}
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-400"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full ${
            loading ? "bg-red-400" : "bg-red-600 hover:bg-red-700"
          } text-white py-2 rounded transition duration-200`}
        >
          {loading ? "Adding Product..." : "Add Product"}
        </button>
      </form>
    </div>
  );
}
