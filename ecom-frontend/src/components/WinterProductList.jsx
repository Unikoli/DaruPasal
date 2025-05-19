// import { useEffect, useState } from "react";
// import Slider from "react-slick";
// import { productSliderSettings } from "./SliderSetting";
// import ProductCard from "./ProductCard"; // This is the actual card for each product

// export default function WinterProductList() {
//   const [products, setProducts] = useState([]);

//   useEffect(() => {
//     const fetchWinterProducts = async () => {
//       try {
//         const response = await fetch("http://localhost:8000/api/category/6/products"); // Replace 2 with actual Beer category ID
//         const data = await response.json();
//         setProducts(data);
//       } catch (error) {
//         console.error("Error fetching beer products:", error);
//       }
//     };

//     fetchWinterProducts();
//   }, []);

//   return (
//     <div className="relative px-8 py-6">
//       <Slider {...productSliderSettings}>
//         {products.map((product) => (
//           <div key={product.id} className="px-2">
//             <ProductCard
//               // image={product.image_url}
//               image={`http://localhost:8000/${product.image_url}`}
//               title={product.name}
//               price={product.price}
//               rating={product.rating || 4}
//               reviews={product.reviews_count || 20}
//               product={product}
//             />
//           </div>
//         ))}
//       </Slider>
//     </div>
//   );
// }
import { useEffect, useState } from "react";
import Slider from "react-slick";
import { productSliderSettings } from "./SliderSetting";
import ProductCard from "./ProductCard";
import config from "../config";

export default function WinterProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    const fetchWinterProducts = async () => {
      try {
        const response = await fetch(`${config.API_URL}/api/category/2/products`); // Category ID 6 for winter
        const data = await response.json();
        setProducts(data || []);
      } catch (error) {
        console.error("Error fetching winter products:", error);
      } finally {
        setLoading(false); // Stop loading regardless of outcome
      }
    };

    fetchWinterProducts();
  }, []);

  return (
    <div className="relative px-8 py-6">
      <h1 className="text-2xl font-bold mb-4 text-center">❄️ Winter Special</h1>

      {loading ? (
        <p className="text-center text-gray-500">Loading winter products...</p>
      ) : products.length === 0 ? (
        <p className="text-center text-gray-500">No winter products available at the moment.</p>
      ) : (
        <Slider {...productSliderSettings}>
          {products.map((product) => (
            <div key={product.id} className="px-2">
              <ProductCard
                image={`${config.API_URL}/${product.image_url}`}
                title={product.name}
                price={product.price}
                rating={product.rating || 4}
                reviews={product.reviews_count || 20}
                product={product}
              />
            </div>
          ))}
        </Slider>
      )}
    </div>
  );
}
