import { useEffect, useState } from "react";
import API from "../api";

const FeaturedProducts = () => {
  const [products, setProducts] = useState([]);
  const [visibleCount, setVisibleCount] = useState(8);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const { data } = await API.get("/products?featured=true");
        setProducts(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchFeatured();
  }, []);

  const handleViewMore = () => {
    setVisibleCount((prev) => prev + 8);
  };

  const visibleProducts = products.slice(0, visibleCount);

  return (
    <div className="px-10 py-12 bg-gray-50">

      <h2 className="text-3xl font-bold mb-8">
        Featured Products
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">

        {visibleProducts.map((product) => (
          <div
            key={product._id}
            className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition duration-300 group"
          >

            {/* IMAGE */}
            <div className="h-72 w-full overflow-hidden">
              <img
                src={product.image}   // ✅ FIXED (Cloudinary ya full URL)
                alt={product.name || "product"}
                className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
              />
            </div>

            {/* CONTENT */}
            <div className="p-4">
              <h3 className="font-semibold text-lg truncate">
                {product.name}
              </h3>

              <p className="text-green-600 font-bold mt-1">
                ₹{product.price}
              </p>

              <button className="mt-3 w-full bg-black hover:bg-gray-800 text-white py-2 rounded-lg transition">
                Add to Cart
              </button>
            </div>

          </div>
        ))}
      </div>

      {visibleCount < products.length && (
        <div className="flex justify-center mt-10">
          <button
            onClick={handleViewMore}
            className="px-6 py-3 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition"
          >
            View More
          </button>
        </div>
      )}

    </div>
  );
};

export default FeaturedProducts;