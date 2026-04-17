import { Heart, ShoppingCart, Menu, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Navbar() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="flex justify-between items-center px-4 md:px-10 py-4 md:py-5 bg-white shadow sticky top-0 z-50">

      {/* Logo */}
      <h1
        className="text-xl md:text-2xl font-bold cursor-pointer"
        onClick={() => navigate("/")}
      >
        <span className="text-pink-500">E</span>-shop
      </h1>

      {/* Desktop Menu */}
      <ul className="hidden md:flex gap-8 text-gray-600 font-medium">
        <li onClick={() => navigate("/")} className="cursor-pointer hover:text-pink-500">Home</li>
        <li onClick={() => navigate("/products")} className="cursor-pointer hover:text-pink-500">Products</li>
        <li onClick={() => navigate("/services")} className="cursor-pointer hover:text-pink-500">Services</li>
        <li onClick={() => navigate("/contact")} className="cursor-pointer hover:text-pink-500">Contact</li>
      </ul>

      {/* Desktop Icons */}
      <div className="hidden md:flex gap-5 items-center">
        <Heart
          className="text-pink-500 cursor-pointer hover:scale-110 transition"
          onClick={() => navigate("/wishlist")}
        />

        <Link to="/cart">
          <ShoppingCart className="cursor-pointer hover:scale-110 transition" />
        </Link>

        <button
          onClick={() => navigate("/login")}
          className="bg-black text-white px-3 py-1 rounded"
        >
          Login
        </button>
      </div>

      {/* Mobile Right Side */}
      <div className="flex items-center gap-4 md:hidden">

        <Heart
          className="cursor-pointer text-pink-500"
          onClick={() => navigate("/wishlist")}
        />

        <ShoppingCart
          onClick={() => navigate("/cart")}
          className="cursor-pointer"
        />

        {/* Hamburger */}
        {menuOpen ? (
          <X onClick={() => setMenuOpen(false)} className="cursor-pointer" />
        ) : (
          <Menu onClick={() => setMenuOpen(true)} className="cursor-pointer" />
        )}

      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="absolute top-16 left-0 w-full bg-white shadow-md p-5 flex flex-col gap-4 md:hidden">

          <p onClick={() => navigate("/")} className="cursor-pointer">Home</p>
          <p onClick={() => navigate("/products")} className="cursor-pointer">Products</p>
          <p onClick={() => navigate("/services")} className="cursor-pointer">Services</p>
          <p onClick={() => navigate("/contact")} className="cursor-pointer">Contact</p>

          <p onClick={() => navigate("/wishlist")} className="cursor-pointer">Wishlist</p>
          <p onClick={() => navigate("/login")} className="cursor-pointer">Login</p>

        </div>
      )}
    </div>
  );
}
