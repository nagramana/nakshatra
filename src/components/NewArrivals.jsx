import { useEffect, useState, useRef } from "react";
import axios from "axios";
import ProductCard from "./ProductCard";
import "./NewArrivals.css";

const API_URL =
  "https://nakshatra-mart-backend.onrender.com";

function NewArrivals({
  selectedCategory = "All",
}) {

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

      const newProducts =
        res.data.filter(
          (product) =>
            product.newArrival === true
        );

      setProducts(newProducts);

    } catch (error) {

      console.log(error);

    }

  };

  const filteredProducts =
    selectedCategory === "All"

      ? products

      : products.filter(
          (product) =>

            product.category
              ?.toLowerCase() ===
            selectedCategory
              .toLowerCase()

            ||

            product.gender
              ?.toLowerCase() ===
            selectedCategory
              .toLowerCase()

        );

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

    <section
      id="new-arrivals"
      className="new-arrivals"
    >

      <div className="section-header">

        <h2>
          🆕 New Arrivals
        </h2>

      </div>

      <button
        className="slider-arrow left"
        onClick={slideLeft}
      >
        ‹
      </button>

      <div
        className="new-grid"
        ref={sliderRef}
      >

        {filteredProducts.length > 0 ? (

          filteredProducts.map(
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

        ) : (

          <div className="no-products">

            No Products Found

          </div>

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

export default NewArrivals;