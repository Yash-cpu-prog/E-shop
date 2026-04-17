import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [form, setForm] = useState({
    name: "",
    price: "",
    description: "",
    image: "",
    category: "",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:5000/api/products/${id}`
        );

        setForm({
          name: data.name || "",
          price: data.price || "",
          description: data.description || "",
          image: data.image || "",
          category: data.category || "",
        });
      } catch (err) {
        alert("Failed to load product ❌");
      }
    };

    fetchProduct();
  }, [id]);

  const updateProduct = async () => {
    if (!form.name || !form.price) {
      return alert("Name & Price required ❗");
    }

    try {
      setLoading(true);

      await axios.put(
        `http://localhost:5000/api/products/${id}`,
        form,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      alert("Updated Successfully ✅");
      navigate("/admin/products");
    } catch (err) {
      alert("Update failed ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-3 py-6">

      <div className="bg-white w-full max-w-lg rounded-2xl shadow-lg p-4 sm:p-6">

        {/* HEADER */}
        <h2 className="text-xl sm:text-2xl font-bold text-center mb-5">
          ✏ Edit Product
        </h2>

        {/* FORM */}
        <div className="space-y-3">

          <input
            value={form.name}
            placeholder="Product Name"
            className="w-full p-3 border rounded-lg text-sm sm:text-base"
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />

          <input
            type="number"
            value={form.price}
            placeholder="Price"
            className="w-full p-3 border rounded-lg text-sm sm:text-base"
            onChange={(e) => setForm({ ...form, price: e.target.value })}
          />

          <input
            value={form.image}
            placeholder="Image URL"
            className="w-full p-3 border rounded-lg text-sm sm:text-base"
            onChange={(e) => setForm({ ...form, image: e.target.value })}
          />

          <input
            value={form.category}
            placeholder="Category"
            className="w-full p-3 border rounded-lg text-sm sm:text-base"
            onChange={(e) => setForm({ ...form, category: e.target.value })}
          />

          <textarea
            value={form.description}
            placeholder="Description"
            rows="3"
            className="w-full p-3 border rounded-lg text-sm sm:text-base"
            onChange={(e) =>
              setForm({ ...form, description: e.target.value })
            }
          />

        </div>

        {/* IMAGE PREVIEW */}
        {form.image && (
          <div className="mt-4">
            <p className="text-xs text-gray-500 mb-1">Preview</p>
            <img
              src={
                form.image.startsWith("http")
                  ? form.image
                  : `http://localhost:5000/uploads/${form.image}`
              }
              className="w-full h-40 object-cover rounded-lg border"
              alt="preview"
            />
          </div>
        )}

        {/* BUTTONS */}
        <div className="flex flex-col sm:flex-row gap-3 mt-5">

          <button
            onClick={updateProduct}
            disabled={loading}
            className="flex-1 bg-pink-500 text-white py-3 rounded-lg text-sm font-semibold"
          >
            {loading ? "Updating..." : "Update 🚀"}
          </button>

          <button
            onClick={() => navigate("/admin/products")}
            className="flex-1 bg-gray-200 py-3 rounded-lg text-sm"
          >
            Back
          </button>

        </div>

      </div>
    </div>
  );
};

export default EditProduct;