

// import { useEffect, useState } from "react";
// import ProductCard from "./ProductCard";

// export default function ProductList() {
//   const [products, setProducts] = useState([]);

//   // useEffect(() => {
//   //   const fetchProducts = async () => {
//   //     try {
//   //       const response = await fetch("http://localhost:8000/api/products");
//   //       const data = await response.json();
//   //       setProducts(data);
//   //     } catch (error) {
//   //       console.error("Error fetching products:", error);
//   //     }
//   //   };

//   //   fetchProducts();
//   // }, []);
//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const response = await fetch("http://localhost:8000/api/products");
//         const data = await response.json();
//         console.log("Fetched products:", data); // 👈 Check this
//         setProducts(data);
//       } catch (error) {
//         console.error("Error fetching products:", error);
//       }
//     };
  
//     fetchProducts();
//   }, []);
  
//   return (
//     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
//       {products.map((product) => (
//         <ProductCard
//           key={product.id}
//           // image={product.image_url}
//           image={`http://localhost:8000/${product.image_url}`} // ✅ Here

//           title={product.name}
//           price={product.price}
//           rating={product.rating || 4}
//           reviews={product.reviews_count || 20}
//           product={product}
//         />
//       ))}
//     </div>
//   );
// }
import config from "../config";
import ProductCard from "./ProductCard";

export default function ProductList({ products = [] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {products.length === 0 ? (
        <p className="text-center text-gray-500 col-span-full">No matching products found.</p>
      ) : (
        products.map((product) => (
          <ProductCard
            key={product.id}
            image={`${config.API_URL}/${product.image_url}`}
            title={product.name}
            price={product.price}
            rating={product.rating || 4}
            reviews={product.reviews_count || 20}
            product={product}
          />
        ))
      )}
    </div>
  );
}
