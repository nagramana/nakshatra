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

const API_URL = "http://localhost:5000";

function ProductDetails() {
  const { id } = useParams();

  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [qty, setQty] = useState(1);
  const [reviews, setReviews] = useState([]);
  const [showReviewModal, setShowReviewModal] = useState(false);

  const [rating, setRating] = useState(5);

  const [comment, setComment] = useState("");

  useEffect(() => {
    fetchProduct();

    fetchProducts();

    fetchReviews();
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



  const fetchReviews = async () => {

    try {

      const res = await axios.get(
        `${API_URL}/api/reviews/${id}`
      );

      setReviews(res.data);

    } catch (err) {

      console.log(err);

    }

  };



  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const submitReview = async () => {

    if (!user) {
      alert("Please login first.");
      return;
    }

    if (!comment.trim()) {
      alert("Please write your review.");
      return;
    }

    try {

      await axios.post(
        `${API_URL}/api/reviews`,
        {

          productId: id,

          userId: user._id,

          userName: user.name,

          userImage:
            user.profileImage || "",

          rating,

          comment,

        }
      );

      alert("Review Submitted Successfully");

      setComment("");

      setRating(5);

      setShowReviewModal(false);

      fetchReviews();

    } catch (err) {

  console.log("========== ERROR ==========");

  console.log(err);

  console.log("STATUS:", err.response?.status);

  console.log("DATA:", err.response?.data);

  console.log("REQUEST BODY:", {
    productId: id,
    userId: user?._id,
    userName: user?.name,
    userImage: user?.profileImage,
    rating,
    comment,
  });

  alert(
    err.response?.data?.message ||
    "Unable to Submit Review"
  );

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
                className="main-product-image"
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

            <div className="product-highlights">

              <span>✔ Premium Quality</span>

              <span>✔ Fast Delivery</span>

              <span>✔ Easy Returns</span>

              <span>✔ Secure Payment</span>

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

              <button
                className="buy-btn"
                onClick={() => {
                  handleAddToCart();
                  window.location.href = "/checkout";
                }}
              >
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

        {/* DESCRIPTION + REVIEWS */}

        <div className="review-wrapper">

          {/* LEFT SIDE */}

          <div className="rating-box">

            <h2>Description</h2>

            <p className="product-desc">
              {product.description ||
                "No description available for this product."}
            </p>

            <hr />

            <h2>Customer Rating</h2>

            <div className="rating-score">

              <h1>4.8</h1>

              <div>

                <span className="stars">
                  ★★★★★
                </span>

                <p>
                  1,254 Ratings
                </p>

              </div>

            </div>

            <div className="rating-bar">

              <label>5 ★</label>

              <progress
                value="90"
                max="100"
              ></progress>

            </div>

            <div className="rating-bar">

              <label>4 ★</label>

              <progress
                value="70"
                max="100"
              ></progress>

            </div>

            <div className="rating-bar">

              <label>3 ★</label>

              <progress
                value="35"
                max="100"
              ></progress>

            </div>

            <div className="rating-bar">

              <label>2 ★</label>

              <progress
                value="15"
                max="100"
              ></progress>

            </div>

            <div className="rating-bar">

              <label>1 ★</label>

              <progress
                value="5"
                max="100"
              ></progress>

            </div>

          </div>

          {/* RIGHT SIDE */}

          <div className="comments-box">

            <div className="review-header">

              <h2>
                Customer Reviews
              </h2>

              <button
                className="review-btn"
                onClick={() => setShowReviewModal(true)}
              >
                Write Review
              </button>

            </div>

            {/* Reviews */}

            {reviews.length === 0 ? (

              <div className="empty-review">

                No Reviews Yet

              </div>

            ) : (

              reviews
                .slice(0, 30)
                .map((review) => (

                  <div
                    key={review._id}
                    className="comment-card"
                  >

                    <div className="comment-header">

                      {review.userImage ? (

                        <img
                          src={review.userImage}
                          alt={review.userName}
                          className="review-avatar"
                        />

                      ) : (

                        <div className="avatar">

                          {review.userName
                            ?.charAt(0)
                            .toUpperCase()}

                        </div>

                      )}

                      <div>

                        <h4>
                          {review.userName}
                        </h4>

                        <span className="stars">
                          {"★".repeat(review.rating)}
                        </span>

                      </div>

                    </div>

                    <p>
                      {review.comment}
                    </p>

                  </div>

                ))

            )}

          </div>

        </div>

        {/* SIMILAR PRODUCTS */}

        <div className="similar-section">

          <h2>
            Similar Products
          </h2>

          <div className="similar-slider">

            {similarProducts.map((item) => (

              <Link
                key={item._id}
                to={`/product/${item._id}`}
                className="similar-card"
              >

                <div className="similar-image">

                  <img
                    src={item.image}
                    alt={item.name}
                  />

                </div>

                <div className="similar-content">

                  <h4>{item.name}</h4>

                  <p className="similar-price">
                    ₹{item.price}
                  </p>

                  <button>
                    View Product
                  </button>

                </div>

              </Link>

            ))}

          </div>

        </div>

      </div>


      <div className="mobile-buy-bar">

        <button
          className="mobile-cart-btn"
          onClick={handleAddToCart}
        >
          Add To Cart
        </button>

        <button
          className="mobile-buy-btn"
          onClick={() => {
            handleAddToCart();
            window.location.href = "/checkout";
          }}
        >
          Buy Now
        </button>

      </div>

      {showReviewModal && (

        <div
          className="review-modal"
          onClick={() =>
            setShowReviewModal(false)
          }
        >

          <div
            className="review-popup"
            onClick={(e) => e.stopPropagation()}
          >

            <h2>Write Review</h2>

            <div className="rating-select">

              <select
                value={rating}
                onChange={(e) => setRating(Number(e.target.value))}
              >

                <option value={5}>★★★★★</option>
                <option value={4}>★★★★☆</option>
                <option value={3}>★★★☆☆</option>
                <option value={2}>★★☆☆☆</option>
                <option value={1}>★☆☆☆☆</option>

              </select>

            </div>

            <textarea

              placeholder="Write your review..."

              value={comment}

              onChange={(e) => setComment(e.target.value)}

            />

            <div className="popup-buttons">

              <button
                className="cancel-btn"
                onClick={() => {
                  setShowReviewModal(false);
                  setComment("");
                  setRating(5);
                }}
              >
                Cancel
              </button>

              <button

                className="submit-btn"

                onClick={submitReview}

              >

                Submit Review

              </button>

            </div>

          </div>

        </div>

      )}
      <Footer />
    </>
  );
}

export default ProductDetails;