import React, { useEffect, useState } from "react";
import { Plus, Edit, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


export default function Products() {
  const [products, setProducts] = useState([]);
  const navigate=useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("http://localhost:8000/api/products");
        const data = await res.json();
        console.log(data);
        setProducts(data);
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };
    fetchProducts();
  }, []);
  const handleDeleteProduct =async(id)=>{
    const token=localStorage.getItem('token');
    try {
        const res=await fetch(`http://localhost:8000/api/admin/products/${id}`,{
            method:'DELETE',
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: `Bearer ${token}`,
              },
            //   body: JSON.stringify({ category_name }),
        })
        if(res.ok)
            {
                console.log('deleted successfully!!');
                setProducts((prev) => prev.filter((product) => product.id !== id));
                toast.success("Category deleted successfully!");
              }
              else
              {
                console.error("Failed to delete products");
              }     
        
    } catch (error) {
        console.error("Error deleting product:", err);
    }
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      
      <main className="flex-1 p-6 mt-16 md:mt-0">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-semibold">Manage Products</h2>
          <button className="flex items-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
          onClick={()=>navigate('/admin/add-product')}
          >
            <Plus className="mr-2" size={18} />
            Add Product
          </button>
        </div>

        {/* Table of Products */}
        <div className="bg-white shadow rounded overflow-x-auto">
          <table className="w-full text-left table-auto">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-4">Name</th>
                <th className="p-4">Price</th>
                <th className="p-4">Category</th>
                <th className="p-4 text-right">Actions</th>
                <th className="p-4 text-right">view</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id} className="border-t">
                  <td className="p-4">{product.name}</td>
                  <td className="p-4">Rs. {product.price}</td>
                  <td className="p-4">{product.category?.category_name || "category name"}</td>
                  <td className="p-4 text-right space-x-2">
                    <button className="inline-flex items-center px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-100"
                        onClick={()=>navigate(`/admin/edit-product/${product.id}`)}
                    >
                      <Edit size={16} className="mr-1" />
                      Edit
                    </button>
                    <button className="inline-flex items-center px-3 py-1 text-sm border border-red-500 text-red-500 rounded hover:bg-red-100"
                    onClick={()=>handleDeleteProduct(product.id)}
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
      </main>
    </div>
  );
}
