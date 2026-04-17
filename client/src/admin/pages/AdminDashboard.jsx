import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const navigate = useNavigate();

  return (
     <div className="min-h-screen bg-gray-100 p-4 sm:p-6 pt-16 sm:pt-6">

      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-6">

        <h1 className="text-xl sm:text-3xl font-bold text-gray-800">
          Admin Dashboard
        </h1>

        <button
          onClick={() => navigate("/")}
          className="bg-red-500 text-white px-4 py-2 rounded w-full sm:w-auto"
        >
          Logout
        </button>

      </div>

      {/* STATS CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">

        <div className="bg-white p-5 sm:p-6 rounded-xl shadow">
          <h2 className="text-sm sm:text-lg font-semibold text-gray-600">
            Total Products
          </h2>
          <p className="text-2xl sm:text-3xl font-bold text-blue-600 mt-2">
            25
          </p>
        </div>

        <div className="bg-white p-5 sm:p-6 rounded-xl shadow">
          <h2 className="text-sm sm:text-lg font-semibold text-gray-600">
            Total Orders
          </h2>
          <p className="text-2xl sm:text-3xl font-bold text-green-600 mt-2">
            12
          </p>
        </div>

        <div className="bg-white p-5 sm:p-6 rounded-xl shadow">
          <h2 className="text-sm sm:text-lg font-semibold text-gray-600">
            Total Users
          </h2>
          <p className="text-2xl sm:text-3xl font-bold text-purple-600 mt-2">
            8
          </p>
        </div>

      </div>

      {/* ACTION BUTTONS */}
      <div className="mt-8 sm:mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">

        <button
          onClick={() => navigate("/admin/add-product")}
          className="bg-blue-600 text-white p-4 rounded-xl shadow hover:bg-blue-700 transition"
        >
          ➕ Add Product
        </button>

        <button
          onClick={() => navigate("/admin/products")}
          className="bg-green-600 text-white p-4 rounded-xl shadow hover:bg-green-700 transition"
        >
          📦 Manage Products
        </button>

        <button
          onClick={() => navigate("/admin/orders")}
          className="bg-purple-600 text-white p-4 rounded-xl shadow hover:bg-purple-700 transition"
        >
          🧾 View Orders
        </button>

      </div>

    </div>
  );
};

export default AdminDashboard;