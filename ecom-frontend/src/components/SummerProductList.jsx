import { useEffect, useState } from "react";
import Slider from "react-slick";
import { productSliderSettings } from "./SliderSetting";
import ProductCard from "./ProductCard"; // This is the actual card for each product

export default function SummerProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchBeerProducts = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/category/1/products"); // Replace 2 with actual Beer category ID
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching beer products:", error);
      }
    };

    fetchBeerProducts();
  }, []);

  return (
    <div className="relative px-8 py-6">
      <Slider {...productSliderSettings}>
        {products.map((product) => (
          <div key={product.id} className="px-2">
            <ProductCard
              // image={product.image_url}
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
    </div>
  );
}
