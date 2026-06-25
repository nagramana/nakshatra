import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  FaStar,
  FaShoppingCart,
  FaBolt,
  FaTruck,
  FaShieldAlt,
  FaUndo,
} from "react-icons/fa";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useCart } from "../context/CartContext";

import "../styles/ProductDetails.css";

const API_URL =
  "https://nakshatra-mart-backend.onrender.com";

function ProductDetails() {
  const { id } = useParams();

  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [qty, setQty] = useState(1);

  useEffect(() => {
    fetchProduct();
    fetchProducts();
  }, [id]);

  const fetchProduct = async () => {
    try {
      const res = await axios.get(
        `${API_URL}/api/products/${id}`
      );

      setProduct(res.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const fetchProducts = async () => {
    try {
      const res = await axios.get(
        `${API_URL}/api/products`
      );

      setProducts(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddToCart = () => {
    for (let i = 0; i < qty; i++) {
      addToCart(product);
    }

    alert("Added To Cart");
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="pd-loading">
          Loading Product...
        </div>
        <Footer />
      </>
    );
  }

  if (!product) {
    return (
      <>
        <Navbar />
        <div className="pd-loading">
          Product Not Found
        </div>
        <Footer />
      </>
    );
  }

  const similarProducts = products
    .filter((p) => p._id !== product._id)
    .slice(0, 8);

  const discountPrice =
    product.price +
    Math.floor(product.price * 0.2);

  return (
    <>
      <Navbar />

      <div className="product-details-page">

        {/* HERO SECTION */}

        <div className="pd-hero">

          {/* IMAGE */}

          <div className="pd-image-section">
            <div className="pd-image-card">
              <img
                src={product.image}
                alt={product.name}
              />
            </div>
          </div>

          {/* INFO */}

          <div className="pd-info-section">

            <span className="pd-category">
              {product.category}
            </span>

            <h1 className="pd-title">
              {product.name}
            </h1>

            <div className="pd-rating">
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />

              <span>
                4.8 (1,254 Reviews)
              </span>
            </div>

            <div className="pd-price-row">
              <h2>₹{product.price}</h2>

              <span className="old-price">
                ₹{discountPrice}
              </span>

              <span className="offer">
                20% OFF
              </span>
            </div>

            <p className="pd-description">
              {product.description ||
                "Premium quality product with fast delivery and easy returns."}
            </p>

            {/* TRUST */}

            <div className="pd-trust">

              <div className="trust-box">
                <FaTruck />
                <span>
                  Free Delivery
                </span>
              </div>

              <div className="trust-box">
                <FaUndo />
                <span>
                  Easy Return
                </span>
              </div>

              <div className="trust-box">
                <FaShieldAlt />
                <span>
                  Secure Payment
                </span>
              </div>

            </div>

            {/* QTY */}

            <div className="qty-wrapper">

              <button
                onClick={() =>
                  qty > 1 &&
                  setQty(qty - 1)
                }
              >
                -
              </button>

              <span>{qty}</span>

              <button
                onClick={() =>
                  setQty(qty + 1)
                }
              >
                +
              </button>

            </div>

            {/* BUTTONS */}

            <div className="pd-buttons">

              <button
                className="cart-btn"
                onClick={handleAddToCart}
              >
                <FaShoppingCart />
                Add To Cart
              </button>

              <button className="buy-btn">
                <FaBolt />
                Buy Now
              </button>

            </div>

          </div>

        </div>

        {/* DETAILS */}

        <div className="pd-details-card">

          <h2>
            Product Details
          </h2>

          <div className="detail-grid">

            <div>
              <strong>
                Category
              </strong>
              <p>
                {product.category ||
                  "General"}
              </p>
            </div>

            <div>
              <strong>
                Stock
              </strong>
              <p>
                {product.stock || 0}
              </p>
            </div>

            <div>
              <strong>
                Delivery
              </strong>
              <p>
                2-5 Days
              </p>
            </div>

            <div>
              <strong>
                Availability
              </strong>
              <p>
                In Stock
              </p>
            </div>

          </div>

        </div>

        {/* DESCRIPTION */}

        <div className="pd-description-card">

          <h2>
            Description
          </h2>

          <p>
            {product.description ||
              "No description available for this product."}
          </p>

        </div>

        {/* SIMILAR PRODUCTS */}

        <div className="similar-section">

          <h2>
            Similar Products
          </h2>

          <div className="similar-grid">

            {similarProducts.map(
              (item) => (
                <Link
                  key={item._id}
                  to={`/product/${item._id}`}
                  className="similar-card"
                >

                  <img
                    src={item.image}
                    alt={item.name}
                  />

                  <h4>
                    {item.name}
                  </h4>

                  <p>
                    ₹{item.price}
                  </p>

                </Link>
              )
            )}

          </div>

        </div>

      </div>

      <Footer />
    </>
  );
}

export default ProductDetails;