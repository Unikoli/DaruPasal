import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, Package, List, Menu } from "lucide-react";

export default function AdminSidebar() {
  const location = useLocation();
  const [open, setOpen] = useState(false);

  const menuItems = [
    { label: "Dashboard", icon: <LayoutDashboard size={18} />, path: "/admin/dashboard" },
    { label: "Products", icon: <Package size={18} />, path: "/admin/products" },
    { label: "Categories", icon: <List size={18} />, path: "/admin/categories" },
  ];

  return (
    <>
      {/* Mobile Top Bar */}
      <div className="md:hidden flex items-center justify-between bg-red-700 text-white p-4">
        <h1 className="text-xl font-bold">🍷 Daru Pasal Admin</h1>
        <button onClick={() => setOpen(!open)}>
          <Menu />
        </button>
      </div>

      {/* Sidebar */}
      {/* <aside
        className={`fixed z-50 md:static top-0 left-0 h-full w-64 bg-red-700 text-white p-5 transition-transform duration-300 ${
          open ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      > */}
      <aside
  className={`fixed z-50 top-0 left-0 h-screen w-64 bg-red-700 text-white p-5 transition-transform duration-300 ${
    open ? "translate-x-0" : "-translate-x-full md:translate-x-0"
  } md:static md:h-auto`}
>

        <h1 className="text-2xl font-bold mb-10 hidden md:block">🍷 Daru Pasal Admin</h1>
        <nav className="space-y-3">
          {menuItems.map((item) => (
            <Link
              key={item.label}
              to={item.path}
              className={`flex items-center gap-3 px-3 py-2 rounded-md transition hover:text-yellow-300 ${
                location.pathname === item.path ? "bg-red-800" : ""
              }`}
              onClick={() => setOpen(false)} // Auto-close on mobile nav click
            >
              {item.icon}
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Overlay on mobile when sidebar is open */}
      {open && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-40 md:hidden"
          onClick={() => setOpen(false)}
        ></div>
      )}
    </>
  );
}
