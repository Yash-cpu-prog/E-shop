import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export default function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  // Load from localStorage
  useEffect(() => {
    const data = localStorage.getItem("cart");
    if (data) setCart(JSON.parse(data));
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // Add to cart
  const addToCart = (product) => {
    const exist = cart.find((x) => x._id === product._id);

    if (exist) {
      setCart(
        cart.map((x) =>
          x._id === product._id
            ? { ...x, qty: x.qty + 1 }
            : x
        )
      );
    } else {
      setCart([...cart, { ...product, qty: 1 }]);
    }
  };

  // Remove item
  const removeFromCart = (id) => {
    setCart(cart.filter((x) => x._id !== id));
  };

  // Increase qty
  const increaseQty = (id) => {
    setCart(
      cart.map((x) =>
        x._id === id ? { ...x, qty: x.qty + 1 } : x
      )
    );
  };

  // Decrease qty
  const decreaseQty = (id) => {
    setCart(
      cart.map((x) =>
        x._id === id
          ? { ...x, qty: x.qty > 1 ? x.qty - 1 : 1 }
          : x
      )
    );
  };

  // Total price
 const totalPrice = cart.reduce(
  (acc, item) => acc + Number(item.price) * item.qty,
  0
);


  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        increaseQty,
        decreaseQty,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
