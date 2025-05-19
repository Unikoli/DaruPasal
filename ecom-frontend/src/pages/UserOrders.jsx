import React, { useEffect, useState } from "react";
import config from "../config";

export default function UserOrder() {
  const [orders, setOrders] = useState([]);

  const handleOrder = async () => {
    const token = localStorage.getItem("token");

    try {
      const res = await fetch(`${config.API_URL}/api/user/orders`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });

      if (res.ok) {
        const data = await res.json();
        console.log('data are', data);
        setOrders(data.orders);
        console.log(orders)
      } else {
        console.error("Failed to fetch orders");
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  useEffect(() => {
    // console.log("Updated orders:", orders);

    handleOrder();
  }, []); // 👈 ensures it runs only once when the component mounts

  return (
    <div className="overflow-x-auto mt-4">
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr className="bg-gray-100 text-left text-sm text-gray-600 uppercase tracking-wider">
            <th className="px-4 py-3 border">#</th>
            <th className="px-4 py-3 border">Date</th>
            <th className="px-4 py-3 border">products</th>
            <th className="px-4 py-3 border">Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.length === 0 ? (
            <tr>
              <td colSpan="4" className="text-center py-4">
                No orders found.
              </td>
            </tr>
          ) : (
            orders.map((order,index) => (
              <tr key={order.id} className="text-sm text-gray-700">
                <td className="px-4 py-2 border">{index+1}</td>
                <td className="px-4 py-2 border">
                  {new Date(order.created_at).toLocaleDateString()}
                </td>
                {/* <td className="px-4 py-2 border">${order.total.toFixed(2)}</td> */}
                {/* <td className="px-4 py-2 border capitalize">{order.items.product.name}</td> */}
                {/* <td className="px-4 py-2 border">
                  {order.payment ? `$${Number(order.payment.total_amount).toFixed(2)}` : "$0.00"}
                </td> */}

                <td className="px-4 py-2 border capitalize">
                  {order.items.length > 0 ? order.items[0].product.name : "No items"}
                </td>

                <td className="px-4 py-2 border capitalize">{order.status}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
