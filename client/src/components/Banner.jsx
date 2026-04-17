import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Banner() {

  const navigate = useNavigate();

  const services = [
    {
      img: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
      title: "Web Development Services",
      desc: "Modern, fast and scalable websites for your business.",
    },
    {
      img: "https://images.unsplash.com/photo-1555066931-4365d14bab8c",
      title: "Mobile App Development",
      desc: "iOS & Android apps with smooth user experience.",
    },
    {
      img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71",
      title: "AI & Automation Solutions",
      desc: "Smart AI tools to automate your business workflow.",
    },
    {
      img: "https://images.unsplash.com/photo-1553877522-43269d4ea984",
      title: "Digital Marketing",
      desc: "Grow your brand with SEO, ads & social media marketing.",
    },
  ];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % services.length);
    }, 3500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="mx-3 md:mx-10 mt-10 md:mt-16 relative h-[420px] md:h-[550px] rounded-2xl md:rounded-3xl overflow-hidden bg-black">

      {/* Background Image */}
      <img
        src={services[index].img}
        className="absolute inset-0 w-full h-full object-cover scale-105 md:scale-110 transition duration-1000"
      />

      {/* Overlay */}
      <div className="absolute inset-0 backdrop-blur-sm bg-black/50"></div>

      {/* Gradient */}
      <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/20 via-transparent to-purple-500/20 animate-pulse"></div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col md:flex-row items-center justify-center md:justify-between px-5 md:px-16 text-center md:text-left">

        {/* LEFT */}
        <div className="text-white max-w-xl">

          <h2 className="text-3xl sm:text-4xl md:text-6xl font-extrabold leading-tight">
            {services[index].title}
          </h2>

          <p className="mt-3 md:mt-5 text-white/70 text-sm md:text-lg">
            {services[index].desc}
          </p>

          {/* Buttons */}
          <div className="mt-5 md:mt-8 flex flex-col sm:flex-row gap-3 md:gap-4 justify-center md:justify-start">
            <button className="bg-gradient-to-r from-blue-500 to-purple-500 px-5 py-2 md:px-7 md:py-3 rounded-full font-semibold shadow-lg hover:scale-105 transition">
              Get Started
            </button>

           <button
  onClick={() => navigate("/services")}
  className="border border-white/30 backdrop-blur-lg px-5 py-2 md:px-7 md:py-3 rounded-full hover:bg-white hover:text-black transition"
>
  View Services
</button>
          </div>

        </div>

        {/* RIGHT CARD */}
        <div className="hidden md:flex flex-col items-center relative">

          <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-6 rounded-3xl shadow-2xl">

            <img
              src={services[index].img}
              className="w-72 h-72 lg:w-80 lg:h-80 object-cover rounded-2xl hover:scale-105 transition duration-500"
            />

            <div className="mt-4 text-white">
              <span className="text-lg font-bold">
                Premium Service
              </span>
              <p className="text-white/60 text-sm mt-1">
                24/7 Support Available
              </p>
            </div>

          </div>

          <div className="absolute -top-6 -right-6 bg-green-400 text-black px-4 py-2 rounded-full font-bold animate-bounce shadow-lg">
            NEW
          </div>

        </div>

      </div>

      {/* DOTS */}
      <div className="absolute bottom-4 md:bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
        {services.map((_, i) => (
          <div
            key={i}
            className={`w-2 h-2 md:w-3 md:h-3 rounded-full ${
              i === index ? "bg-blue-500" : "bg-white/40"
            }`}
          />
        ))}
      </div>

    </div>
  );
}
