

import { FiSearch, FiUser, FiHeart, FiShoppingBag } from "react-icons/fi";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import config from "../config";

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch(`${config.API_URL}/api/logout`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });


      if (res.ok) {
        toast.error('logged out!')
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setUser(null);
        setDropdownOpen(false);
        navigate("/login");
      } else {
        console.error("Logout failed");
      }
    } catch (error) {
      console.error("Logout error:", error);
    }
  };
 

  const isActive = (path) =>
    location.pathname === path ? "text-red-500 border-b-2 border-red-500" : "hover:text-red-500";

  return (
    <header className="flex items-center justify-between px-8 py-4 shadow-md bg-white sticky top-0 z-50">
      {/* Logo */}
      <div className="flex items-center space-x-2">
        <img src="/darupasal_image.png" alt="Logo" className="w-12 h-12 rounded-full" />
        <span className="text-xl font-bold">E-liquor</span>
      </div>

      {/* Nav */}
      <nav className="space-x-8 font-semibold text-gray-800 hidden md:flex">
        <Link to="/" className={`${isActive("/")}`}>HOME</Link>
        <Link to="/shop" className={`${isActive("/shop")}`}>SHOP</Link>
        <Link to="/cart" className={`${isActive("/cart")}`}>CART</Link>
        <Link to="/about" className={`${isActive("/about")}`}>ABOUT</Link>
        <Link to="/contact" className={`${isActive("/contact")}`}>CONTACT</Link>
      </nav>

      {/* Icons */}
      <div className="flex items-center space-x-6 text-xl relative">
        <FiSearch className="cursor-pointer" />
        <FiHeart className="cursor-pointer" />
        <div className="relative">
          <FiShoppingBag className="cursor-pointer" />
          <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center" onClick={()=>navigate('/cart')}>
            2
          </span>
        </div>

        {/* User Icon + Dropdown */}
        <div className="relative">
          <div onClick={() => setDropdownOpen(!dropdownOpen)} className="cursor-pointer flex items-center gap-1">
            <FiUser />
            {user && <span className="text-sm lowercase">{user.name}</span>}
          </div>

          {dropdownOpen && (
            <div className="absolute right-0 mt-2 bg-white border rounded shadow-md p-2 w-36 z-50">
              {user ? (
                <>
                  <button
                    onClick={()=>navigate("/user/orders")}
                    className="block w-full text-left px-4 py-2 hover:bg-red-100 text-red-600"
                  >
                    Order History
                  </button>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 hover:bg-red-100 text-red-600"
                  >
                    Sign Out
                  </button>
                </>
              )
                : (
                  <button
                    onClick={() => {
                      setDropdownOpen(false);
                      navigate("/login");
                    }}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                  >
                    Login
                  </button>
                )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
