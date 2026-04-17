import { useState } from "react";
import axios from "axios";
import { useCart } from "../context/CartContext";

export default function Checkout() {
  const { cart, totalPrice, clearCart } = useCart(); // ✅ added clearCart
  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [showCard, setShowCard] = useState(false);
  const [loading, setLoading] = useState(false); // ✅ loading state

  const placeOrder = async () => {
    const token = localStorage.getItem("token");

    if (cart.length === 0) {
      return alert("Cart is empty ❌");
    }

    try {
      setLoading(true);

      const { data } = await axios.post(
        "http://localhost:5000/api/orders", // ✅ fixed URL
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

      clearCart(); // ✅ clear cart after order

    } catch (err) {
      console.log(err);
      alert("Order Failed ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 sm:p-6 md:p-10 relative">

      <h1 className="text-2xl sm:text-3xl font-bold mb-6">
        Checkout
      </h1>

      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          {cart.map((item) => (
            <div key={item._id} className="flex justify-between bg-white p-4 mb-4 rounded shadow">
              <div className="flex gap-4">
                <img src={item.image} className="w-16 h-16 object-cover rounded" />
                <div>
                  <h2>{item.name}</h2>
                  <p>₹{item.price} × {item.qty}</p>
                </div>
              </div>

              <p className="font-bold">
                ₹{(item.price * item.qty).toFixed(2)}
              </p>
            </div>
          ))}

          <h2 className="text-xl font-bold mt-5">
            Total: ₹{totalPrice?.toFixed(2)}
          </h2>

          {/* PAYMENT */}
          <div className="bg-white p-5 rounded shadow mt-5">
            <h3 className="font-bold mb-3">Payment Method</h3>

            <div className="flex gap-4">
              <button onClick={() => setPaymentMethod("COD")}>COD</button>
              <button onClick={() => {
                setPaymentMethod("CARD");
                setShowCard(true);
              }}>
                Card
              </button>
              <button onClick={() => setPaymentMethod("UPI")}>
                UPI
              </button>
            </div>
          </div>

          {/* ORDER BUTTON */}
          <button
            onClick={placeOrder}
            disabled={loading}
            className="bg-blue-600 text-white px-6 py-2 mt-5 rounded"
          >
            {loading ? "Placing..." : "Place Order"}
          </button>
        </>
      )}

      {/* CARD MODAL */}
      {showCard && (
        <div className="fixed inset-0 bg-black/60 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow w-[300px]">
            <h2 className="font-bold mb-3">Card Payment</h2>

            <input placeholder="Card Number" className="border p-2 w-full mb-2" />
            <input placeholder="MM/YY" className="border p-2 w-full mb-2" />
            <input placeholder="CVV" className="border p-2 w-full mb-2" />

            <button
              onClick={() => {
                alert("Payment Success ✅");
                setShowCard(false);
                placeOrder(); // ✅ trigger order after payment
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