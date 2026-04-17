import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

export default function CartPage() {
  const {
    cart,
    removeFromCart,
    increaseQty,
    decreaseQty,
    totalPrice,
  } = useCart();

  return (
    <div className="p-4 sm:p-6 md:p-10">

      {/* TITLE */}
      <h1 className="text-2xl sm:text-3xl font-bold mb-6">
        Your Cart
      </h1>

      {cart.length === 0 ? (
        <p className="text-sm sm:text-base">No items in cart</p>
      ) : (
        <>

          {/* CART ITEMS */}
          {cart.map((item) => (
            <div
              key={item._id}
              className="flex flex-col sm:flex-row sm:justify-between sm:items-center bg-white p-4 mb-4 rounded shadow gap-4"
            >

              {/* LEFT SIDE */}
              <div className="flex items-center gap-3 sm:gap-4">

                <img
                  src={item.image}
                  className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded"
                />

                <div>
                  <h2 className="text-sm sm:text-base font-medium">
                    {item.name}
                  </h2>

                  <p className="text-gray-600 text-sm">
                    ${item.price}
                  </p>
                </div>

              </div>

              {/* QTY CONTROLS */}
              <div className="flex items-center gap-3 sm:gap-4">

                <button
                  onClick={() => decreaseQty(item._id)}
                  className="px-2 py-1 bg-gray-200 rounded text-sm"
                >
                  -
                </button>

                <span className="text-sm sm:text-base">
                  {item.qty}
                </span>

                <button
                  onClick={() => increaseQty(item._id)}
                  className="px-2 py-1 bg-gray-200 rounded text-sm"
                >
                  +
                </button>

              </div>

              {/* REMOVE */}
              <button
                onClick={() => removeFromCart(item._id)}
                className="bg-red-500 text-white px-3 py-1 rounded text-sm w-full sm:w-auto"
              >
                Remove
              </button>

            </div>
          ))}

          {/* TOTAL */}
          <h2 className="text-lg sm:text-xl font-bold mt-5">
            Total: ${totalPrice.toFixed(2)}
          </h2>

          {/* CHECKOUT */}
          <Link to="/checkout">
            <button className="bg-green-500 text-white px-5 sm:px-6 py-2 mt-5 rounded w-full sm:w-auto">
              Checkout
            </button>
          </Link>

        </>
      )}
    </div>
  );
}