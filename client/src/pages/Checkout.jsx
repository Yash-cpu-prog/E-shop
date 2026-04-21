import { useState } from "react";
import axios from "axios";
import { useCart } from "../context/CartContext";

import qrImg from "../assets/qr.jpeg"; // ✅ QR image

export default function Checkout() {
  const { cart, totalPrice, clearCart } = useCart();

  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [showCard, setShowCard] = useState(false);
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

          {/* PAYMENT */}
          <div className="bg-white p-5 rounded shadow mt-5">
            <h3 className="font-bold mb-3">Payment Method</h3>

            <div className="flex gap-4">
              <button
                className={`px-4 py-2 rounded ${
                  paymentMethod === "COD"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200"
                }`}
                onClick={() => {
                  setPaymentMethod("COD");
                  setShowCard(false);
                }}
              >
                COD
              </button>

              <button
                className={`px-4 py-2 rounded ${
                  paymentMethod === "CARD"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200"
                }`}
                onClick={() => {
                  setPaymentMethod("CARD");
                  setShowCard(true);
                }}
              >
                Card
              </button>

              <button
                className={`px-4 py-2 rounded ${
                  paymentMethod === "UPI"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200"
                }`}
                onClick={() => {
                  setPaymentMethod("UPI");
                  setShowCard(false);
                }}
              >
                UPI
              </button>
            </div>
          </div>

          {/* 🔥 UPI QR SECTION */}
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

          {/* ORDER BUTTON (COD only) */}
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

      {/* CARD MODAL */}
      {showCard && (
        <div className="fixed inset-0 bg-black/60 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow w-[300px]">
            <h2 className="font-bold mb-3">Card Payment</h2>

            <input
              placeholder="Card Number"
              className="border p-2 w-full mb-2"
            />
            <input
              placeholder="MM/YY"
              className="border p-2 w-full mb-2"
            />
            <input
              placeholder="CVV"
              className="border p-2 w-full mb-2"
            />

            <button
              onClick={() => {
                alert("Payment Success ✅");
                setShowCard(false);
                placeOrder();
              }}
              className="bg-green-600 text-white w-full py-2 rounded mt-2"
            >
              Pay Now
            </button>

            <button
              onClick={() => setShowCard(false)}
              className="mt-2 text-gray-500 w-full"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}