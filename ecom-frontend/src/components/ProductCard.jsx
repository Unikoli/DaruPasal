
// // import { FiHeart, FiMinus, FiPlus, FiShoppingCart } from "react-icons/fi"


// // import { useEffect, useState } from "react";
// // import { data } from "react-router-dom";
// // import { useNavigate } from "react-router-dom";



// // export default function ProductCard({ image, title, price, rating, reviews, product }) {


// //   const navigate = useNavigate();

// //   // const handleAddToCart = async () => {
// //   //   try {
// //   //     const response = await fetch("http://localhost:8000/api/cart", {
// //   //       method: "POST",
// //   //       headers: {
// //   //         "Content-Type": "application/json",
// //   //         // include credentials if needed (for sessions/cookies)
// //   //         // 'Authorization': `Bearer ${token}` if using token auth
// //   //         // credentials: "include", 
// //   //       },
// //   //       // credentials: "include", // ✅ Send cookies (required for Sanctum)

// //   //       body: JSON.stringify({
// //   //         product_id: product.id,
// //   //         quantity: qty
// //   //       })
// //   //     });

// //   //     const data = await response.json();

// //   //     if (response.ok) {
// //   //       console.log("Added to cart:", data);
// //   //       navigate("/cart"); // ✅ redirect to cart page
// //   //     } else {
// //   //       alert("Failed to add to cart: " + data.message);
// //   //     }
// //   //   } catch (error) {
// //   //     console.error("Error adding to cart:", error);
// //   //     alert("Something went wrong.");
// //   //   }
// //   // };
// //   // const handleAddToCart = async () => {
// //   //   try {
// //   //     const response = await fetch("http://localhost:8000/api/cart", {
// //   //       method: "POST",
// //   //       headers: {
// //   //         "Content-Type": "application/json",
// //   //       },
// //   //       credentials: "include", // important for cookies/session
// //   //       body: JSON.stringify({
// //   //         product_id: product.id,
// //   //         quantity: qty,
// //   //       }),
// //   //     });
  
// //   //     const text = await response.text(); // get raw response
// //   //     let data;
// //   //     try {
// //   //       data = JSON.parse(text);
// //   //     } catch (err) {
// //   //       throw new Error("Invalid JSON response: " + text); // log HTML if failed
// //   //     }
  
// //   //     if (response.ok) {
// //   //       console.log("Added to cart:", data);
// //   //       navigate("/cart");
// //   //     } else {
// //   //       alert("Failed to add to cart: " + data.message);
// //   //     }
// //   //   } catch (error) {
// //   //     console.error("Error adding to cart:", error);
// //   //     alert("Something went wrong.");
// //   //   }
// //   // };
  
// //   // const handleAddToCart = async () => {
// //   //   try {
// //   //     const token = localStorage.getItem("token");
  
// //   //     if (!token) {
// //   //       alert("You must be logged in to add items to your cart.");
// //   //       return;
// //   //     }
  
// //   //     const response = await fetch("http://localhost:8000/api/cart", {
        
// //   //       method: "POST",
// //   //       headers: {
// //   //         "Content-Type": "application/json",
// //   //         "Authorization": `Bearer ${token}`,
// //   //       },
// //   //       body: JSON.stringify({
// //   //         product_id: product.id,
// //   //         quantity: qty,
// //   //       }),
// //   //     });
  
// //   //     const data = await response.json();
  
// //   //     if (response.ok) {
// //   //       console.log("Added to cart:", data);
// //   //       navigate("/cart");
// //   //     } else {
// //   //       alert("Failed to add to cart: " + data.message);
// //   //     }
// //   //   } catch (error) {
// //   //     console.error("Error adding to cart:", error);
// //   //     alert("Something went wrong.");
// //   //   }
// //   // };
// // // const [id,setId]=useState();
// //   const handleAddToCart = async (id,qty) => {

// //     const token = localStorage.getItem("token");

// //     if (!token ) {
// //       alert("Login required or product not found");
// //       return;
// //     }
// //     if (!id) {
// //       alert(" product not found");
// //       return;
// //     }

// //     try {
// //       const response = await fetch("http://localhost:8000/api/cart", {
// //         method: "POST",
// //         headers: {
// //           "Content-Type": "application/json",
// //           Authorization: `Bearer ${token}`,
// //         },
// //         body: JSON.stringify({
// //           product_id: id,
// //           quantity: qty,
// //         }),
// //       });

// //       const data = await response.json();

// //       if (response.ok) {
// //         console.log("Added to cart:", data);
// //         navigate("/cart");
// //       } else {
// //         alert("Failed to add to cart: " + data.message);
// //       }
// //     } catch (error) {
// //       console.error("Error adding to cart:", error);
// //       alert("Something went wrong.");
// //     }
// //   };

 
// //   const [qty, setQty] = useState(1)
// //   useEffect(() => {
// //     console.log("products are!!", price)
// //   })
// //   return (
// //     <div className="bg-white rounded-xl shadow-md p-4 w-full max-w-xs transition-transform duration-300 hover:-translate-y-2 hover:shadow-lg relative">
// //       {/* Product Image */}
// //       <img src={image || "/default-image.jpg"} alt={title} className="w-full h-60 object-contain mb-4" />

// //       {/* Product Details */}
// //       <h2 className="text-md font-medium text-gray-800">{title}</h2>
// //       <p className="text-lg font-bold text-red-600 mt-1">Rs{price}</p>

// //       {/* Rating */}
// //       <div className="flex items-center space-x-1 text-yellow-500 mt-1">
// //         {[...Array(5)].map((_, index) => (
// //           <span key={index}>{index < rating ? "★" : "☆"}</span>
// //         ))}
// //         <span className="text-gray-500 text-sm">({reviews})</span>
// //       </div>
// //       {/* Quantity + Cart */}
// //       <div className="mt-4 flex items-center justify-between space-x-2">
// //         <div className="flex items-center border rounded px-2">
// //           <button
// //             onClick={() => setQty(Math.max(1, qty - 1))}
// //             className="p-1 hover:text-red-500 transition"
// //           >
// //             <FiMinus />
// //           </button>
// //           <span className="px-2">{qty}</span>
// //           <button
// //             onClick={() => setQty(qty + 1)}
// //             className="p-1 hover:text-green-500 transition"
// //           >
// //             <FiPlus />
// //           </button>
// //         </div>

// //         {/* <button className="flex items-center bg-red-600 hover:bg-red-700 text-white text-sm font-semibold px-4 py-2 rounded-full transition-all duration-300">
// //           <FiShoppingCart className="mr-2" />
// //           ADD TO CART
// //         </button> */}
// //         <button
// //           onClick={handleAddToCart}
// //           className="flex items-center bg-red-600 hover:bg-red-700 text-white text-sm font-semibold px-4 py-2 rounded-full transition-all duration-300"
// //         >
// //           <FiShoppingCart className="mr-2" />
// //           ADD TO CART
// //         </button>

// //       </div>
// //     </div>
// //   );
// // }
// import { FiMinus, FiPlus, FiShoppingCart } from "react-icons/fi";
// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";

// export default function ProductCard({ image, title, price, rating, reviews, product }) {
//   const navigate = useNavigate();
//   const [qty, setQty] = useState(1);
//   const [message,setMessage]=useState(" ");

//   const handleAddToCart = async (productId, quantity) => {
//     const token = localStorage.getItem("token");

//     if (!token) {
//       alert("Login required");
//       return;
//     }

//     if (!productId) {
//       alert("Product not found");
//       return;
//     }

//     try {
//       const response = await fetch("http://localhost:8000/api/cart", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({
//           product_id: productId,
//           quantity: quantity,
//         }),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         console.log("✅ Added to cart:", data);
        
//         // navigate("/cart");
//       } else {
//         alert("❌ Failed to add to cart: " + (data.message || "Unknown error"));
//       }
//     } catch (error) {
//       console.error("🚨 Error adding to cart:", error);
//       alert("Something went wrong.");
//     }
//   };

//   useEffect(() => {
//     console.log("🔍 Loaded product:", product);
//   }, [product]);

//   return (
//     <div className="bg-white rounded-xl shadow-md p-4 w-full max-w-xs transition-transform duration-300 hover:-translate-y-2 hover:shadow-lg relative">
//       {/* Product Image */}
//       <img
//         src={image || "/default-image.jpg"}
//         alt={title}
//         className="w-full h-60 object-contain mb-4"
//       />

//       {/* Product Details */}
//       <h2 className="text-md font-medium text-gray-800">{title}</h2>
//       <p className="text-lg font-bold text-red-600 mt-1">Rs {price}</p>

//       {/* Rating */}
//       <div className="flex items-center space-x-1 text-yellow-500 mt-1">
//         {[...Array(5)].map((_, index) => (
//           <span key={index}>{index < rating ? "★" : "☆"}</span>
//         ))}
//         <span className="text-gray-500 text-sm">({reviews})</span>
//       </div>

//       {/* Quantity + Add to Cart */}
//       <div className="mt-4 flex items-center justify-between space-x-2">
//         <div className="flex items-center border rounded px-2">
//           <button
//             onClick={() => setQty(Math.max(1, qty - 1))}
//             className="p-1 hover:text-red-500 transition"
//           >
//             <FiMinus />
//           </button>
//           <span className="px-2">{qty}</span>
//           <button
//             onClick={() => setQty(qty + 1)}
//             className="p-1 hover:text-green-500 transition"
//           >
//             <FiPlus />
//           </button>
//         </div>

//         <button
//           onClick={() => handleAddToCart(product.id, qty)} // ✅ Correct function usage
//           className="flex items-center bg-red-600 hover:bg-red-700 text-white text-sm font-semibold px-4 py-2 rounded-full transition-all duration-300"
//         >
//           <FiShoppingCart className="mr-2" />
//           ADD TO CART
//         </button>
//       </div>
//     </div>
//   );
// }
import { FiMinus, FiPlus, FiShoppingCart } from "react-icons/fi";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify"; // Importing toastify for toast notifications
import "react-toastify/dist/ReactToastify.css"; // Importing styles for toastify
import config from "../config";

export default function ProductCard({ image, title, price, rating, reviews, product }) {
  const navigate = useNavigate();
  const [qty, setQty] = useState(1);

  // Early return if product is not defined
  if (!product) {
    return <div className="text-center text-gray-500">Product data not available</div>;
  }

  const handleAddToCart = async (productId, quantity) => {
    const token = localStorage.getItem("token");

    if (!token) {
      toast.error('please login to continue');
      return;
    }

    if (!productId) {
      alert("Product not found");
      return;
    }

    try {
      const response = await fetch(`${config.API_URL}/api/cart`, {
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
        // Success Message in Console
        console.log("✅ Product successfully added to cart:", data);

        // Success Message Popup (Toast)
        toast.success("✅ Product added to cart successfully!", {
          // position: toast.POSITION.TOP_CENTER,
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });

        // Redirect to cart
        // navigate("/cart");
      } else {
        alert("❌ Failed to add to cart: " + (data.message || "Unknown error"));
      }
    } catch (error) {
      console.error("🚨 Error adding to cart:", error);
      alert("Something went wrong.");
    }
  };
  

  useEffect(() => {
    console.log("🔍 Loaded product:", product);
  }, [product]);

  return (
    <div className="bg-white rounded-xl shadow-md p-4 w-full max-w-xs transition-transform duration-300 hover:-translate-y-2 hover:shadow-lg relative">
      {/* Product Image */}
     
      <Link to={`/product/${product.id}`}>
      <img
        src={image || "/default-image.jpg"}
        alt={title}
        className="w-full h-60 object-contain mb-4 cursor-pointer"
      />
      </Link>

      {/* Product Details */}
      <h2 className="text-md font-medium text-gray-800">{title}</h2>
      <p className="text-lg font-bold text-red-600 mt-1">Rs {price}</p>

      {/* Rating */}
      <div className="flex items-center space-x-1 text-yellow-500 mt-1">
        {[...Array(5)].map((_, index) => (
          <span key={index}>{index < rating ? "★" : "☆"}</span>
        ))}
        <span className="text-gray-500 text-sm">({reviews})</span>
      </div>

      {/* Quantity + Add to Cart */}
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

        <button
          onClick={() => handleAddToCart(product.id, qty)}
          disabled={!product?.id}
          className={`flex items-center text-white text-sm font-semibold px-4 py-2 rounded-full transition-all duration-300 ${
            product?.id
              ? "bg-red-600 hover:bg-red-700"
              : "bg-gray-400 cursor-not-allowed"
          }`}
        >
          <FiShoppingCart className="mr-2" />
          ADD TO CART
        </button>
      </div>
    </div>
  );
}
