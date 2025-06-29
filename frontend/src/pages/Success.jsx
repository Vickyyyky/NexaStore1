import React from "react";
import { Link } from "react-router-dom";

const Success = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-green-50 text-green-800">
      <h1 className="text-3xl font-bold mb-4">🎉 Payment Successful!</h1>
      <p className="text-lg mb-6">Thank you for your purchase. Your order has been placed successfully.</p>
      <Link
        to="/"
        className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition"
      >
        Go to Home
      </Link>
    </div>
  );
};

export default Success;
