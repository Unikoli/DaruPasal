

// export default ProductDetails;
import React, { useState, useEffect } from "react";
import { FiMinus, FiPlus, FiShoppingCart } from "react-icons/fi";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [addingToCart, setAddingToCart] = useState(false); // 🔄 Add-to-cart button state

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`http://localhost:8000/api/products/${id}`);
        const data = await res.json();
        setProduct(data);
      } catch (err) {
        console.error("Failed to fetch product:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const increaseQty = () => setQuantity((prev) => prev + 1);
  const decreaseQty = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  const handleAddToCart = async (productId, quantity) => {
    const token = localStorage.getItem("token");

    if (!token) {
      toast.error("🚫 Login required to add to cart");
      return;
    }

    if (!productId) {
      toast.error("❌ Product not found");
      return;
    }

    setAddingToCart(true);

    try {
      const response = await fetch("http://localhost:8000/api/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          product_id: productId,
          quantity: quantity,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("✅ Product added to cart!", {
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      } else {
        toast.error("❌ Failed to add to cart: " + (data.message || "Unknown error"));
      }
    } catch (error) {
      console.error("🚨 Error adding to cart:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setAddingToCart(false);
    }
  };

  // const handleBuyNow = () => {
  //   toast.info("Redirecting to checkout...");
  //   navigate("/shipping-form");
  // };

  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (!product) return <div className="text-center py-10">Product not found.</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-2 gap-10">
      <div className="flex justify-center items-start">
        <img
          src={`http://localhost:8000/${product.image_url}`} // Adjust as needed
          alt={product.name}
          className="w-80 h-auto shadow-xl"
        />
      </div>

      <div>
        <h1 className="text-3xl font-bold">{product.name}</h1>
        <div className="flex items-center mt-2 space-x-2">
          <div className="text-yellow-500">★★★★☆</div>
          <span className="text-gray-600 text-sm">7 customer reviews</span>
          <span className="text-gray-800 font-semibold ml-4">Sold: {product.sold || 536}</span>
        </div>

        <div className="text-3xl text-red-700 font-bold mt-4">Rs {product.price}</div>

        <p className="mt-4 text-gray-700">{product.description}</p>

        <table className="w-full mt-6 text-left border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 border-b border-gray-200">Title</th>
              <th className="p-2 border-b border-gray-200">Description</th>
            </tr>
          </thead>
          <tbody>
            <tr><td className="p-2 border-b">Volume</td><td className="p-2 border-b">{product.volume || "650ml"}</td></tr>
            <tr><td className="p-2 border-b">Category</td><td className="p-2 border-b">{product.category?.category_name || "Beer / Domestic Beer"}</td></tr>
            <tr><td className="p-2 border-b">Country</td><td className="p-2 border-b">{product.country || "Nepal"}</td></tr>
            <tr><td className="p-2">Alcohol</td><td className="p-2">{product.alcohol_content || "6%"}</td></tr>
          </tbody>
        </table>

        <div className="flex items-center space-x-4 mt-6">
          <span className="font-semibold">Quantity</span>
          <div className="flex items-center border rounded px-3 py-1 space-x-3">
            <button onClick={decreaseQty} className="text-gray-600 hover:text-black">
              <FiMinus />
            </button>
            <span className="font-semibold">{quantity}</span>
            <button onClick={increaseQty} className="text-gray-600 hover:text-black">
              <FiPlus />
            </button>
          </div>
        </div>

        <div className="mt-6 flex space-x-4">
          <button
            onClick={() => handleAddToCart(product.id, quantity)}
            disabled={addingToCart}
            className={`${
              addingToCart
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-red-700 hover:bg-red-800"
            } text-white flex items-center gap-2 px-5 py-2 rounded`}
          >
            {addingToCart ? (
              <span className="animate-pulse">Adding...</span>
            ) : (
              <>
                <FiShoppingCart /> ADD TO CART
              </>
            )}
          </button>

          
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;

