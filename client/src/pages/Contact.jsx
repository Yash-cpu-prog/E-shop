import { useState } from "react";
import axios from "axios";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    await axios.post("http://localhost:5000/api/contact/send", form);

    alert("Message Sent ✅");
    setForm({ name: "", email: "", message: "" });

  } catch (err) {
    alert("Failed ❌");
  }
};

  return (
    <div className="bg-gray-50 min-h-screen px-4 sm:px-6 md:px-16 py-10 md:py-12">

      {/* HEADER */}
      <div className="text-center max-w-3xl mx-auto">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold">
          Contact Us
        </h1>

        <p className="mt-3 md:mt-4 text-gray-600 text-sm sm:text-base">
          Have questions? We'd love to hear from you.
        </p>
      </div>

      {/* CONTENT */}
      <div className="mt-10 md:mt-12 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 max-w-6xl mx-auto">

        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 sm:p-8 rounded-2xl shadow"
        >
          <h2 className="text-xl sm:text-2xl font-bold mb-5 md:mb-6">
            Send Message
          </h2>

          <input
            type="text"
            placeholder="Your Name"
            value={form.name}
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
            className="w-full mb-3 md:mb-4 p-3 border rounded-lg text-sm md:text-base"
            required
          />

          <input
            type="email"
            placeholder="Your Email"
            value={form.email}
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
            className="w-full mb-3 md:mb-4 p-3 border rounded-lg text-sm md:text-base"
            required
          />

          <textarea
            placeholder="Your Message"
            rows="5"
            value={form.message}
            onChange={(e) =>
              setForm({ ...form, message: e.target.value })
            }
            className="w-full mb-3 md:mb-4 p-3 border rounded-lg text-sm md:text-base"
            required
          />

          <button className="w-full bg-pink-500 hover:bg-pink-600 text-white py-3 rounded-lg transition text-sm md:text-base">
            Send Message
          </button>
        </form>

        {/* INFO */}
        <div className="flex flex-col justify-center gap-4">

          <div className="bg-white p-5 md:p-6 rounded-xl shadow">
            <h3 className="font-bold text-base md:text-lg">Address</h3>
            <p className="text-gray-500 mt-2 text-sm md:text-base">
              Maharashtra, India
            </p>
          </div>

          <div className="bg-white p-5 md:p-6 rounded-xl shadow">
            <h3 className="font-bold text-base md:text-lg">Phone</h3>
            <p className="text-gray-500 mt-2 text-sm md:text-base">
              +91 9021116479
            </p>
          </div>

          <div className="bg-white p-5 md:p-6 rounded-xl shadow">
            <h3 className="font-bold text-base md:text-lg">Email</h3>
            <p className="text-gray-500 mt-2 text-sm md:text-base">
              yashkalamkar07@gmail.com
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}