import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Mail, Lock, User } from "lucide-react";

export default function Register() {
  const [form, setForm] = useState({
  name: "",
  email: "",
  password: "",
});

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.password) {
      return alert("All fields required ❗");
    }

    try {
      setLoading(true);

      await axios.post(
        "http://localhost:5000/api/auth/register",
        form
      );

      alert("Registered Successfully ✅");
      navigate("/login");
    } catch (err) {
      console.log(err);
      alert("Error ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">

      {/* LEFT IMAGE */}
      <div className="hidden md:flex w-1/2 relative">
        <img
          src="https://images.unsplash.com/photo-1523275335684-37898b6baf30"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40 flex items-center justify-center">
          <h1 className=" text-white text-5xl font-bold text-center px-10 leading-tight">
            Join E-Shop  <br />
            Start Shopping Today
          </h1>
        </div>
      </div>

      {/* FORM */}
      <div className="flex w-full md:w-1/2 items-center justify-center bg-gray-100 px-4 py-10">

        <form
          onSubmit={handleSubmit}
          className="bg-white/80 backdrop-blur-xl p-6 sm:p-8 rounded-3xl shadow-2xl w-full max-w-md"
        >

          <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center">
            Create Account
          </h2>

          {/* NAME */}
          <div className="flex items-center border rounded-xl mb-4 px-3 focus-within:ring-2 focus-within:ring-pink-500">

            <User className="text-gray-400 w-4 sm:w-5" />

            <input
              type="text"
              placeholder="Full Name"
              value={form.name}
              onChange={(e) =>
                setForm({ ...form, name: e.target.value })
              }
              className="w-full p-2 sm:p-3 outline-none bg-transparent text-sm sm:text-base"
            />

          </div>

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

          {/* ROLE */}
          <div className="mb-6">

            <p className="text-sm font-semibold mb-2">Select Role</p>

            <div className="flex gap-6 text-sm">

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="role"
                  value="user"
                  checked={form.role === "user"}
                  onChange={(e) =>
                    setForm({ ...form, role: e.target.value })
                  }
                />
                User
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="role"
                  value="admin"
                  checked={form.role === "admin"}
                  onChange={(e) =>
                    setForm({ ...form, role: e.target.value })
                  }
                />
                Admin
              </label>

            </div>

          </div>

          {/* BUTTON */}
          <button
            disabled={loading}
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-xl font-semibold hover:scale-105 transition disabled:opacity-50 text-sm sm:text-base"
          >
            {loading ? "Registering..." : "Register"}
          </button>

          {/* LOGIN LINK */}
          <p className="text-xs sm:text-sm text-center mt-5">
            Already have an account?{" "}
            <span
              onClick={() => navigate("/login")}
              className="text-pink-500 cursor-pointer font-semibold"
            >
              Login
            </span>
          </p>

        </form>

      </div>
    </div>
  );
}