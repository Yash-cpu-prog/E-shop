import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, Package, PlusCircle, X, Menu } from "lucide-react";
import { useState } from "react";

const Sidebar = () => {
  const location = useLocation();
  const [open, setOpen] = useState(false);

  const menu = [
    { name: "Dashboard", path: "/admin", icon: <LayoutDashboard size={18} /> },
    { name: "Products", path: "/admin/products", icon: <Package size={18} /> },
    { name: "Add Product", path: "/admin/add-product", icon: <PlusCircle size={18} /> },
  ];

  return (
    <div className="flex">

      {/* 🔥 MOBILE TOP BAR */}
      <div className="md:hidden fixed top-0 left-0 w-full bg-gray-900 text-white p-4 z-50 flex justify-between items-center">
        <h2 className="text-lg font-bold">Admin Panel</h2>

        {open ? (
          <X onClick={() => setOpen(false)} className="cursor-pointer" />
        ) : (
          <Menu onClick={() => setOpen(true)} className="cursor-pointer" />
        )}
      </div>

      {/* BACKDROP */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/50 md:hidden z-40"
        />
      )}

      {/* SIDEBAR */}
      <div
        className={`
          fixed md:static top-0 left-0 z-50
          h-screen w-64
          bg-gradient-to-b from-gray-900 to-gray-800 text-white p-5
          transform transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
          pt-20 md:pt-5
        `}
      >

        {/* Logo */}
        <h2 className="text-2xl font-bold mb-8 text-center tracking-wide hidden md:block">
          Admin Panel
        </h2>

        {/* Menu */}
        <ul className="space-y-3">
          {menu.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                onClick={() => setOpen(false)}
                className={`flex items-center gap-3 p-3 rounded-xl transition-all
                ${
                  location.pathname === item.path
                    ? "bg-blue-600 shadow-md"
                    : "hover:bg-gray-700"
                }`}
              >
                {item.icon}
                <span className="text-sm font-medium">{item.name}</span>
              </Link>
            </li>
          ))}
        </ul>

        {/* Bottom */}
        <div className="absolute bottom-5 left-5 text-sm text-gray-400">
          © 2026 Admin
        </div>
      </div>

    </div>
  );
};

export default Sidebar;