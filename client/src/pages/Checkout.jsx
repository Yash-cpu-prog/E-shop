
import { useState } from "react";
import axios from "axios";
import { useCart } from "../context/CartContext";

import qrImg from "../assets/qr.jpeg";

export default function Checkout() {
  const { cart, totalPrice, clearCart } = useCart();

  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [loading, setLoading] = useState(false);

  const placeOrder = async () => {
    const token = localStorage.getItem("token");

    if (cart.length === 0) {
      return alert("Cart is empty ❌");
    }

    try {
      setLoading(true);

      const { data } = await axios.post(
        "http://localhost:5000/api/orders",
        {
          products: cart,
          totalAmount: totalPrice,
          paymentMethod,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Order Placed Successfully 🚀");
      console.log("ORDER:", data);

      clearCart();
    } catch (err) {
      console.log(err);
      alert("Order Failed ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 sm:p-6 md:p-10">

      <h1 className="text-2xl sm:text-3xl font-bold mb-6">
        Checkout
      </h1>

      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          {/* CART ITEMS */}
          {cart.map((item) => (
            <div
              key={item._id}
              className="flex justify-between bg-white p-4 mb-4 rounded shadow"
            >
              <div className="flex gap-4">
                <img
                  src={item.image}
                  className="w-16 h-16 object-cover rounded"
                />
                <div>
                  <h2>{item.name}</h2>
                  <p>
                    ₹{item.price} × {item.qty}
                  </p>
                </div>
              </div>

              <p className="font-bold">
                ₹{(item.price * item.qty).toFixed(2)}
              </p>
            </div>
          ))}

          {/* TOTAL */}
          <h2 className="text-xl font-bold mt-5">
            Total: ₹{totalPrice?.toFixed(2)}
          </h2>

          {/* PAYMENT METHODS */}
          <div className="bg-white p-5 rounded shadow mt-5">
            <h3 className="font-bold mb-3">Payment Method</h3>

            <div className="flex gap-4 flex-wrap">
              <button
                className={`px-4 py-2 rounded ${
                  paymentMethod === "COD"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200"
                }`}
                onClick={() => setPaymentMethod("COD")}
              >
                COD
              </button>

              <button
                className={`px-4 py-2 rounded ${
                  paymentMethod === "CARD"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200"
                }`}
                onClick={() => setPaymentMethod("CARD")}
              >
                Card
              </button>

              <button
                className={`px-4 py-2 rounded ${
                  paymentMethod === "UPI"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200"
                }`}
                onClick={() => setPaymentMethod("UPI")}
              >
                UPI
              </button>
            </div>
          </div>

          {/* 💳 CARD FORM (INLINE) */}
        
{/* 💳 MODERN CARD FORM */}
{paymentMethod === "CARD" && (
  <div className="bg-white p-5 sm:p-6 rounded-2xl shadow mt-6 max-w-xl mx-auto">

    <h3 className="font-bold text-lg mb-5 text-gray-800">
      💳 Card Payment
    </h3>

    <div className="space-y-4">

      {/* Card Number */}
      <div>
        <label className="text-sm text-gray-600">Card Number</label>
        <input
          type="text"
          placeholder="1234 5678 9012 3456"
          maxLength={19}
          className="w-full mt-1 border rounded-lg px-4 py-2 focus:ring-2 focus:ring-pink-500 outline-none"
        />
      </div>

      {/* Name */}
      <div>
        <label className="text-sm text-gray-600">Card Holder Name</label>
        <input
          type="text"
          placeholder="John Doe"
          className="w-full mt-1 border rounded-lg px-4 py-2 focus:ring-2 focus:ring-pink-500 outline-none"
        />
      </div>

      {/* Expiry + CVV */}
      <div className="flex flex-col sm:flex-row gap-4">

        <div className="w-full">
          <label className="text-sm text-gray-600">Expiry Date</label>
          <input
            type="text"
            placeholder="MM/YY"
            maxLength={5}
            className="w-full mt-1 border rounded-lg px-4 py-2 focus:ring-2 focus:ring-pink-500 outline-none"
          />
        </div>

        <div className="w-full">
          <label className="text-sm text-gray-600">CVV</label>
          <input
            type="password"
            placeholder="***"
            maxLength={3}
            className="w-full mt-1 border rounded-lg px-4 py-2 focus:ring-2 focus:ring-pink-500 outline-none"
          />
        </div>

      </div>

      {/* Pay Button */}
      <button
        onClick={() => {
          alert("Payment Success ✅");
          placeOrder();
        }}
        className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white py-3 rounded-lg font-semibold hover:opacity-90 transition"
      >
        Pay ₹{totalPrice?.toFixed(2)}
      </button>

      {/* Secure Note */}
      <p className="text-xs text-gray-500 text-center">
        🔒 Your payment is secure and encrypted
      </p>

    </div>

  </div>
)}



          {/* 🔥 UPI QR */}
          {paymentMethod === "UPI" && (
            <div className="bg-white p-5 rounded shadow mt-5 text-center">
              <h3 className="font-bold mb-3">Scan & Pay (UPI)</h3>

              <img
                src={qrImg}
                alt="UPI QR"
                className="w-48 h-48 mx-auto object-contain"
              />

              <p className="text-sm text-gray-500 mt-2">
                Scan using Google Pay / PhonePe / Paytm
              </p>

              <button
                onClick={() => {
                  alert("Payment Success ✅");
                  placeOrder();
                }}
                className="bg-green-600 text-white px-6 py-2 rounded mt-4"
              >
                I Have Paid
              </button>
            </div>
          )}

          {/* COD BUTTON */}
          {paymentMethod === "COD" && (
            <button
              onClick={placeOrder}
              disabled={loading}
              className="bg-blue-600 text-white px-6 py-2 mt-5 rounded"
            >
              {loading ? "Placing..." : "Place Order"}
            </button>
          )}

        </>
      )}
    </div>
  );
}

