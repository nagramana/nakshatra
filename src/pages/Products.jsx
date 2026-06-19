import { useState, useEffect } from "react";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProductFilter from "../components/ProductFilter";



import { useCart } from "../context/CartContext";
import axios from "axios";

const API_URL =
  "https://nakshatra-mart-backend.onrender.com";


function Products() {
  const [allProducts, setAllProducts] =
  useState([]);

const [products, setProducts] =
  useState([]);

  const { addToCart } = useCart();

  useEffect(() => {
  fetchProducts();
}, []);

const fetchProducts = async () => {
  try {
    const response = await axios.get(
      `${API_URL}/api/products`
    );

    console.log(response.data);

    setAllProducts(response.data);
setProducts(response.data);
  } catch (error) {
    console.log(
      "Error fetching products",
      error
    );
  }
};

  return (
    <>
      <Navbar />

      <div className="container py-5">

        <h1
          style={{
            color: "#082A78",
            fontWeight: "700",
            marginBottom: "20px",
          }}
        >
          All Products
        </h1>

        <ProductFilter
  products={allProducts}
  onFilter={setProducts}
/>

        <div className="mb-3">
          <h5>
            Products Found:
            {products.length}
          </h5>
        </div>

        <div className="row">

          {products.map((product) => (
            <div
              key={product.id}
              className="col-lg-3 col-md-4 col-sm-6 mb-4"
            >
              <div className="card h-100 shadow-sm">

                <img
                  src={product.image}
                  alt={product.name}
                  className="card-img-top"
                  style={{
                    height: "220px",
                    objectFit: "cover",
                  }}
                />

                <div className="card-body">

                  {product.discount && (
  <span className="badge bg-success">
    {product.discount}
  </span>
)}

                  <h5 className="mt-2">
                    {product.name}
                  </h5>

                  <p className="text-muted">
                    {product.category}
                  </p>

                  <p>
  Stock: {product.stock}
</p>

                  <h6>
                    ₹{product.price}
                  </h6>

                  <p>
                    Stock:
                    {product.stock}
                  </p>

                  <button
                    className="btn btn-primary w-100"
                    onClick={() =>
                      addToCart(product)
                    }
                  >
                    Add To Cart
                  </button>

                </div>

              </div>
            </div>
          ))}

        </div>

      </div>

      <Footer />
    </>
  );
}

export default Products;