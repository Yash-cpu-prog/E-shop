
const HeroSection = () => {
  return (
    <div className="w-full bg-white mt-2">

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 items-center px-6 md:px-16 py-20 gap-10">

        {/* LEFT TEXT */}
        <div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Elevate Your Style <br /> With New Trends
          </h1>

          <p className="text-gray-600 text-lg mb-8">
            Discover premium fashion for both men and women.
            Shop the latest collection and redefine your everyday look
            with style and confidence.
          </p>

          <button className="bg-black text-white px-8 py-3 rounded-lg hover:bg-gray-800 transition">
            Shop Now
          </button>
        </div>

        {/* RIGHT BIG IMAGE */}
        <div className="flex justify-center">
          <img
            src="https://images.unsplash.com/photo-1483985988355-763728e1935b"
            alt="fashion couple"
            className="w-full max-w-xl md:max-w-2xl object-contain"
          />
        </div>

      </div>

    </div>
  );
};

export default HeroSection;