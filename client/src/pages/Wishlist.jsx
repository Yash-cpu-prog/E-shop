import { useWishlist } from "../context/WishlistContext";
import { useNavigate } from "react-router-dom";

export default function Wishlist() {
  const { wishlist, removeFromWishlist } = useWishlist();
  const navigate = useNavigate();

  return (
    <div className="px-6 md:px-16 py-10 min-h-screen bg-white-100">

      <h2 className="text-3xl font-bold mb-8"> Your Wishlist</h2>

      {wishlist.length === 0 ? (
        <p className="text-gray-500">No items in wishlist</p>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">

          {wishlist.map((p) => (
            <div
              key={p._id}
              className="bg-white rounded-2xl shadow hover:shadow-lg transition overflow-hidden"
            >

              {/* IMAGE */}
              <div
                onClick={() => navigate(`/product/${p._id}`)}
                className="h-48 overflow-hidden cursor-pointer"
              >
                <img
                  src={
                    p.image?.startsWith("http")
                      ? p.image
                      : `http://localhost:5000/uploads/${p.image}`
                  }
                  className="w-full h-full object-cover hover:scale-110 transition"
                />
              </div>

              {/* CONTENT */}
              <div className="p-4">
                <h3 className="font-semibold">{p.name}</h3>

                <p className="text-green-600 font-bold mt-1">
                  ₹{p.price}
                </p>

                <button
                  onClick={() => removeFromWishlist(p._id)}
                  className="mt-3 w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition"
                >
                  Remove 
                </button>
              </div>

            </div>
          ))}

        </div>
      )}
    </div>
  );
}