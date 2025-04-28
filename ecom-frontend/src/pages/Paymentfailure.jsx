import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function PaymentFailure() {
  const navigate = useNavigate();

  useEffect(() => {
    toast.error("❌ Payment Failed!");
    setTimeout(() => {
        navigate('/shop')
    }, );
  }, [navigate]);

  return (
    <div className="h-screen flex items-center justify-center bg-red-50">
      <div className="text-center p-10 bg-white shadow rounded-lg">
        <h1 className="text-3xl font-bold text-red-600 mb-4">Payment Failed</h1>
        <p className="text-lg mb-2">Oops! Something went wrong with your payment.</p>
        <p className="text-gray-500">Redirecting you back to checkout...</p>
      </div>
    </div>
  );
}
