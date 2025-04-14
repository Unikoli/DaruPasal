import React, { useState, useEffect } from "react";

const ProductModal = ({ isOpen, onClose, onSave, editingProduct, categories }) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [image, setImage] = useState(null);

  useEffect(() => {
    if (editingProduct) {
      setName(editingProduct.name);
      setPrice(editingProduct.price);
      setCategoryId(editingProduct.category_id);
    } else {
      setName("");
      setPrice("");
      setCategoryId("");
      setImage(null);
    }
  }, [editingProduct]);

  const handleSubmit = () => {
    if (!name || !price || !categoryId) return;
    const productData = new FormData();
    productData.append("name", name);
    productData.append("price", price);
    productData.append("category_id", categoryId);
    if (image) productData.append("image", image);
    if (editingProduct) productData.append("id", editingProduct.id);

    onSave(productData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">
          {editingProduct ? "Edit Product" : "Add Product"}
        </h2>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 border rounded mb-3"
          placeholder="Product Name"
        />
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="w-full p-2 border rounded mb-3"
          placeholder="Price"
        />
        <select
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
          className="w-full p-2 border rounded mb-3"
        >
          <option value="">Select Category</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>{cat.name}</option>
          ))}
        </select>
        <input
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
          className="w-full mb-3"
        />
        <div className="flex justify-end">
          <button
            className="px-4 py-2 bg-gray-300 mr-2 rounded"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-green-500 text-white rounded"
            onClick={handleSubmit}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
