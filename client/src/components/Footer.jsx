export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-12 md:mt-16 relative overflow-hidden">

      {/* background glow */}
      <div className="absolute inset-0 bg-gradient-to-tr from-pink-500/10 via-transparent to-blue-500/10 animate-pulse"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 md:px-10 lg:px-6 py-10 md:py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 md:gap-10">

        {/* Brand */}
        <div className="transform hover:scale-105 transition duration-300 text-center sm:text-left">

          <h1 className="text-2xl sm:text-3xl font-bold text-white">
            <span className="text-pink-500 animate-pulse">E</span>-shop
          </h1>

          <p className="mt-3 text-xs sm:text-sm text-gray-400">
            Your one-stop destination for all modern shopping needs.
          </p>

          <p className="mt-4 text-[11px] sm:text-xs text-gray-500 hover:text-gray-300 transition">
            Designed by Samad Khan
          </p>

        </div>

        {/* Shop */}
        <div className="text-center sm:text-left">

          <h3 className="text-white font-semibold mb-4 text-sm sm:text-base">
            Shop
          </h3>

          <ul className="space-y-2 text-xs sm:text-sm">

            {["About Us", "Contact", "Location", "Careers"].map((item, i) => (
              <li
                key={i}
                className="hover:text-white cursor-pointer transition transform hover:translate-x-2"
              >
                {item}
              </li>
            ))}

          </ul>
        </div>

        {/* Links */}
        <div className="text-center sm:text-left">

          <h3 className="text-white font-semibold mb-4 text-sm sm:text-base">
            Links
          </h3>

          <ul className="space-y-2 text-xs sm:text-sm">

            {["Electronics", "Cosmetics", "Furniture", "Fashion"].map((item, i) => (
              <li
                key={i}
                className="hover:text-pink-400 cursor-pointer transition transform hover:translate-x-2"
              >
                {item}
              </li>
            ))}

          </ul>
        </div>

        {/* Contact */}
        <div className="text-center sm:text-left">

          <h3 className="text-white font-semibold mb-4 text-sm sm:text-base">
            Contact
          </h3>

          <ul className="space-y-2 text-xs sm:text-sm">

            <li className="hover:text-white transition">
              📞 +91 9021116479
            </li>

            <li className="hover:text-white transition break-words">
              📧 yashkalamkar07@gmail.com
            </li>

            <li className="hover:text-white transition">
              📍 Maharashtra, India
            </li>

          </ul>

        </div>

      </div>

      {/* Bottom Bar */}
      <div className="relative border-t border-gray-800 text-center py-4 text-[11px] sm:text-xs text-gray-500 hover:text-gray-300 transition px-4">
        © {new Date().getFullYear()} E-shop. All rights reserved.
      </div>

    </footer>
  );
}