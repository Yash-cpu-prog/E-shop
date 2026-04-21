// import { useEffect, useState } from "react";
// import API from "../api";

// const FeaturedProducts = () => {
//   const [products, setProducts] = useState([]);
//   const [visibleCount, setVisibleCount] = useState(8);

//   useEffect(() => {
//     const fetchFeatured = async () => {
//       try {
//         const { data } = await API.get("/products?featured=true");
//         setProducts(data);
//       } catch (error) {
//         console.log(error);
//       }
//     };

//     fetchFeatured();
//   }, []);

//   const handleViewMore = () => {
//     setVisibleCount((prev) => prev + 8);
//   };

//   const visibleProducts = products.slice(0, visibleCount);

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

//             {/* IMAGE */}
//             <div className="h-72 w-full overflow-hidden">
//               <img
//                 src={product.image}   // ✅ FIXED (Cloudinary ya full URL)
//                 alt={product.name || "product"}
//                 className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
//               />
//             </div>

//             {/* CONTENT */}
//             <div className="p-4">
//               <h3 className="font-semibold text-lg truncate">
//                 {product.name}
//               </h3>

//               <p className="text-green-600 font-bold mt-1">
//                 ₹{product.price}
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


 


 import { useEffect, useState } from "react";
import API from "../api";

import img1 from "../assets/T1.jpg";
import img2 from "../assets/T2.jpg";
import img3 from "../assets/T3.jpg";

const FeaturedProducts = () => {
  const [products, setProducts] = useState([]);
  const [visibleCount, setVisibleCount] = useState(4);

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
    setVisibleCount((prev) => prev + 4);
  };

  const visibleProducts = products.slice(0, visibleCount);

  return (
    <div className="bg-white-50">

      {/* TOP FEATURES */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-10 py-14">

        <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition p-8 text-center hover:-translate-y-1 duration-300">
          <h4 className="font-bold text-xl mb-2">Free Home Delivery</h4>
          <p className="text-gray-500 text-sm leading-6">
            Enjoy fast and free home delivery on all orders above $100.
            We ensure safe packaging and timely delivery at your doorstep.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition p-8 text-center hover:-translate-y-1 duration-300">
          <h4 className="font-bold text-xl mb-2">Quality Products</h4>
          <p className="text-gray-500 text-sm leading-6">
            We deliver only verified and high-quality products that are
            tested for durability, comfort, and long-lasting use.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition p-8 text-center hover:-translate-y-1 duration-300">
          <h4 className="font-bold text-xl mb-2">Easy Returns</h4>
          <p className="text-gray-500 text-sm leading-6">
            Hassle-free 3-day return policy. If you don’t like the product,
            return it easily with full support.
          </p>
        </div>

      </div>

      {/* CATEGORY BANNERS */}
      <div className="grid md:grid-cols-3 gap-6 px-10 pb-12">

        {/* MEN */}
        <div className="relative aspect-square rounded-2xl overflow-hidden group shadow-md hover:shadow-xl transition">
          <img
            src={img1}
            className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-end p-5 text-white">
            <h3 className="text-2xl font-bold">Men’s Fashion</h3>
            <p className="text-sm text-gray-200">
              Stylish outfits for modern men
            </p>
          </div>
        </div>

        {/* WOMEN */}
        <div className="relative aspect-square rounded-2xl overflow-hidden group shadow-md hover:shadow-xl transition">
          <img
  src={img2}
  className="w-full h-full object-contain group-hover:scale-110 transition duration-500"
/>
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-end p-5 text-white">
            <h3 className="text-2xl font-bold">Women’s Fashion</h3>
            <p className="text-sm text-gray-200">
              Trendy outfits for every occasion
            </p>
          </div>
        </div>

        {/* TRENDY */}
        <div className="relative aspect-square rounded-2xl overflow-hidden group shadow-md hover:shadow-xl transition">
          <img
            src={img3}
            className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-end p-5 text-white">
            <h3 className="text-2xl font-bold">Trendy Collection</h3>
            <p className="text-sm text-gray-200">
              Latest fashion & lifestyle items
            </p>
          </div>
        </div>

      </div>

      {/* FEATURED PRODUCTS */}
      <div className="px-10 pb-16">

        <h2 className="text-3xl font-semibold text-center">
          Featured Products
        </h2>

        <p className="text-center text-gray-500 text-sm mb-10">
          Produce and supply various handcrafted items all over the world
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

          {visibleProducts.map((product, index) => (
            <div
              key={product._id}
              className="bg-white rounded-xl shadow-sm hover:shadow-xl transition p-4 relative group"
            >

              {/* BADGE */}
              <span className="absolute top-4 left-4 bg-gray-100 text-xs px-2 py-1 rounded">
                {index === 0 ? "NEW" : index === 2 ? "HOT" : "-25%"}
              </span>

              {/* IMAGE */}
              <div className="w-full aspect-square overflow-hidden rounded-lg bg-white flex items-center justify-center">
                <img
                  src={product.image}
                  alt={product.name}
                  className="max-h-full max-w-full object-contain group-hover:scale-105 transition duration-500"
                />
              </div>

              {/* CONTENT */}
              <div className="mt-4 text-center">
                <h3 className="font-medium">{product.name}</h3>

                <div className="text-gray-300 text-sm my-1">
                  ★★★★★
                </div>

                <p className="font-semibold">${product.price}</p>
                <p className="text-xs text-gray-400 mt-1">Fashion</p>
              </div>

            </div>
          ))}

        </div>

        {/* VIEW MORE */}
        {visibleCount < products.length && (
          <div className="flex justify-center mt-10">
            <button
              onClick={handleViewMore}
              className="px-6 py-3 bg-black text-white rounded-full hover:bg-gray-800 transition"
            >
              View More
            </button>
          </div>
        )}

      </div>

    </div>
  );
};

export default FeaturedProducts;

