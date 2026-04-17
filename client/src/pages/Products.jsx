import { useEffect, useState } from "react";
import axios from "axios";
import { useCart } from "../context/CartContext";
import { useNavigate, useLocation } from "react-router-dom";

export default function Products() {
  const { addToCart } = useCart();
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  const query = new URLSearchParams(location.search).get("search");

  // 🔥 Fetch Products
  const getProducts = async () => {
    try {
      const { data } = await axios.get("http://localhost:5000/api/products");
      setProducts(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  // 🔥 Filter Logic
  const filteredProducts = products.filter((p) => {
    const name = (p.name ?? "").toLowerCase();
    const productCategory = (p.category ?? "").toLowerCase();

    const searchText = (query ?? "").toLowerCase();
    const selectedCategory = (category ?? "").toLowerCase();

    return (
      name.includes(searchText) &&
      (selectedCategory ? productCategory === selectedCategory : true)
    );
  });

  return (
    <div className="px-6 md:px-10 py-10 bg-gray-50 min-h-screen">

      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
        <h2 className="text-3xl font-bold text-gray-800">
          🛍 Explore Products
        </h2>

        {/* FILTER */}
        <select
          onChange={(e) => setCategory(e.target.value)}
          className="px-4 py-2 rounded-lg border shadow-sm focus:ring-2 focus:ring-pink-500"
        >
          <option value="">All Categories</option>
          <option value="mobile">Mobile</option>
          <option value="watch">Watch</option>
        </select>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

        {filteredProducts.map((p) => (
          <div
            key={p._id}
            className="bg-white rounded-2xl shadow-md hover:shadow-2xl transition duration-300 overflow-hidden group"
          >

            {/* IMAGE */}
            <div
              onClick={() => navigate(`/product/${p._id}`)}
              className="h-64 w-full overflow-hidden cursor-pointer"
            >
              <img
                src={
                  p.image?.startsWith("http")
                    ? p.image
                    : `http://localhost:5000/uploads/${p.image}`
                }
                alt={p.name}
                className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
              />
            </div>

            {/* CONTENT */}
            <div className="p-4">

              {/* NAME */}
              <h3 className="font-semibold text-lg truncate">
                {p.name || "Unnamed Product"}
              </h3>

              {/* DESC */}
              <p className="text-gray-500 text-sm mt-1 line-clamp-2">
                {p.description || "No description available"}
              </p>

              {/* PRICE + BTN */}
              <div className="flex justify-between items-center mt-4">
                <p className="text-lg font-bold text-green-600">
                  ₹{p.price || 0}
                </p>

                <button
                  onClick={() => addToCart(p)}
                  className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-lg text-sm transition hover:scale-105"
                >
                  Add 🛒
                </button>
              </div>

            </div>

          </div>
        ))}

      </div>

      {/* EMPTY STATE */}
      {filteredProducts.length === 0 && (
        <div className="text-center mt-20 text-gray-500">
          😔 No products found
        </div>
      )}
    </div>
  );
}