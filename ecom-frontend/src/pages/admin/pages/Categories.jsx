
import { useState, useEffect } from "react";
import { Edit, Plus, Trash2 } from "lucide-react";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Categories() {
    const [categories, setCategories] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const res = await fetch("http://localhost:8000/api/categories");
            const data = await res.json();
            setCategories(data);
        } catch (err) {
            console.error("Failed to fetch categories:", err);
        }
    };
    const handleDeleteCategory = async (id) => {
        const token = localStorage.getItem('token');
        try {
            const res = await fetch(`http://localhost:8000/api/admin/categories/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    Authorization: `Bearer ${token}`,
                },
                // body: JSON.stringify({ category_name }),
            });

            if (res.ok) {
                toast.success("Category deleted successfully!");
                
                // Remove the category from local state
                setCategories((prev) => prev.filter((cat) => cat.id !== id));
            } else {
                console.error("Failed to delete category");
            }
        } catch (err) {
            console.error("Error deleting category:", err);
        }
    }



    return (
        <div>
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">Manage Categories</h1>
                <button
                    className="flex items-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                    onClick={() => navigate('/admin/add-category')}
                >
                    <Plus className="mr-2" size={18} />
                    Add Category
                </button>
            </div>

            <table className="w-full bg-white shadow-md rounded overflow-hidden">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="p-4 text-left">Name</th>
                        <th className="p-4 text-left">Action</th>

                    </tr>
                </thead>
                <tbody>
                    {categories.map((category) => (
                        <tr key={category.id} className="border-t">
                            <td className="p-4">{category.category_name}</td>
                            <td className="p-4 text-right space-x-2">
                                <button
                                    // onClick={() => navigate(`/admin/edit-category/${category.id}`)}

                                    className="inline-flex items-center px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-100"
                                >
                                    <Edit size={16} className="mr-1" />
                                    Edit
                                </button>

                                <button
                                    onClick={() => handleDeleteCategory(category.id)}
                                    className="inline-flex items-center px-3 py-1 text-sm border border-red-500 text-red-500 rounded hover:bg-red-100"
                                >
                                    <Trash2 size={16} className="mr-1" />
                                    Delete
                                </button>
                            </td>

                        </tr>

                    ))}
                </tbody>
            </table>
        </div>
    );
}
