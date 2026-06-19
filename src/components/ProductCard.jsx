import "../styles/product.css";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

function ProductCard({ product }) {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product);

    alert(
      `${product.name} added to cart successfully`
    );
  };

  const gst = product.gst || 0;

  const gstAmount =
    (Number(product.price) * gst) / 100;

  const totalPrice =
    Number(product.price) + gstAmount;

  return (
    <div className="product-card">

      <div
        style={{
          position: "relative",
        }}
      >
        {product.discount && (
          <span className="discount-badge">
            {product.discount}
          </span>
        )}

        <img
          className="product-image"
          src={product.image}
          alt={product.name}
          onError={(e) => {
            e.target.src =
              "https://via.placeholder.com/300x220?text=No+Image";
          }}
        />
      </div>

      <div className="product-content">

        <h3 className="product-name">
          {product.name}
        </h3>

        <p>
          Category:{" "}
          {product.category || "General"}
        </p>

        <p>
          Price: ₹
          {Number(product.price).toFixed(
            2
          )}
        </p>

        <p>
          Stock: {product.stock}
        </p>

        <p>
          GST ({gst}%): ₹
          {gstAmount.toFixed(2)}
        </p>

        <h4
          style={{
            color: "#082A78",
            fontWeight: "700",
          }}
        >
          Total: ₹
          {totalPrice.toFixed(2)}
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
            to={`/product/${
              product._id || product.id
            }`}
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