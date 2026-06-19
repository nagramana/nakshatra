import { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "./ProductCard";

function FeaturedProducts() {
  const [products, setProducts] =
    useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response =
        await axios.get(
          "https://nakshatra-mart-backend.onrender.com/api/products"
        );

      setProducts(response.data);
    } catch (error) {
      console.log(
        "Error fetching products",
        error
      );
    }
  };

  return (
    <div className="row">
      {products.map((product) => (
        <div
          key={product._id}
          className="col-lg-4 col-md-6 mb-4"
        >
          <ProductCard product={product} />
        </div>
      ))}
    </div>
  );
}

export default FeaturedProducts;