import { useState, useEffect } from "react";
import { FaBars } from "react-icons/fa";
import { motion } from "framer-motion";

export default function Sidebar() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [products, setProducts] = useState({});
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/categories");
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const fetchProductsByCategory = async (categoryId) => {
    try {
      const response = await fetch(`http://localhost:8000/api/category/${categoryId}/products`);
      const data = await response.json();
      setProducts((prev) => ({ ...prev, [categoryId]: data }));
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  return (
    <div className="p-4 w-72 md:w-64 lg:w-80 transition-all duration-300 ease-in-out">
      {/* Mobile Toggle Button */}
      <button 
        className="md:hidden bg-red-700 text-white p-2 rounded" 
        onClick={() => setIsOpen(!isOpen)}
      >
        <FaBars />
      </button>

      {/* Sidebar */}
      <motion.div 
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className={`absolute md:relative top-0 left-0 bg-white shadow-lg h-screen md:h-auto md:block ${isOpen ? 'block' : 'hidden'}`}
      >
        <div className="bg-red-700 text-white rounded-t-lg flex items-center p-3 font-semibold">
          <FaBars className="mr-2" /> All Categories
        </div>
        <div className="border border-gray-300 divide-y">
          {categories.map((category, index) => (
            <div key={index}>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`p-3 flex justify-between items-center cursor-pointer transition-all duration-200 ${
                  selectedCategory === category.id ? "bg-gray-200" : ""
                }`}
                onClick={() => {
                  setSelectedCategory(category.id);
                  fetchProductsByCategory(category.id);
                }}
              >
                {category.category_name}
                <span 
                  className="text-gray-600 cursor-pointer hover:text-red-500 transition-colors duration-200" 
                  onClick={() => fetchProductsByCategory(category.id)}
                >
                  +
                </span>
              </motion.div>
              {/* Product List under category */}
              {selectedCategory === category.id && products[category.id] && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="bg-gray-100 p-2 border-l-4 border-red-600"
                >
                  {products[category.id].length > 0 ? (
                    <ul>
                      {products[category.id].map((product, i) => (
                        <li key={i} className="p-2 border-b">{product.name}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-600">No products available</p>
                  )}
                </motion.div>
              )}
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}