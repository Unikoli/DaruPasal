import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function PaymentSuccess() {
  const navigate = useNavigate();

  useEffect(() => {
    
    toast.success('Payment succcessfull!');
    setTimeout(() => {
      navigate('/shop');
    }, 1000);

  }, [navigate]);

  return (
    <div className="h-screen flex items-center justify-center bg-green-50">
      <div className="text-center p-10 bg-white shadow rounded-lg">
        <h1 className="text-3xl font-bold text-green-600 mb-4">Payment Successful</h1>
        <p className="text-lg mb-2">Thank you for your purchase!</p>
        <p className="text-gray-500">Redirecting you to the shop page...</p>
      </div>
    </div>
  );
}
