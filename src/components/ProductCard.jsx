import "../styles/product.css";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

function ProductCard({ product }) {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product);

    alert(`${product.name} added to cart successfully`);
  };

  const gstAmount =
    (product.price * product.gst) / 100;

  const totalPrice =
    product.price + gstAmount;

  return (
    <div className="product-card">

      <div style={{ position: "relative" }}>
        <span className="discount-badge">
          {product.discount}
        </span>

        <img
          className="product-image"
          src={product.image}
          alt={product.name}
        />
      </div>

      <div className="product-content">

        <h3 className="product-name">
          {product.name}
        </h3>

        <p>
          Base Price: ₹{product.price}
        </p>

        <p>
          GST ({product.gst}%):
          ₹{gstAmount.toFixed(2)}
        </p>

        <h4
          style={{
            color: "#082A78",
            fontWeight: "700",
          }}
        >
          Total: ₹{totalPrice.toFixed(2)}
        </h4>

        <div
          style={{
            display: "flex",
            gap: "10px",
            marginTop: "15px",
          }}
        >

          <button
            className="product-btn"
            onClick={handleAddToCart}
          >
            Add To Cart
          </button>

          <Link
            to={`/product/${product.id}`}
            className="btn btn-outline-primary"
          >
            View Details
          </Link>

        </div>

      </div>

    </div>
  );
}

export default ProductCard;