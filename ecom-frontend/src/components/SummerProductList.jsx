
import { useEffect, useState } from "react";
import Slider from "react-slick";
import { productSliderSettings } from "./SliderSetting";
import ProductCard from "./ProductCard";

export default function SummerProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true); // loading state

  useEffect(() => {
    const fetchSummerProducts = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/category/2/products");
        const data = await response.json();
        setProducts(data || []);
      } catch (error) {
        console.error("Error fetching summer products:", error);
      } finally {
        setLoading(false); // done loading
      }
    };

    fetchSummerProducts();
  }, []);

  return (
    <div className="relative px-8 py-6">
      <h1 className="text-2xl font-bold mb-4 text-center">☀️ Summer Special</h1>

      {loading ? (
        <p className="text-center text-gray-500">Loading summer products...</p>
      ) : products.length === 0 ? (
        <p className="text-center text-gray-500">No summer products available at the moment.</p>
      ) : (
        <Slider {...productSliderSettings}>
          {products.map((product) => (
            <div key={product.id} className="px-2">
              <ProductCard
                image={`http://localhost:8000/${product.image_url}`}
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
