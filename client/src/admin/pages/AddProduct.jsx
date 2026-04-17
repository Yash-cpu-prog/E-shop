import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    price: "",
    description: "",
    image: "",
    category: "",
  });

  const uploadImage = async (file) => {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "ecommerce_upload");

    setUploading(true);

    try {
      const res = await axios.post(
        "https://api.cloudinary.com/v1_1/daui5mfcv/image/upload",
        data
      );

      setForm({ ...form, image: res.data.secure_url });
      alert("Image Uploaded ✅");
    } catch (err) {
      console.log(err);
      alert("Image upload failed ❌");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async () => {
    const token = localStorage.getItem("token");

    if (!form.name || !form.price || !form.category || !form.image) {
      return alert("All fields are required ❌");
    }

    setLoading(true);

    try {
      await axios.post(
        "http://localhost:5000/api/products",
        {
          ...form,
          price: Number(form.price),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Product Added ✅");

      setForm({
        name: "",
        price: "",
        description: "",
        image: "",
        category: "",
      });

      navigate("/admin");
    } catch (err) {
      console.log(err);
      alert("Error adding product ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-3 sm:px-0">

      <div className="bg-white p-5 sm:p-8 rounded-2xl shadow-lg w-full max-w-lg">

        <h2 className="text-xl sm:text-2xl font-bold mb-5 text-center">
          ➕ Add New Product
        </h2>

        {/* Name */}
        <input
          value={form.name}
          placeholder="Product Name"
          className="w-full mb-4 p-3 border rounded-lg text-sm sm:text-base"
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        {/* Price */}
        <input
          value={form.price}
          type="number"
          placeholder="Price"
          className="w-full mb-4 p-3 border rounded-lg text-sm sm:text-base"
          onChange={(e) => setForm({ ...form, price: e.target.value })}
        />

        {/* IMAGE UPLOAD */}
        <div className="mb-4">
          <input
            type="file"
            accept="image/*"
            className="w-full p-2 border rounded text-sm"
            onChange={(e) => uploadImage(e.target.files[0])}
          />

          {uploading && (
            <p className="text-blue-500 mt-2 text-sm">
              Uploading image...
            </p>
          )}
        </div>

        {/* Preview */}
        {form.image && (
          <img
            src={form.image}
            alt="preview"
            className="w-full h-40 object-cover rounded mb-4"
          />
        )}

        {/* Category */}
        <input
          value={form.category}
          placeholder="Category"
          className="w-full mb-4 p-3 border rounded-lg text-sm sm:text-base"
          onChange={(e) => setForm({ ...form, category: e.target.value })}
        />

        {/* Description */}
        <textarea
          value={form.description}
          placeholder="Description"
          rows="3"
          className="w-full mb-4 p-3 border rounded-lg text-sm sm:text-base"
          onChange={(e) =>
            setForm({ ...form, description: e.target.value })
          }
        />

        {/* Submit */}
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full py-3 rounded-lg text-white bg-blue-600 hover:bg-blue-700 text-sm sm:text-base"
        >
          {loading ? "Adding..." : "Add Product "}
        </button>

        {/* Back */}
        <button
          onClick={() => navigate("/admin")}
          className="w-full mt-3 bg-gray-300 py-2 rounded-lg text-sm sm:text-base"
        >
           Back
        </button>

      </div>
    </div>
  );
};

export default AddProduct;