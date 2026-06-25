import { useEffect, useState, useRef } from "react";
import axios from "axios";
import ProductCard from "./ProductCard";
import "./TrendingProducts.css";

const API_URL =
  "https://nakshatra-mart-backend.onrender.com";

function TrendingProducts() {

  const [products, setProducts] =
    useState([]);

  const sliderRef = useRef(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {

    try {

      const res = await axios.get(
        `${API_URL}/api/products`
      );

      console.log(
        "ALL PRODUCTS:",
        res.data
      );

      const trending =
        res.data.filter(
          (item) =>
            item.showInTrending === true
        );

      console.log(
        "TRENDING PRODUCTS:",
        trending
      );

      setProducts(trending);

    } catch (err) {

      console.log(err);

    }

  };

  const slideLeft = () => {

    sliderRef.current?.scrollBy({
      left: -300,
      behavior: "smooth",
    });

  };

  const slideRight = () => {

    sliderRef.current?.scrollBy({
      left: 300,
      behavior: "smooth",
    });

  };

  return (

    <section className="trending-products">

      <div className="section-header">

        <h2>
          Trending Products
        </h2>

      </div>

      <button
        className="slider-arrow left"
        onClick={slideLeft}
      >
        ‹
      </button>

      <div
        className="trending-grid"
        ref={sliderRef}
      >

        {products.length === 0 ? (

          <h3 className="empty-products">
            No Products Found
          </h3>

        ) : (

          products.map(
            (product) => (

              <ProductCard
                key={
                  product._id ||
                  product.id
                }
                product={product}
              />

            )
          )

        )}

      </div>

      <button
        className="slider-arrow right"
        onClick={slideRight}
      >
        ›
      </button>

    </section>

  );

}

export default TrendingProducts;