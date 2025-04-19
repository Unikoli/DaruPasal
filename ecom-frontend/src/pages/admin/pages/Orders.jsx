import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { toast } from "react-toastify";
import { exportOrdersToExcel } from "../../../utils/exportUtils";


Modal.setAppElement("#root");

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [updatedStatus, setUpdatedStatus] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortType, setSortType] = useState("recent");
  const token = localStorage.getItem("token");

  const ORDERS_PER_PAGE = 10;

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch("http://localhost:8000/api/admin/orders", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (data.success) setOrders(data.data);
        else toast.error(data.message || "Failed to fetch orders.");
      } catch (err) {
        console.error("Error:", err);
        toast.error("Something went wrong.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [token]);

  useEffect(() => {
    let sorted = [...orders];

    switch (sortType) {
      case "price_asc":
        sorted.sort((a, b) => getTotalPrice(a) - getTotalPrice(b));
        break;
      case "price_desc":
        sorted.sort((a, b) => getTotalPrice(b) - getTotalPrice(a));
        break;
      case "recent":
        sorted.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        break;
      case "oldest":
        sorted.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
        break;
      case "status":
        sorted.sort((a, b) => a.status.localeCompare(b.status));
        break;
      default:
        break;
    }

    setFilteredOrders(sorted);
    setCurrentPage(1); // Reset to first page on sort change
  }, [sortType, orders]);

  const getTotalPrice = (order) =>
    order.items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const totalPages = Math.ceil(filteredOrders.length / ORDERS_PER_PAGE);
  const currentOrders = filteredOrders.slice(
    (currentPage - 1) * ORDERS_PER_PAGE,
    currentPage * ORDERS_PER_PAGE
  );

  const openModal = (order) => {
    setSelectedOrder(order);
    setUpdatedStatus(order.status);
  };

  const closeModal = () => setSelectedOrder(null);

  const handleStatusUpdate = async () => {
    try {
      const res = await fetch(`http://localhost:8000/api/admin/orders/${selectedOrder.id}/status`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: updatedStatus }),
      });

      const data = await res.json();
      if (res.ok) {
        toast.success("Order status updated!");
        const updated = orders.map((o) =>
          o.id === selectedOrder.id ? { ...o, status: updatedStatus } : o
        );
        setOrders(updated);
        closeModal();
      } else toast.error(data.message || "Failed to update order.");
    } catch (err) {
      console.error(err);
      toast.error("An error occurred.");
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex justify-end gap-4 mb-4">
  <button onClick={() => exportOrdersToExcel(orders)} className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
    Export to Excel
  </button>
</div>

      <h2 className="text-3xl font-bold mb-4 text-center">All Orders</h2>

      {/* Sorting */}
      <div className="flex justify-end mb-4">
        <select
          className="p-2 border rounded"
          value={sortType}
          onChange={(e) => setSortType(e.target.value)}
        >
          <option value="recent">Sort by: Recently Added</option>
          <option value="oldest">Oldest First</option>
          <option value="price_asc">Price: Low to High</option>
          <option value="price_desc">Price: High to Low</option>
          <option value="status">Status (A-Z)</option>
        </select>
      </div>

      {loading ? (
        <p className="text-center">Loading...</p>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white shadow rounded">
              <thead className="bg-gray-100">
                <tr>
                  <th className="text-left px-4 py-2">Order ID</th>
                  <th className="text-left px-4 py-2">User</th>
                  <th className="text-left px-4 py-2">Status</th>
                  <th className="text-left px-4 py-2">Products</th>
                  <th className="text-left px-4 py-2">Total Price</th>
                  <th className="text-left px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentOrders.map((order) => (
                  <tr key={order.id} className="border-t">
                    <td className="px-4 py-2">{order.id}</td>
                    <td className="px-4 py-2">{order.user?.name}</td>
                    <td
                      className={`px-4 py-2 capitalize ${order.status === 'delivered'
                        ? 'text-green-600 font-semibold'
                        : order.status === 'canceled'
                          ? 'text-red-600 font-semibold'
                          : 'text-gray-700'
                        }`}
                    >
                      {order.status}
                    </td>
                    <td className="px-4 py-2 space-y-1">
                      {order.items.map((item, index) => (
                        <div key={index} className="capitalize">
                          {item.product.name}
                        </div>
                      ))}
                    </td>
                    <td className="px-4 py-2 font-medium">
                      ${getTotalPrice(order).toFixed(2)}
                    </td>
                    <td className="px-4 py-2">
                      <button
                        onClick={() => openModal(order)}
                        className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                      >
                        View / Update
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination Controls */}
          <div className="mt-6 flex justify-center space-x-2">
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                onClick={() => setCurrentPage(index + 1)}
                className={`px-3 py-1 border rounded ${currentPage === index + 1
                  ? "bg-blue-500 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-200"
                  }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </>
      )}

      {/* Modal */}
      {selectedOrder && (
        <Modal
          isOpen={true}
          onRequestClose={closeModal}
          contentLabel="Order Details"
          className="max-w-3xl mx-auto mt-20 p-6 bg-white rounded shadow-lg"
          overlayClassName="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-start"
        >
          <h3 className="text-2xl font-bold mb-4">Order #{selectedOrder.id}</h3>
          <p className="mb-2">
            <strong>Status:</strong>{" "}
            <select
              className="border p-2 ml-2 rounded"
              value={updatedStatus}
              onChange={(e) => setUpdatedStatus(e.target.value)}
            >
              <option value="pending">Pending</option>
              <option value="processing">Processing</option>
              <option value="shipped">Shipped</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            {selectedOrder.items.map((item) => (
              <div key={item.id} className="border p-3 rounded bg-gray-50">
                <img
                  src={`http://localhost:8000/${item.product.image_url}`}
                  alt={item.product.name}
                  className="h-40 w-full object-cover rounded mb-2"
                />
                <h4 className="font-medium">{item.product.name}</h4>
                <p className="text-sm mt-1">
                  <strong>Qty:</strong> {item.quantity}
                </p>
                <p><strong>Price:</strong> ${item.price}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 flex justify-between">
            <button
              onClick={handleStatusUpdate}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Update Status
            </button>
            <button
              onClick={closeModal}
              className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
            >
              Close
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
}
