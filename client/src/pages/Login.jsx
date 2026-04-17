import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Mail, Lock } from "lucide-react";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/auth/login",
        form
      );

      const userData = data.user || data;

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(userData));

      if (userData.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }

    } catch {
      alert("Login Failed ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">

      {/* LEFT IMAGE */}
      <div className="hidden md:flex w-1/2 relative">
        <img
          src="https://images.pexels.com/photos/5632402/pexels-photo-5632402.jpeg"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <h1 className="text-white text-4xl font-bold text-center px-10">
            Welcome to E-Shop
          </h1>
        </div>
      </div>

      {/* FORM */}
      <div className="flex w-full md:w-1/2 items-center justify-center bg-gray-100 px-4 py-10">

        <form
          onSubmit={handleSubmit}
          className="bg-white/80 backdrop-blur-xl p-6 sm:p-8 rounded-3xl shadow-xl w-full max-w-md"
        >

          <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center">
            Login
          </h2>

          {/* EMAIL */}
          <div className="flex items-center border rounded-xl mb-4 px-3 focus-within:ring-2 focus-within:ring-pink-500">

            <Mail className="text-gray-400 w-4 sm:w-5" />

            <input
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={(e) =>
                setForm({ ...form, email: e.target.value })
              }
              className="w-full p-2 sm:p-3 outline-none bg-transparent text-sm sm:text-base"
            />

          </div>

          {/* PASSWORD */}
          <div className="flex items-center border rounded-xl mb-6 px-3 focus-within:ring-2 focus-within:ring-pink-500">

            <Lock className="text-gray-400 w-4 sm:w-5" />

            <input
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={(e) =>
                setForm({ ...form, password: e.target.value })
              }
              className="w-full p-2 sm:p-3 outline-none bg-transparent text-sm sm:text-base"
            />

          </div>

          {/* BUTTON */}
          <button
            disabled={loading}
            className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white py-3 rounded-xl font-semibold hover:scale-105 transition disabled:opacity-50 text-sm sm:text-base"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          {/* REGISTER LINK */}
          <p className="text-xs sm:text-sm text-center mt-5">
            Don’t have an account?{" "}
            <span
              onClick={() => navigate("/register")}
              className="text-pink-500 cursor-pointer font-semibold"
            >
              Register
            </span>
          </p>

        </form>

      </div>
    </div>
  );
}


