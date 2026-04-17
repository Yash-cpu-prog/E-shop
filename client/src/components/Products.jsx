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

  // 🔥 CATEGORY LIST (added)
  const cats = ["All", "Electronics", "Fashion", "Footwear", "Smart Watches", "Beauty"];

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

  // 🔥 FILTER LOGIC (search + category)
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
    <div id="products-section" className="px-10 mt-10">

      {/* Filter Bar */}
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold">Products</h2>
      </div>

      {/* 🔥 CATEGORY BUTTONS (NEW ADDED - SAME DESIGN STYLE SIMPLE) */}
      <div className=" px-3 flex gap-4 mb-9 overflow-x-auto scrollbar-hide text-gray-600">

        {cats.map((c, i) => (
          <span
            key={i}
            onClick={() => setCategory(c === "All" ? "" : c)}
            className={`
              cursor-pointer px-3 py-1 rounded-full transition text-sm whitespace-nowrap flex-shrink-0
              ${category === c || (c === "All" && category === "")
                ? "bg-pink-500 text-white"
                : "bg-gray-100 hover:bg-pink-500 hover:text-white"
              }
            `}
          >
            {c}
          </span>
        ))}

      </div>

      {/* Products Grid (NO CHANGE) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

        {filteredProducts.map((p) => (
          <div
            key={p._id}
            className="bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden"
          >

            {/* IMAGE FULL COVER */}
            <div
              onClick={() => navigate(`/product/${p._id}`)}
              className="h-94 w-full overflow-hidden cursor-pointer"
            >
              <img
                src={
                  p.image?.startsWith("http")
                    ? p.image
                    : `http://localhost:5000/uploads/${p.image}`
                }
                alt={p.name || "product"}
                className="w-full h-full object-cover hover:scale-110 transition duration-300"
              />
            </div>

            {/* CONTENT */}
            <div className="p-4">
              <h3 className="font-semibold text-lg truncate">
                {p.name || "Unnamed Product"}
              </h3>

              <p className="text-gray-500 text-sm mt-1 line-clamp-2">
                {p.description || "No description available"}
              </p>

              <div className="flex justify-between items-center mt-3">
                <p className="text-lg font-bold text-green-600">
                  ₹{p.price || 0}
                </p>

                <button
                  onClick={() => addToCart(p)}
                  className="bg-pink-500 hover:bg-pink-600 text-white px-3 py-1.5 rounded-lg text-sm"
                >
                  Add
                </button>
              </div>
            </div>

          </div>
        ))}

      </div>
    </div>
  );
}
