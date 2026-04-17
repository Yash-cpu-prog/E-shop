export default function Categories({ selected, setSelected }) {
  const cats = [
    "All",
    "Electronics",
    "Fashion",
    "Footwear",
    "Smart Watches",
    "Beauty",
  ];

  return (
    <div className="overflow-hidden px-4 md:px-10 mt-6 md:mt-10">

      {/* MARQUEE */}
      <div className="flex gap-6 w-max animate-scroll">

        {[...cats, ...cats].map((c, i) => {
          const isActive =
            selected === c || (c === "All" && selected === "");

          return (
            <span
              key={i}
              onClick={() => setSelected(c === "All" ? "" : c)}
              className={`
                cursor-pointer whitespace-nowrap text-sm md:text-base px-3 py-1 rounded-full transition
                ${isActive
                  ? "text-pink-500 font-semibold"
                  : "text-gray-600 hover:text-black"
                }
              `}
            >
              {c}
            </span>
          );
        })}

      </div>

    </div>
  );
}
