import { useNavigate } from "react-router-dom";

export default function Services() {
  const navigate = useNavigate();

  const services = [
    {
      title: "Fast Delivery",
      desc: "Get your orders delivered quickly with express shipping.",
      img: "https://images.unsplash.com/photo-1580674285054-bed31e145f59",
      emoji: "",
    },
    {
      title: "Secure Payments",
      desc: "Multiple secure payment options including UPI, Cards & COD.",
      img: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d",
      emoji: "",
    },
    {
      title: "Easy Returns",
      desc: "Hassle-free return policy within 7 days.",
      img: "https://images.unsplash.com/photo-1607083206968-13611e3d76db",
      emoji: "",
    },
    {
      title: "Quality Products",
      desc: "We ensure high-quality and trusted products.",
      img: "https://images.unsplash.com/photo-1580910051074-3eb694886505",
      emoji: "",
    },
    {
      title: "24/7 Support",
      desc: "Our team is always ready to help you anytime.",
      img: "https://images.unsplash.com/photo-1556157382-97eda2d62296",
      emoji: "",
    },
    {
      title: "Best Deals",
      desc: "Enjoy exclusive discounts and seasonal offers.",
      img: "https://images.unsplash.com/photo-1607082349566-187342175e2f",
      emoji: "",
    },
  ];

  return (
    <div className="bg-gradient-to-b from-gray-50 to-white min-h-screen px-4 sm:px-6 md:px-16 py-10 md:py-12">

      {/* HERO */}
      <div className="text-center max-w-3xl mx-auto animate-fadeDown">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold">
          Our Services
        </h1>
        <p className="mt-4 text-gray-600 text-sm sm:text-base px-2">
          We provide premium ecommerce solutions for a smooth shopping experience.
        </p>
      </div>

      {/* SERVICES GRID */}
      <div className="mt-10 md:mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 md:gap-6">

        {services.map((item, index) => (
          <div
            key={index}
            className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 animate-fadeUp"
            style={{ animationDelay: `${index * 100}ms` }}
          >

            {/* IMAGE */}
            <div className="h-40 sm:h-44 overflow-hidden relative">

              <img
                src={item.img}
                alt={item.title} // ✅ FIXED
                className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
              />

              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition"></div>

              <div className="absolute top-2 left-2 bg-white/90 px-3 py-1 rounded-full text-xs sm:text-sm font-semibold">
                {item.emoji} Service
              </div>

            </div>

            {/* CONTENT */}
            <div className="p-4 sm:p-5">

              <h2 className="text-base sm:text-lg font-bold group-hover:text-pink-500 transition">
                {item.title}
              </h2>

              <p className="text-gray-500 text-xs sm:text-sm mt-2">
                {item.desc}
              </p>

            </div>

          </div>
        ))}

      </div>

      {/* CTA */}
      <div className="mt-12 md:mt-16 text-center bg-black text-white py-10 md:py-12 px-4 rounded-3xl relative overflow-hidden">

        <h2 className="text-2xl sm:text-3xl font-bold">
          Ready to Shop?
        </h2>

        <button
          onClick={() => navigate("/products")} // ✅ FIXED
          className="mt-6 bg-pink-500 px-6 sm:px-8 py-2 sm:py-3 rounded-full hover:scale-105 transition text-sm sm:text-base"
        >
          Explore Products
        </button>

        <div className="absolute inset-0 bg-gradient-to-r from-pink-500/20 to-blue-500/20 animate-pulse"></div>

      </div>

      {/* HOW IT WORKS */}
      <div className="mt-14 md:mt-20 text-center px-2">

        <h2 className="text-2xl sm:text-3xl font-bold mb-8 md:mb-10">
          How It Works
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-8">

          <div className="p-5 sm:p-6 bg-white rounded-2xl shadow hover:shadow-xl transition">
            <div className="text-4xl sm:text-5xl"></div>
            <h3 className="font-bold mt-3 text-sm sm:text-base">Choose Product</h3>
            <p className="text-gray-500 text-xs sm:text-sm mt-2">
              Select from thousands of products.
            </p>
          </div>

          <div className="p-5 sm:p-6 bg-white rounded-2xl shadow hover:shadow-xl transition">
            <div className="text-4xl sm:text-5xl"></div>
            <h3 className="font-bold mt-3 text-sm sm:text-base">Secure Payment</h3>
            <p className="text-gray-500 text-xs sm:text-sm mt-2">
              Pay safely using UPI, Card or COD.
            </p>
          </div>

          <div className="p-5 sm:p-6 bg-white rounded-2xl shadow hover:shadow-xl transition">
            <div className="text-4xl sm:text-5xl"></div>
            <h3 className="font-bold mt-3 text-sm sm:text-base">Fast Delivery</h3>
            <p className="text-gray-500 text-xs sm:text-sm mt-2">
              Get products delivered quickly.
            </p>
          </div>

        </div>

      </div>

      {/* ANIMATION CSS */}
      <style>
        {`
          .animate-fadeUp {
            animation: fadeUp 0.6s ease forwards;
            opacity: 0;
            transform: translateY(20px);
          }

          @keyframes fadeUp {
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          .animate-fadeDown {
            animation: fadeDown 0.6s ease;
          }

          @keyframes fadeDown {
            from {
              opacity: 0;
              transform: translateY(-20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}
      </style>

    </div>
  );
}