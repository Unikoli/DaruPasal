
import React, { useEffect, useState } from "react";

export default function AdminDashboard() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");

      try {
        const headers = {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        };

        const [productsRes, categoriesRes, ordersRes] = await Promise.all([
          fetch("http://localhost:8000/api/products", { headers }),
          fetch("http://localhost:8000/api/categories", { headers }),
          fetch("http://localhost:8000/api/admin/orders", { headers }),
        ]);

        // Check if the responses are okay before parsing
        if (!productsRes.ok || !categoriesRes.ok || !ordersRes.ok) {
          throw new Error("Failed to load data from API.");
        }

        const productsData = await productsRes.json();
        const categoriesData = await categoriesRes.json();
        const ordersData = await ordersRes.json();

        // Log orders data to verify the response structure
        console.log("Orders response:", ordersData);

        setProducts(productsData.products || productsData);
        // console.log(products.length)
        setCategories(categoriesData.categories || categoriesData);
        setOrders(ordersData.orders || ordersData);
        // console.log(orders.length);

      } catch (err) {
        setError("Failed to load dashboard data. Please try again later.");
        console.error("Failed to load dashboard data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div className="p-6 text-center text-xl">Loading dashboard...</div>;
  }

  if (error) {
    return <div className="p-6 text-center text-xl text-red-500">{error}</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      {/* Metrics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-white shadow-md rounded-lg p-6 text-center">
          <h2 className="text-2xl font-semibold text-blue-600">{products.length}</h2>
          <p className="text-gray-600 mt-2">Total Products</p>
        </div>
        <div className="bg-white shadow-md rounded-lg p-6 text-center">
          <h2 className="text-2xl font-semibold text-green-600">{categories.length}</h2>
          <p className="text-gray-600 mt-2">Total Categories</p>
        </div>
        <div className="bg-white shadow-md rounded-lg p-6 text-center">
          <h2 className="text-2xl font-semibold text-purple-600">{orders.length}</h2>
          <p className="text-gray-600 mt-2">Total Orders</p>
        </div>
      </div>

      {/* Recent Orders Table */}
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Recent Orders</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-4 border-b">Order ID</th>
                <th className="p-4 border-b">Customer</th>
                <th className="p-4 border-b">Status</th>
                <th className="p-4 border-b">Total</th>
                <th className="p-4 border-b">Date</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(orders) && orders.length > 0 ? (
                orders.slice(0, 5).map((order) => (
                  <tr key={order.id} className="border-t">
                    <td className="p-4">{order.id}</td>
                    <td className="p-4">{order.user?.name || "N/A"}</td>
                    <td className="p-4">{order.status || "Pending"}</td>
                    <td className="p-4">Rs. {order.total_amount}</td>
                    <td className="p-4">{new Date(order.created_at).toLocaleDateString()}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="p-4 text-center text-gray-500">
                    No orders found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
