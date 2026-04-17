import { useEffect, useState } from "react";
import API from "../../api";
import { useNavigate } from "react-router-dom";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  const getProducts = async () => {
    try {
      const { data } = await API.get("/products");
      setProducts(data);
    } catch (err) {
      console.log(err);
      alert("Failed to load products ❌");
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  const deleteProduct = async (id) => {
    if (!window.confirm("Are you sure to delete? ❗")) return;

    try {
      await API.delete(`/products/${id}`);
      alert("Deleted ✅");
      getProducts();
    } catch (err) {
      console.log(err);
      alert("Delete failed ❌");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6 pt-16 sm:pt-6">

      {/* HEADER */}
      <div className="flex flex-col sm:flex-row justify-between gap-3 mb-4">
        <h2 className="text-xl sm:text-2xl font-bold">
          📦 Manage Products
        </h2>

        <button
          onClick={() => navigate("/admin/add-product")}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg w-full sm:w-auto"
        >
          ➕ Add Product
        </button>
      </div>

      {/* MOBILE */}
      <div className="grid gap-4 sm:hidden">
        {products.map((p) => (
          <div key={p._id} className="bg-white rounded-xl shadow p-4 flex gap-4">

            <img
              src={p.image}
              className="w-20 h-20 object-cover rounded-lg"
              alt={p.name}
            />

            <div className="flex-1">
              <h3 className="font-semibold">{p.name}</h3>
              <p className="text-green-600 font-bold">₹{p.price}</p>
              <p className="text-gray-500 text-sm">
                {p.category || "N/A"}
              </p>

              <div className="flex gap-2 mt-2">
                <button
                  onClick={() => navigate(`/admin/edit/${p._id}`)}
                  className="bg-yellow-400 px-2 py-1 text-xs rounded"
                >
                  Edit
                </button>

                <button
                  onClick={() => deleteProduct(p._id)}
                  className="bg-red-500 text-white px-2 py-1 text-xs rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* DESKTOP */}
      <div className="hidden sm:block bg-white rounded-xl shadow overflow-auto">

        <table className="w-full min-w-[600px] text-left">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-3">Image</th>
              <th className="p-3">Name</th>
              <th className="p-3">Price</th>
              <th className="p-3">Category</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>

          <tbody>
            {products.map((p) => (
              <tr key={p._id} className="border-b">

                <td className="p-3">
                  <img
                    src={p.image}
                    className="w-14 h-14 object-cover rounded"
                    alt={p.name}
                  />
                </td>

                <td className="p-3">{p.name}</td>

                <td className="p-3 text-green-600 font-bold">
                  ₹{p.price}
                </td>

                <td className="p-3">{p.category}</td>

                <td className="p-3 flex gap-2">
                  <button
                    onClick={() => navigate(`/admin/edit/${p._id}`)}
                    className="bg-yellow-400 px-3 py-1 rounded"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => deleteProduct(p._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>

              </tr>
            ))}
          </tbody>
        </table>

      </div>

    </div>
  );
};

export default ProductList;