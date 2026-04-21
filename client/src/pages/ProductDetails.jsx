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


// import { useEffect, useState } from "react";
// import API from "../api";

// const FeaturedProducts = () => {
//   const [products, setProducts] = useState([]);
//   const [visibleCount, setVisibleCount] = useState(8);

//   useEffect(() => {
//     const fetchFeatured = async () => {
//       try {
//         const { data } = await API.get("/products?featured=true");

//         if (Array.isArray(data)) {
//           setProducts(data);
//         } else if (Array.isArray(data.products)) {
//           setProducts(data.products);
//         } else {
//           setProducts([]);
//         }

//       } catch (error) {
//         console.log(error);
//         setProducts([]);
//       }
//     };

//     fetchFeatured();
//   }, []);

//   const handleViewMore = () => {
//     setVisibleCount((prev) => prev + 8);
//   };

//   const visibleProducts = Array.isArray(products)
//     ? products.slice(0, visibleCount)
//     : [];

//   return (
//     <div className="px-10 py-12 bg-gray-50">

//       <h2 className="text-3xl font-bold mb-8">
//         Featured Products
//       </h2>

//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">

//         {visibleProducts.map((product) => (
//           <div
//             key={product._id}
//             className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition duration-300 group"
//           >

//             <div className="h-72 w-full overflow-hidden">
//               <img
//                 src={
//                   product.image?.startsWith("http")
//                     ? product.image
//                     : `https://e-shop-dvh2.onrender.com/uploads/${product.image}`
//                 }
//                 alt={product.name || "product"}
//                 className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
//               />
//             </div>

//             <div className="p-4">
//               <h3 className="font-semibold text-lg truncate">
//                 {product.name || "Unnamed Product"}
//               </h3>

//               <p className="text-green-600 font-bold mt-1">
//                 ₹{product.price || 0}
//               </p>

//               <button className="mt-3 w-full bg-black hover:bg-gray-800 text-white py-2 rounded-lg transition">
//                 Add to Cart
//               </button>
//             </div>

//           </div>
//         ))}

//       </div>

//       {visibleCount < products.length && (
//         <div className="flex justify-center mt-10">
//           <button
//             onClick={handleViewMore}
//             className="px-6 py-3 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition"
//           >
//             View More
//           </button>
//         </div>
//       )}

//     </div>
//   );
// };

// export default FeaturedProducts;