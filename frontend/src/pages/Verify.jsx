import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import axios from "axios";

const Verify = () => {
  const { search } = useLocation();
  const [status, setStatus] = useState("loading");
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const params = new URLSearchParams(search);
    const success = params.get("success");
    const orderId = params.get("orderId");

    if (!orderId) return setStatus("invalid");

    if (success === "true") {
      // Fetch order details
      axios
        .get(`https://your-backend.onrender.com/api/orders/${orderId}`)
        .then((res) => {
          setOrder(res.data);
          setStatus("success");
        })
        .catch((err) => {
          console.error(err);
          setStatus("error");
        });
    } else {
      setStatus("cancel");
    }
  }, [search]);

  if (status === "loading") return <p>Verifying your payment...</p>;
  if (status === "invalid") return <p>Invalid request</p>;
  if (status === "error") return <p>Something went wrong fetching your order.</p>;
  if (status === "cancel") return (
    <div className="text-center mt-10">
      <h1 className="text-2xl font-bold text-red-600">❌ Payment Cancelled</h1>
      <Link to="/" className="text-blue-600 underline mt-4 block">Go Home</Link>
    </div>
  );

  return (
    <div className="text-center mt-10">
      <h1 className="text-2xl font-bold text-green-700">✅ Payment Successful!</h1>
      <p>Order ID: <strong>{order._id}</strong></p>
      <p>Total: ₹{order.amount}</p>
      <p>Items:</p>
      <ul className="mt-2">
        {order.items.map((item, index) => (
          <li key={index}>
            {item.name} × {item.quantity} – ₹{item.price}
          </li>
        ))}
      </ul>
      <Link to="/" className="text-blue-600 underline mt-4 block">Go to Home</Link>
    </div>
  );
};

export default Verify;
