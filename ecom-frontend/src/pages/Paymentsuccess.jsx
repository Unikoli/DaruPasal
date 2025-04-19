import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function PaymentSuccess() {
  const navigate = useNavigate();

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const dataParam = searchParams.get("data");

    if (!dataParam) {
      toast.error("Missing payment data.");
      return;
    }

    const verifyPayment = async () => {
      try {
        const res = await fetch(`http://localhost:8000/api/payment/success?data=${dataParam}`);
        const result = await res.json();

        if (result.success) {
          toast.success("🎉 Payment Successful!");
          setTimeout(() => navigate("/shop"), 3000); // Redirect after 3 seconds
        } else {
          toast.error(result.message || "Payment verification failed.");
        }
      } catch (err) {
        console.error(err);
        toast.error("An error occurred during verification.");
      }
    };

    verifyPayment();
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
