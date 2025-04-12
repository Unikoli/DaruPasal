
import { FiHeart, FiMinus, FiPlus, FiShoppingCart } from "react-icons/fi"


import { useEffect, useState } from "react";
import { data } from "react-router-dom";


export default function ProductCard({ image, title, price, rating, reviews,product }) {
    const [qty, setQty] = useState(1)
    useEffect(()=>{
        console.log("products are!!",price)
    })
    return (
      <div className="bg-white rounded-xl shadow-md p-4 w-full max-w-xs transition-transform duration-300 hover:-translate-y-2 hover:shadow-lg relative">
        {/* Product Image */}
        <img src={image || "/default-image.jpg"} alt={title} className="w-full h-60 object-contain mb-4" />
  
        {/* Product Details */}
        <h2 className="text-md font-medium text-gray-800">{title}</h2>
        <p className="text-lg font-bold text-red-600 mt-1">Rs{price}</p>
  
        {/* Rating */}
        <div className="flex items-center space-x-1 text-yellow-500 mt-1">
          {[...Array(5)].map((_, index) => (
            <span key={index}>{index < rating ? "★" : "☆"}</span>
          ))}
          <span className="text-gray-500 text-sm">({reviews})</span>
        </div>
        {/* Quantity + Cart */}
      <div className="mt-4 flex items-center justify-between space-x-2">
        <div className="flex items-center border rounded px-2">
          <button
            onClick={() => setQty(Math.max(1, qty - 1))}
            className="p-1 hover:text-red-500 transition"
          >
            <FiMinus />
          </button>
          <span className="px-2">{qty}</span>
          <button
            onClick={() => setQty(qty + 1)}
            className="p-1 hover:text-green-500 transition"
          >
            <FiPlus />
          </button>
        </div>

        <button className="flex items-center bg-red-600 hover:bg-red-700 text-white text-sm font-semibold px-4 py-2 rounded-full transition-all duration-300">
          <FiShoppingCart className="mr-2" />
          ADD TO CART
        </button>
      </div>
      </div>
    );
  }
  