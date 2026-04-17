import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";

export default function ProductDetails() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const { addToWishlist } = useWishlist();

  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetch = async () => {
      const { data } = await axios.get("http://localhost:5000/api/products");
      const found = data.find((p) => p._id === id);
      setProduct(found);
    };
    fetch();
  }, [id]);

  if (!product)
    return (
      <div className="p-6 sm:p-10 text-center text-base sm:text-lg">
        Loading product...
      </div>
    );

  return (
    <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-lg p-4 sm:p-6 md:p-10 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 items-start">

      {/* LEFT IMAGE */}
      <div className="bg-gray-100 p-4 sm:p-6 rounded-2xl flex justify-center items-center">

        <img
          src={
            product.image?.startsWith("http")
              ? product.image
              : `http://localhost:5000/uploads/${product.image}`
          }
          className="w-full max-w-xs sm:max-w-sm h-[250px] sm:h-[350px] md:h-[400px] object-contain hover:scale-105 transition duration-300"
        />

      </div>

      {/* RIGHT DETAILS */}
      <div className="bg-gray-50 p-4 sm:p-6 rounded-2xl shadow-inner">

        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
          {product.name}
        </h1>

        <p className="text-xl sm:text-2xl font-bold text-green-600 mt-3">
          ₹{product.price}
        </p>

        <div className="border my-4"></div>

        <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
          {product.description || "No description available."}
        </p>

        {/* BADGES */}
        <div className="flex flex-wrap gap-2 mt-4">

          <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs sm:text-sm">
            In Stock
          </span>

          <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-xs sm:text-sm">
            Free Delivery
          </span>

          <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-xs sm:text-sm">
            Best Seller
          </span>

        </div>

        {/* BUTTONS */}
        <div className="mt-6 flex flex-col sm:flex-row gap-3 sm:gap-4">

          <button
            onClick={() => addToCart(product)}
            className="w-full sm:flex-1 bg-pink-500 hover:bg-pink-600 text-white py-3 rounded-xl font-semibold transition text-sm sm:text-base"
          >
            Add to Cart
          </button>

          <button
            onClick={() => addToWishlist(product)}
            className="w-full sm:flex-1 border py-3 rounded-xl hover:bg-gray-100 transition text-sm sm:text-base"
          >
            Wishlist ❤️
          </button>

        </div>

      </div>

    </div>
  );
}