import { useEffect, useState } from "react";
import axios from "axios";

export default function Orders() {
  const [orders, setOrders] = useState([]);

  const getOrders = async () => {
    const token = localStorage.getItem("token");

    try {
      const { data } = await axios.get("/api/orders", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setOrders(data);
    } catch (err) {
      alert("Failed to fetch orders ❌");
    }
  };

  useEffect(() => {
    getOrders();
  }, []);

  const getStatusColor = (status) => {
    if (status === "Pending") return "bg-yellow-400 text-white";
    if (status === "Completed") return "bg-green-500 text-white";
    if (status === "Cancelled") return "bg-red-500 text-white";
    return "bg-gray-400 text-white";
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6 pt-16 sm:pt-6">

      {/* HEADER */}
      <h2 className="text-xl sm:text-2xl font-bold mb-4">
        🧾 All Orders
      </h2>

      {/* ================= MOBILE VIEW ================= */}
      <div className="grid gap-4 sm:hidden">

        {orders.length === 0 ? (
          <p className="text-center text-gray-500">No orders found</p>
        ) : (
          orders.map((o) => (
            <div
              key={o._id}
              className="bg-white rounded-xl shadow p-4 space-y-2"
            >
              <p className="text-sm text-gray-600">
                <span className="font-semibold">User:</span>{" "}
                {o.user?.email || "N/A"}
              </p>

              <p className="text-green-600 font-bold">
                ₹{o.totalAmount}
              </p>

              <span
                className={`inline-block px-3 py-1 rounded-full text-xs ${getStatusColor(
                  o.status
                )}`}
              >
                {o.status}
              </span>

              <p className="text-xs text-gray-500 break-all">
                ID: {o._id}
              </p>

              <p className="text-sm">
                Payment: <b>{o.paymentMethod}</b>
              </p>
            </div>
          ))
        )}

      </div>

      {/* ================= DESKTOP VIEW ================= */}
      <div className="hidden sm:block bg-white rounded-xl shadow overflow-x-auto">

        <table className="w-full text-left">

          <thead className="bg-gray-200">
            <tr>
              <th className="p-3">User</th>
              <th className="p-3">Total</th>
              <th className="p-3">Status</th>
              <th className="p-3">Order ID</th>
              <th className="p-3">Payment</th>
            </tr>
          </thead>

          <tbody>
            {orders.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center p-5">
                  No orders found
                </td>
              </tr>
            ) : (
              orders.map((o) => (
                <tr key={o._id} className="border-b hover:bg-gray-50">

                  <td className="p-3">{o.user?.email || "N/A"}</td>

                  <td className="p-3 text-green-600 font-semibold">
                    ₹{o.totalAmount}
                  </td>

                  <td className="p-3">
                    <span
                      className={`px-3 py-1 rounded-full text-sm ${getStatusColor(
                        o.status
                      )}`}
                    >
                      {o.status}
                    </span>
                  </td>

                  <td className="p-3 text-xs text-gray-500">
                    {o._id}
                  </td>

                  <td className="p-3">
                    {o.paymentMethod}
                  </td>

                </tr>
              ))
            )}
          </tbody>

        </table>

      </div>

    </div>
  );
}