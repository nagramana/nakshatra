import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

function Cart() {
  const {
    cartItems,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    totalPrice,
  } = useCart();

  const grandTotal = totalPrice;

  return (
    <>
      <Navbar />

      <div
        className="container py-4"
        style={{
          background: "#ffffff",
          minHeight: "100vh",
        }}
      >
        <h3
          className="fw-bold mb-4"
          style={{
            color: "#353543",
          }}
        >
          Cart ({cartItems.length})
        </h3>

        {cartItems.length === 0 ? (
          <div className="card border-0 shadow-sm text-center p-5">
            <h4>Your Cart Is Empty</h4>

            <p className="text-muted">
              Looks like you haven't added any products yet.
            </p>

            <Link
              to="/products"
              className="btn mt-3"
              style={{
                background: "#9f2089",
                color: "#fff",
              }}
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="row">

            {/* Cart Items */}

            <div className="col-lg-8">

              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="card border-0 shadow-sm mb-3"
                  style={{
                    borderRadius: "12px",
                  }}
                >
                  <div className="card-body">

                    <div className="row align-items-center">

                      {/* Image */}

                      <div className="col-md-2 col-4 text-center">

                        <img
                          src={item.image}
                          alt={item.name}
                          className="img-fluid rounded"
                          style={{
                            maxHeight: "140px",
                            objectFit: "cover",
                          }}
                        />

                      </div>

                      {/* Product Details */}

                      <div className="col-md-7 col-8">

                        <h5 className="fw-bold">
                          {item.name}
                        </h5>

                        <h4
                          className="fw-bold"
                          style={{
                            color: "#353543",
                          }}
                        >
                          ₹{item.price}
                        </h4>

                        <p className="text-success fw-semibold mb-1">
                          Free Delivery
                        </p>

                        <small className="text-muted">
                          7 Days Easy Return
                        </small>

                        <div className="d-flex align-items-center gap-2 mt-3">

                          <button
                            className="btn btn-outline-secondary btn-sm"
                            onClick={() =>
                              decreaseQuantity(item.id)
                            }
                          >
                            -
                          </button>

                          <span className="fw-bold">
                            {item.quantity}
                          </span>

                          <button
                            className="btn btn-sm"
                            style={{
                              background: "#9f2089",
                              color: "#fff",
                            }}
                            onClick={() =>
                              increaseQuantity(item.id)
                            }
                          >
                            +
                          </button>

                          <button
                            className="btn btn-outline-danger btn-sm ms-2"
                            onClick={() =>
                              removeFromCart(item.id)
                            }
                          >
                            Remove
                          </button>

                        </div>

                      </div>

                      {/* Price */}

                      <div className="col-md-3 text-md-end mt-3 mt-md-0">

                        <h4
                          className="fw-bold"
                          style={{
                            color: "#353543",
                          }}
                        >
                          ₹
                          {(
                            item.price *
                            item.quantity
                          ).toFixed(2)}
                        </h4>

                      </div>

                    </div>

                  </div>
                </div>
              ))}

            </div>

            {/* Price Details */}

            <div className="col-lg-4">

              <div
                className="card border-0 shadow-sm"
                style={{
                  borderRadius: "12px",
                  position: "sticky",
                  top: "90px",
                }}
              >
                <div className="card-body">

                  <h5
                    className="fw-bold mb-3"
                    style={{
                      color: "#353543",
                    }}
                  >
                    Price Details
                  </h5>

                  <hr />

                  <div className="d-flex justify-content-between mb-2">
                    <span>Total Products</span>
                    <strong>
                      {cartItems.length}
                    </strong>
                  </div>

                  <div className="d-flex justify-content-between mb-2">
                    <span>Product Total</span>

                    <strong>
                      ₹{totalPrice.toFixed(2)}
                    </strong>
                  </div>

                  <div className="d-flex justify-content-between mb-2">
                    <span>Delivery Charges</span>

                    <strong className="text-success">
                      FREE
                    </strong>
                  </div>

                  <hr />

                  <div className="d-flex justify-content-between">

                    <h5 className="fw-bold">
                      Order Total
                    </h5>

                    <h5
                      className="fw-bold"
                      style={{
                        color: "#9f2089",
                      }}
                    >
                      ₹{grandTotal.toFixed(2)}
                    </h5>

                  </div>

                  <div className="alert alert-light border mt-3">
                    🚚 Free Delivery
                    <br />
                    🔒 Secure Payments
                    <br />
                    ↩️ Easy Returns
                  </div>

                  <Link
                    to="/checkout"
                    className="btn w-100 mt-3"
                    style={{
                      background: "#9f2089",
                      color: "#fff",
                      fontWeight: "700",
                    }}
                  >
                    Continue
                  </Link>

                  <Link
                    to="/products"
                    className="btn btn-outline-secondary w-100 mt-2"
                  >
                    Add More Products
                  </Link>

                </div>
              </div>

            </div>

          </div>
        )}
      </div>

      <Footer />
    </>
  );
}

export default Cart;