import { useState } from "react";
import axios from "axios";
import { useCart } from "../context/CartContext";

export default function Checkout() {
  const { cart, totalPrice } = useCart();
  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [showCard, setShowCard] = useState(false);

  const placeOrder = async () => {
    const token = localStorage.getItem("token");

    try {
      const { data } = await axios.post(
        "/api/orders",
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
    } catch (err) {
      console.log(err);
      alert("Order Failed ❌");
    }
  };

  return (
    <div className="p-4 sm:p-6 md:p-10 relative">

      {/* TITLE */}
      <h1 className="text-2xl sm:text-3xl font-bold mb-6">
        Checkout
      </h1>

      {cart.length === 0 ? (
        <p className="text-sm sm:text-base">Your cart is empty</p>
      ) : (
        <>

          {/* CART ITEMS */}
          {cart.map((item) => (
            <div
              key={item._id}
              className="flex flex-col sm:flex-row sm:justify-between sm:items-center bg-white p-4 mb-4 rounded shadow gap-3"
            >

              {/* LEFT */}
              <div className="flex items-center gap-3 sm:gap-4">

                <img
                  src={item.image}
                  className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded"
                />

                <div>
                  <h2 className="text-sm sm:text-base font-medium">
                    {item.name}
                  </h2>

                  <p className="text-gray-600 text-sm">
                    ₹{item.price} × {item.qty}
                  </p>
                </div>

              </div>

              {/* PRICE */}
              <p className="font-bold text-sm sm:text-base">
                ₹{(item.price * item.qty).toFixed(2)}
              </p>

            </div>
          ))}

          {/* TOTAL */}
          <h2 className="text-lg sm:text-xl font-bold mt-5">
            Total: ₹{totalPrice?.toFixed(2)}
          </h2>

          {/* PAYMENT BOX */}
          <div className="bg-white p-4 sm:p-6 rounded-xl shadow mt-6">

            <h3 className="text-lg sm:text-xl font-bold mb-4">
              Choose Payment Method
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">

              {/* COD */}
              <label className={`border p-3 sm:p-4 rounded-xl cursor-pointer transition text-sm sm:text-base ${
                paymentMethod === "COD"
                  ? "border-green-500 bg-green-50"
                  : ""
              }`}>
                <input
                  type="radio"
                  value="COD"
                  checked={paymentMethod === "COD"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="hidden"
                />
                💵 Cash on Delivery
              </label>

              {/* CARD */}
              <label
                onClick={() => {
                  setPaymentMethod("CARD");
                  setShowCard(true);
                }}
                className={`border p-3 sm:p-4 rounded-xl cursor-pointer transition text-sm sm:text-base ${
                  paymentMethod === "CARD"
                    ? "border-blue-500 bg-blue-50"
                    : ""
                }`}
              >
                💳 Card Payment
              </label>

              {/* UPI */}
              <label className={`border p-3 sm:p-4 rounded-xl cursor-pointer transition text-sm sm:text-base ${
                paymentMethod === "UPI"
                  ? "border-purple-500 bg-purple-50"
                  : ""
              }`}>
                <input
                  type="radio"
                  value="UPI"
                  checked={paymentMethod === "UPI"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="hidden"
                />
                📱 UPI / QR Code
              </label>

            </div>

            {/* UPI QR */}
            {paymentMethod === "UPI" && (
              <div className="mt-6 text-center bg-white p-4 sm:p-6 rounded-xl shadow">

                <h3 className="text-base sm:text-lg font-bold mb-3">
                  Scan QR to Pay
                </h3>

                <img
                  src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=demo-payment"
                  className="mx-auto w-40 sm:w-48"
                  alt="QR Code"
                />

                <p className="text-xs sm:text-sm text-gray-500 mt-2">
                  Scan using Google Pay / PhonePe / Paytm
                </p>

              </div>
            )}

          </div>

          {/* PLACE ORDER */}
          <button
            onClick={placeOrder}
            className="w-full sm:w-auto bg-blue-600 text-white px-5 sm:px-6 py-2 mt-5 rounded hover:scale-105 transition text-sm sm:text-base"
          >
            Place Order
          </button>

        </>
      )}

      {/* CARD MODAL */}
      {showCard && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">

          <div className="bg-white w-full sm:w-[400px] p-5 sm:p-6 rounded-2xl shadow-2xl animate-fadeUp">

            <h2 className="text-lg sm:text-xl font-bold mb-4 text-center">
              💳 Card Payment
            </h2>

            <input
              type="text"
              placeholder="Card Number"
              className="w-full p-3 border rounded-lg mb-3 text-sm"
            />

            <div className="flex gap-3">
              <input
                type="text"
                placeholder="MM/YY"
                className="w-1/2 p-3 border rounded-lg text-sm"
              />

              <input
                type="password"
                placeholder="CVV"
                className="w-1/2 p-3 border rounded-lg text-sm"
              />
            </div>

            <input
              type="text"
              placeholder="Card Holder Name"
              className="w-full p-3 border rounded-lg mt-3 text-sm"
            />

            <button
              onClick={() => {
                alert("Card Payment Successful ✅");
                setShowCard(false);
              }}
              className="w-full mt-5 bg-blue-600 text-white py-3 rounded-lg hover:scale-105 transition"
            >
              Pay Now 💳
            </button>

            <button
              onClick={() => setShowCard(false)}
              className="w-full mt-3 text-gray-500 text-sm"
            >
              Cancel
            </button>

          </div>
        </div>
      )}

      {/* ANIMATION */}
      <style>
        {`
        .animate-fadeUp {
          animation: fadeUp 0.3s ease;
        }

        @keyframes fadeUp {
          from {
            transform: translateY(30px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        `}
      </style>

    </div>
  );
}