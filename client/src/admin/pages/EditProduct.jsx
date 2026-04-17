import { useEffect, useState } from "react";
import API from "../../api";
import { useParams, useNavigate } from "react-router-dom";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    price: "",
    description: "",
    image: "",
    category: "",
  });

  const [loading, setLoading] = useState(false);

  // ✅ FETCH PRODUCT (GET)
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await API.get(`/products/${id}`);

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

  // ✅ UPDATE PRODUCT
  const updateProduct = async () => {
    if (!form.name || !form.price) {
      return alert("Name & Price required ❗");
    }

    try {
      setLoading(true);

      await API.put(`/products/${id}`, form);

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

        <h2 className="text-xl sm:text-2xl font-bold text-center mb-5">
          ✏ Edit Product
        </h2>

        <div className="space-y-3">

          <input
            value={form.name}
            placeholder="Product Name"
            className="w-full p-3 border rounded-lg"
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />

          <input
            type="number"
            value={form.price}
            placeholder="Price"
            className="w-full p-3 border rounded-lg"
            onChange={(e) => setForm({ ...form, price: e.target.value })}
          />

          <input
            value={form.image}
            placeholder="Image URL"
            className="w-full p-3 border rounded-lg"
            onChange={(e) => setForm({ ...form, image: e.target.value })}
          />

          <input
            value={form.category}
            placeholder="Category"
            className="w-full p-3 border rounded-lg"
            onChange={(e) => setForm({ ...form, category: e.target.value })}
          />

          <textarea
            value={form.description}
            placeholder="Description"
            rows="3"
            className="w-full p-3 border rounded-lg"
            onChange={(e) =>
              setForm({ ...form, description: e.target.value })
            }
          />
        </div>

        {/* ✅ IMAGE FIX */}
        {form.image && (
          <img
            src={
              form.image.startsWith("http")
                ? form.image
                : `${process.env.REACT_APP_API_URL}/uploads/${form.image}`
            }
            className="w-full h-40 object-cover rounded mt-4"
            alt="preview"
          />
        )}

        <div className="flex gap-3 mt-5">
          <button
            onClick={updateProduct}
            disabled={loading}
            className="flex-1 bg-pink-500 text-white py-3 rounded-lg"
          >
            {loading ? "Updating..." : "Update 🚀"}
          </button>

          <button
            onClick={() => navigate("/admin/products")}
            className="flex-1 bg-gray-200 py-3 rounded-lg"
          >
            Back
          </button>
        </div>

      </div>
    </div>
  );
};

export default EditProduct;