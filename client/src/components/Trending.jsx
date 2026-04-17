import { useEffect, useState } from "react";
import API from "../api";

const Trending = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchTrending = async () => {
      try {
       const { data } = await API.get("/products?trending=true");
        setProducts(data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchTrending();
  }, []);

  return (
    <div className="px-4 md:px-10 py-8 md:py-12 bg-gray-50">

      {/* Heading */}
      <h2 className="text-2xl md:text-3xl font-bold mb-5 md:mb-6">
        Trending Products
      </h2>

      {/* Scroll Wrapper */}
      <div className="overflow-hidden relative">

        <div className="flex gap-4 md:gap-6 w-max animate-scroll">

          {[...products, ...products].map((p, index) => (
            <div
              key={index}
              className="
                min-w-[160px] md:min-w-[220px]
                bg-white 
                rounded-xl md:rounded-2xl 
                shadow-md 
                hover:shadow-xl 
                transition 
                overflow-hidden
              "
            >

              {/* IMAGE */}
              <div className="h-40 md:h-56 w-full overflow-hidden">
                <img
                  src={
                    p.image?.startsWith("http")
                      ? p.image
                      : `http://localhost:5000/uploads/${p.image}`
                  }
                  className="w-full h-full object-cover hover:scale-110 transition duration-300"
                  alt={p.name}
                />
              </div>

              {/* CONTENT */}
              <div className="p-2 md:p-3">
                <h3 className="font-semibold text-sm md:text-base truncate">
                  {p.name}
                </h3>

                <p className="text-green-600 font-bold text-sm md:text-base">
                  ₹{p.price}
                </p>
              </div>

            </div>
          ))}

        </div>

      </div>

      {/* Animation */}
      <style>
        {`
          @keyframes scroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }

          .animate-scroll {
            animation: scroll 25s linear infinite;
          }

          .animate-scroll:hover {
            animation-play-state: paused;
          }
        `}
      </style>

    </div>
  );
};

export default Trending;