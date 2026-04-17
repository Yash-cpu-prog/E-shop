import { useState } from "react";

const Brands = ({ onCategorySelect }) => {
  const categories = [
    "All",
    "Electronics",
    "Clothes",
    "Footwear",
    "Beauty",
  ];

  const [active, setActive] = useState("All");

  const handleClick = (cat) => {
    setActive(cat);
    onCategorySelect && onCategorySelect(cat === "All" ? "" : cat);
  };

  return (
    <div className="py-8 md:py-12 bg-gray-50">

      {/* Heading */}
      <h2 className="text-xl md:text-3xl font-bold text-center mb-6 md:mb-8">
        Shop by Category
      </h2>

      {/* Category row */}
      <div className="flex flex-wrap justify-center gap-3 md:gap-6 px-4 md:px-6">

        {categories.map((c, i) => (
          <div
            key={i}
            onClick={() => handleClick(c)}
            className={`
              px-4 py-2 md:px-8 md:py-3 
              rounded-full 
              shadow-md 
              border transition duration-300 cursor-pointer
              text-xs md:text-base font-medium md:font-semibold

              ${active === c
                ? "bg-black text-white border-black scale-105"
                : "bg-white text-gray-600 md:text-gray-700 border-gray-200 hover:bg-black hover:text-white hover:scale-105"
              }
            `}
          >
            {c}
          </div>
        ))}

      </div>

    </div>
  );
};

export default Brands;