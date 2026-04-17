import { useState } from "react";
import API from "../../api";
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

  // ✅ IMAGE UPLOAD (Cloudinary)
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

  // ✅ ADD PRODUCT
  const handleSubmit = async () => {
    if (!form.name || !form.price || !form.category || !form.image) {
      return alert("All fields are required ❌");
    }

    try {
      setLoading(true);

      await API.post("/products", {
        ...form,
        price: Number(form.price),
      });

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
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-3">
      <div className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-lg">

        <h2 className="text-2xl font-bold mb-5 text-center">
          ➕ Add New Product
        </h2>

        <input
          value={form.name}
          placeholder="Product Name"
          className="w-full mb-4 p-3 border rounded-lg"
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <input
          value={form.price}
          type="number"
          placeholder="Price"
          className="w-full mb-4 p-3 border rounded-lg"
          onChange={(e) => setForm({ ...form, price: e.target.value })}
        />

        {/* IMAGE */}
        <input
          type="file"
          accept="image/*"
          className="w-full mb-4"
          onChange={(e) => uploadImage(e.target.files[0])}
        />

        {uploading && <p className="text-blue-500">Uploading...</p>}

        {form.image && (
          <img
            src={form.image}
            className="w-full h-40 object-cover rounded mb-4"
          />
        )}

        <input
          value={form.category}
          placeholder="Category"
          className="w-full mb-4 p-3 border rounded-lg"
          onChange={(e) => setForm({ ...form, category: e.target.value })}
        />

        <textarea
          value={form.description}
          placeholder="Description"
          rows="3"
          className="w-full mb-4 p-3 border rounded-lg"
          onChange={(e) =>
            setForm({ ...form, description: e.target.value })
          }
        />

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full py-3 bg-blue-600 text-white rounded-lg"
        >
          {loading ? "Adding..." : "Add Product"}
        </button>

        <button
          onClick={() => navigate("/admin")}
          className="w-full mt-3 bg-gray-300 py-2 rounded-lg"
        >
          Back
        </button>

      </div>
    </div>
  );
};

export default AddProduct;