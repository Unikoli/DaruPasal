import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    volume: "",
    country: "",
    alcohol: "",
    category_id: "",
  });

  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [image_url, setImageUrl] = useState(null); // file input
  const [existingImage, setExistingImage] = useState(""); // for preview

  const token = localStorage.getItem("token");

  // Fetch product details
  useEffect(() => {
    // const fetchProduct = async () => {
    //   try {
    //     const res = await fetch(`http://localhost:8000/api/admin/products/${id}`, {
    //       headers: {
    //         Authorization: `Bearer ${token}`,
    //       },
    //     });

    //     if (!res.ok) throw new Error("Failed to fetch product");

    //     const data = await res.json();
    //     setFormData({
    //       name: data.name || "",
    //       description: data.description || "",
    //       price: data.price || "",
    //       stock: data.stock || "",
    //       volume: data.volume || "",
    //       country: data.country || "",
    //       alcohol: data.alcohol || "",
    //       category_id: data.category_id || "",
    //     });
    //     setExistingImage(data.image_url); // Preview existing image
    //   } catch (err) {
    //     console.error(err);
    //     toast.error("Failed to load product.");
    //   }
    // };
    const fetchProduct = async () => {
          try {
            const res = await fetch(`http://localhost:8000/api/admin/products/${id}`, {
              headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`,
              },
            });
    
            const data = await res.json();
            setProducts(data);
          } catch (err) {
            console.error('Error fetching product:', err);
            toast.error('Failed to load product');
          }
        };
    fetchProduct();
  }, [id, token]);

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("http://localhost:8000/api/categories", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        setCategories(data);
      } catch (err) {
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

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) setImageUrl(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();

    for (const key in formData) {
      formDataToSend.append(key, formData[key]);
    }

    if (image_url) {
      formDataToSend.append("image_url", image_url);
    }

    setLoading(true);

    try {
      const res = await fetch(`http://localhost:8000/api/admin/products/${id}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formDataToSend,
      });

      if (res.ok) {
        toast.success("Product updated successfully!");
        navigate("/admin/products");
      } else {
        const error = await res.json();
        toast.error(error.message || "Update failed");
      }
    } catch (err) {
      console.error(err);
      toast.error("An error occurred while updating the product.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-gray-100 flex items-center justify-center p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-lg p-8 w-full max-w-3xl"
        encType="multipart/form-data"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Edit Product</h2>

        {[{ label: "Name", name: "name" },
          { label: "Description", name: "description" },
          { label: "Price", name: "price", type: "number" },
          { label: "Stock", name: "stock", type: "number" },
          { label: "Volume", name: "volume", type: "number" },
          { label: "Country", name: "country" },
          { label: "Alcohol (%)", name: "alcohol", type: "number" }
        ].map(({ label, name, type = "text" }) => (
          <div className="mb-4" key={name}>
            <label htmlFor={name} className="block text-gray-700 font-medium mb-2">
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
        <div className="mb-4">
          <label htmlFor="category_id" className="block text-gray-700 font-medium mb-2">
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

        {/* Image Upload */}
        <div className="mb-6">
          <label htmlFor="image_url" className="block text-gray-700 font-medium mb-2">
            Product Image
          </label>
          {existingImage && (
            <img
              src={`http://localhost:8000/${existingImage}`}
              alt="Current"
              className="h-24 mb-2"
            />
          )}
          <input
            type="file"
            id="image_url"
            name="image_url"
            accept="image/*"
            onChange={handleImageChange}
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
          {loading ? "Updating..." : "Update Product"}
        </button>
      </form>
    </div>
  );
}
