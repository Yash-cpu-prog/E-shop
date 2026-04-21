import { useEffect, useState } from "react";

const Deals = () => {
  const [time, setTime] = useState(3600);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const scrollToProducts = () => {
    const section = document.getElementById("products-section");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  const formatTime = (t) => {
    const h = Math.floor(t / 3600);
    const m = Math.floor((t % 3600) / 60);
    const s = t % 60;

    return `${h}:${m < 10 ? "0" : ""}${m}:${s < 10 ? "0" : ""}${s}`;
  };

  return (
    <div className="mx-4 sm:mx-6 md:mx-10 my-10 md:my-16 rounded-2xl md:rounded-3xl overflow-hidden bg-gradient-to-r from-black via-gray-900 to-black text-white shadow-2xl">

      <div className="grid grid-cols-1 md:grid-cols-2 items-center">

        {/* LEFT */}
        <div className="p-6 sm:p-8 md:p-12 text-center md:text-left">

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
            Mega Flash Sale
          </h2>

          <p className="mt-3 md:mt-4 text-gray-300 text-sm sm:text-base md:text-lg">
            Grab the best deals on fashion, electronics & more before time runs out!
          </p>

          {/* TIMER */}
          <div className="flex justify-center md:justify-start gap-2 sm:gap-4 mt-6 md:mt-8 flex-wrap">
            {formatTime(time).split(":").map((t, i) => (
              <div
                key={i}
                className="bg-white/10 backdrop-blur-lg px-3 sm:px-5 py-3 sm:py-4 rounded-xl text-center border border-white/20 min-w-[70px]"
              >
                <p className="text-xl sm:text-2xl font-bold">{t}</p>
                <span className="text-[10px] sm:text-xs text-gray-300">
                  {i === 0 ? "HRS" : i === 1 ? "MIN" : "SEC"}
                </span>
              </div>
            ))}
          </div>

          {/* BUTTON */}
          <button
            onClick={scrollToProducts}
            className="mt-6 md:mt-8 bg-pink-500 px-6 sm:px-8 py-2 sm:py-3 rounded-full font-semibold hover:scale-105 transition"
          >
            Shop Now
          </button>

        </div>

        {/* RIGHT */}
        <div className="relative h-[220px] sm:h-[300px] md:h-[400px] lg:h-full">

          <img
            src="https://images.unsplash.com/photo-1607082349566-187342175e2f"
            className="w-full h-full object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>

          <div className="absolute top-4 right-4 md:top-6 md:right-6 bg-pink-500 px-3 sm:px-5 py-2 sm:py-3 rounded-full text-sm sm:text-lg font-bold shadow-lg animate-bounce">
            50% OFF
          </div>

        </div>

      </div>

    </div>
  );
};

export default Deals;