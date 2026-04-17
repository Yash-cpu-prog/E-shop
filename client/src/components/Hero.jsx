import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";

// 🔥 Import images
import hero1 from "../assets/t1.jpeg";
import hero2 from "../assets/t2.jpeg";
import hero3 from "../assets/t3.jpeg";
import hero4 from "../assets/t4.jpeg";
import hero5 from "../assets/t5.jpeg";

export default function Hero() {
  const navigate = useNavigate(); // ✅ ADD THIS

  const images = [hero1, hero2, hero3, hero4, hero5];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="
        mx-3 md:mx-10 
        mt-5 
        rounded-2xl md:rounded-3xl 
        p-6 md:p-16 
        min-h-[450px] md:min-h-[700px] 
        flex items-center 
        relative overflow-hidden 
        transition-all duration-700
      "
      style={{
        backgroundImage: `url(${images[index]})`,
        backgroundPosition: "center top",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Content */}
      <div className="relative text-white max-w-xl translate-y-15 sm:translate-y-20 md:translate-y-28">

        <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold leading-tight">
          Style for Boys & Girls <br /> Modern Fashion Store
        </h2>

        <p className="mt-3 md:mt-4 text-white/80 text-sm md:text-base">
          Discover trending fashion, gadgets & lifestyle products at best prices
        </p>

        {/* Search */}
       

        {/* Buttons */}
        <div className="mt-4 md:mt-6 flex gap-3 md:gap-4 flex-wrap">

          {/* 🔥 FIXED BUTTON */}
          <button
  onClick={() => {
    document
      .getElementById("products-section")
      ?.scrollIntoView({ behavior: "smooth" });
  }}
  className="bg-pink-500 px-4 py-2 md:px-6 md:py-3 rounded-full hover:scale-105 transition text-sm md:text-base"
>
  Shop Now
</button>

          <button onClick={() => navigate("/products")} className="border border-white px-4 py-2 md:px-6 md:py-3 rounded-full hover:bg-white hover:text-black transition text-sm md:text-base">
            Explore
          </button>

        </div>

      </div>
    </div>
  );
}