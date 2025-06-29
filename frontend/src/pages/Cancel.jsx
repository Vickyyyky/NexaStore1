import React from "react";
import { Link } from "react-router-dom";

const Cancel = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-red-50 text-red-800">
      <h1 className="text-3xl font-bold mb-4">❌ Payment Canceled</h1>
      <p className="text-lg mb-6">Your payment was not completed. You can try again anytime.</p>
      <Link
        to="/"
        className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700 transition"
      >
        Go to Home
      </Link>
    </div>
  );
};

export default Cancel;
