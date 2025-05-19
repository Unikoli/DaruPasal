

import { useState, useEffect } from "react";
import { FaBars } from "react-icons/fa";
import { motion } from "framer-motion";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import config from "../config";

export default function Sidebar() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [products, setProducts] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedCategories, setExpandedCategories] = useState({});
  const navigate = useNavigate();
  const location = useLocation();
  const { id: productId } = useParams(); // from /product/:id

  // Fetch all categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(`${config.API_URL}/api/categories`);
        const data = await res.json();
        setCategories(data);
      } catch (err) {
        console.error("Error fetching categories:", err);
      }
    };
    fetchCategories();
  }, []);

  // When on product detail page, fetch product and highlight its category
  useEffect(() => {
    const fetchProductCategory = async () => {
      if (location.pathname.startsWith("/product/")) {
        try {
          const res = await fetch(`${config.API_URL}/api/products/${productId}`);
          const data = await res.json();
          setSelectedCategory(data.category_id);
          if (!products[data.category_id]) {
            fetchProductsByCategory(data.category_id);
          }
          setExpandedCategories((prev) => ({ ...prev, [data.category_id]: true }));
        } catch (err) {
          console.error("Error fetching product details:", err);
        }
      }
    };
    fetchProductCategory();
  }, [location.pathname, productId]);

  // Fetch products under a category
  const fetchProductsByCategory = async (categoryId) => {
    try {
      const res = await fetch(`${config.API_URL}/api/category/${categoryId}/products`);
      const data = await res.json();
      setProducts((prev) => ({ ...prev, [categoryId]: data }));
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  };

  // Filtered categories based on search
  const filteredCategories = categories.filter((cat) =>
    cat.category_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4 w-72 md:w-64 lg:w-80 transition-all duration-300 ease-in-out">
      {/* Mobile Toggle */}
      <button 
        className="md:hidden bg-red-700 text-white p-2 rounded mb-4" 
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <FaBars />
      </button>

      {/* Search Input */}
      <input
        type="text"
        placeholder="Search categories..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full mb-3 p-2 border border-gray-300 rounded focus:outline-red-500"
      />

      {/* Sidebar */}
      <motion.div 
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white shadow-lg rounded-md"
      >
        <div className="bg-red-700 text-white rounded-t-md p-3 font-semibold flex items-center">
          <FaBars className="mr-2" />
          All Categories
        </div>

        <div className="border border-gray-300 divide-y">
          {filteredCategories.map((category) => {
            const isExpanded = expandedCategories[category.id];
            const isActive = selectedCategory === category.id;

            return (
              <div key={category.id}>
                {/* Category Title */}
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`p-3 flex justify-between items-center cursor-pointer transition-all duration-200 ${
                    isActive ? "bg-gray-200" : ""
                  }`}
                  onClick={() => {
                    const newExpanded = !expandedCategories[category.id];
                    setExpandedCategories((prev) => ({
                      ...prev,
                      [category.id]: newExpanded,
                    }));
                    setSelectedCategory(category.id);
                    if (!products[category.id]) {
                      fetchProductsByCategory(category.id);
                    }
                  }}
                >
                  {category.category_name}
                  <span className="text-gray-600">
                    {isExpanded ? <FaChevronUp /> : <FaChevronDown />}
                  </span>
                </motion.div>

                {/* Product List */}
                {isExpanded && products[category.id] && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="bg-gray-100 p-2 border-l-4 border-red-600"
                  >
                    {products[category.id].length > 0 ? (
                      <ul>
                        {products[category.id].map((product) => (
                          <li
                            key={product.id}
                            className="p-2 border-b cursor-pointer hover:bg-red-100"
                            onClick={() => navigate(`/product/${product.id}`)}
                          >
                            {product.name}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-gray-600">No products available</p>
                    )}
                  </motion.div>
                )}
              </div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}
