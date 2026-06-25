import "./ProductCard.css";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { useLoading } from "../context/LoadingContext";
import { useState } from "react";

function ProductCard({ product }) {

const { addToCart } = useCart();

const navigate = useNavigate();

const {
setLoading
} = useLoading();

const [showToast, setShowToast] =
useState(false);

const handleAddToCart = () => {


addToCart(product);

setShowToast(true);

setTimeout(() => {

  setShowToast(false);

}, 2000);


};

const openProduct = () => {


setLoading(true);

setTimeout(() => {

  navigate(
    `/product/${product._id || product.id}`
  );

  setLoading(false);

}, 600);


};

const finalPrice =
product.discount > 0
? Math.floor(
product.price -
(product.price * product.discount) / 100
)
: product.price;

const imageUrl =
product?.images?.[0] ||
product?.image ||
null;

return (
<>
{showToast && (


    <div className="cart-toast">
      ✅ Product Added To Cart
    </div>

  )}

  <div className="product-card">

    {/* IMAGE */}

    <div className="product-image-wrapper">

      {product.discount > 0 && (

        <div className="sale-ribbon">
          {product.discount}% OFF
        </div>

      )}

      <button className="wishlist-btn">
        ♡
      </button>

      <div
        className="product-image-link"
        onClick={openProduct}
        style={{
          cursor: "pointer"
        }}
      >

        {imageUrl ? (

          <img
            src={imageUrl}
            alt={product.name}
            className="product-image"
            loading="lazy"
          />

        ) : (

          <div
            style={{
              height: "220px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "#f3f4f6",
              color: "#666",
              fontSize: "14px",
            }}
          >
            No Image
          </div>

        )}

      </div>

    </div>

    {/* CONTENT */}

    <div className="product-content">

      <h3 className="product-title">
        {product.name}
      </h3>

      <p className="product-category">
        {product.category}
      </p>

      <div className="product-price-row">

        <span className="current-price">
          ₹{finalPrice}
        </span>

        {product.discount > 0 && (

          <span className="old-price">
            ₹{product.price}
          </span>

        )}

      </div>

      <div className="rating-row">

        <span className="rating-badge">
          ⭐ {product.rating || "4.3"}
        </span>

        <span className="delivery-badge">
          Free Delivery
        </span>

      </div>

      <p
        className={
          product.stock > 0
            ? "stock-available"
            : "stock-unavailable"
        }
      >
        {product.stock > 0
          ? "✅ In Stock"
          : "❌ Out Of Stock"}
      </p>

      <p className="sold-count">
        120+ Sold Today
      </p>

      <div className="action-buttons">

        <button
          className="cart-btn"
          onClick={handleAddToCart}
          disabled={
            product.stock === 0
          }
        >
          {product.stock > 0
            ? "Add"
            : "Stock Out"}
        </button>

      </div>

    </div>

  </div>
</>


);

}

export default ProductCard;
