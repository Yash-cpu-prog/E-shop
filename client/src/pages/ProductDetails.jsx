import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";

export default function ProductDetails() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const { addToWishlist } = useWishlist();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true); // ✅ added

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);

        // ✅ fetch single product
        const { data } = await API.get(`/products/${id}`);
        setProduct(data);

      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  // ✅ loading state
  if (loading) {
    return (
      <div className="p-10 text-center text-lg">
        Loading product...
      </div>
    );
  }

  // ✅ product not found
  if (!product) {
    return (
      <div className="p-10 text-center text-red-500">
        Product not found ❌
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-lg p-4 sm:p-6 md:p-10 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 items-start">

      {/* IMAGE */}
      <div className="bg-gray-100 p-6 rounded-2xl flex justify-center items-center">
        <img
          src={
            product.image?.startsWith("http")
              ? product.image
              : `http://localhost:5000/uploads/${product.image}`
          }
          alt={product.name}
          className="w-full max-w-sm h-[350px] object-contain hover:scale-105 transition"
        />
      </div>

      {/* DETAILS */}
      <div className="bg-gray-50 p-6 rounded-2xl shadow-inner">

        <h1 className="text-3xl font-bold text-gray-800">
          {product.name}
        </h1>

        <p className="text-2xl font-bold text-green-600 mt-3">
          ₹{product.price}
        </p>

        <div className="border my-4"></div>

        <p className="text-gray-600 leading-relaxed">
          {product.description || "No description available."}
        </p>

        {/* BADGES */}
        <div className="flex gap-2 mt-4 flex-wrap">
          <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
            In Stock
          </span>
          <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm">
            Free Delivery
          </span>
          <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm">
            Best Seller
          </span>
        </div>

        {/* BUTTONS */}
        <div className="mt-6 flex gap-4 flex-col sm:flex-row">

          <button
            onClick={() => addToCart(product)}
            className="flex-1 bg-pink-500 hover:bg-pink-600 text-white py-3 rounded-xl font-semibold"
          >
            Add to Cart
          </button>

          <button
            onClick={() => addToWishlist(product)}
            className="flex-1 border py-3 rounded-xl hover:bg-gray-100"
          >
            Wishlist ❤️
          </button>

        </div>

      </div>
    </div>
  );
}