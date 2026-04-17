import { createContext, useContext, useState, useEffect } from "react";

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);

  // 🔥 Load from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("wishlist");
    if (stored) setWishlist(JSON.parse(stored));
  }, []);

  // 🔥 Save to localStorage
  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  // ✅ Add to wishlist
  const addToWishlist = (product) => {
    const exists = wishlist.find((p) => p._id === product._id);
    if (!exists) {
      setWishlist([...wishlist, product]);
    } else {
      alert("Already in wishlist ❤️");
    }
  };

  // ❌ Remove
  const removeFromWishlist = (id) => {
    setWishlist(wishlist.filter((p) => p._id !== id));
  };

  return (
    <WishlistContext.Provider
      value={{ wishlist, addToWishlist, removeFromWishlist }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);