// components/modals/CategoryModal.jsx
import React, { useState, useEffect } from "react";

const CategoryModal = ({ isOpen, onClose, onSave, editingCategory }) => {
  const [name, setName] = useState("");

  useEffect(() => {
    if (editingCategory) {
      setName(editingCategory.name);
    } else {
      setName("");
    }
  }, [editingCategory]);

  const handleSubmit = () => {
    if (!name.trim()) return;
    const categoryData = editingCategory ? { ...editingCategory, name } : { name };
    onSave(categoryData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">
          {editingCategory ? "Edit Category" : "Add Category"}
        </h2>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 border rounded mb-4"
          placeholder="Category Name"
        />
        <div className="flex justify-end">
          <button
            className="px-4 py-2 bg-gray-300 mr-2 rounded"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded"
            onClick={handleSubmit}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default CategoryModal;