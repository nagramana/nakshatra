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

  return (
    <>
      <Navbar />

      <div className="container py-5">

        <h2
          className="fw-bold mb-4"
          style={{
            color: "#082A78",
          }}
        >
          Shopping Cart ({cartItems.length})
        </h2>

        {cartItems.length === 0 ? (
          <div
            className="text-center py-5"
            style={{
              background: "#fff",
              borderRadius: "15px",
              boxShadow:
                "0 5px 20px rgba(0,0,0,0.08)",
            }}
          >
            <h3>Your Cart Is Empty</h3>

            <Link
              to="/products"
              className="btn btn-primary mt-3"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="row">

            {/* Products Section */}

            <div className="col-lg-8">

              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="card mb-3 border-0 shadow-sm"
                >
                  <div className="card-body">

                    <div className="row align-items-center">

                      {/* Product Image */}

                      <div className="col-md-3 text-center">
                        <img
                          src={item.image}
                          alt={item.name}
                          style={{
                            width: "180px",
                            height: "180px",
                            objectFit: "contain",
                          }}
                        />
                      </div>

                      {/* Product Info */}

                      <div className="col-md-5">

                        <h4>{item.name}</h4>

                        <h5>
                          ₹{item.price}
                        </h5>

                        <p
                          style={{
                            color: "#16a34a",
                            fontWeight: "600",
                          }}
                        >
                          In Stock
                        </p>

                      </div>

                      {/* Quantity */}

                      <div className="col-md-2">

                        <div className="d-flex align-items-center">

                          <button
                            className="btn btn-outline-danger"
                            onClick={() =>
                              decreaseQuantity(
                                item.id
                              )
                            }
                          >
                            -
                          </button>

                          <span className="mx-3 fw-bold">
                            {item.quantity}
                          </span>

                          <button
                            className="btn btn-outline-success"
                            onClick={() =>
                              increaseQuantity(
                                item.id
                              )
                            }
                          >
                            +
                          </button>

                        </div>

                      </div>

                      {/* Total Price */}

                      <div className="col-md-2 text-end">

                        <h5>
                          ₹
                          {(
                            item.price *
                            item.quantity
                          ).toFixed(2)}
                        </h5>

                        <button
                          className="btn btn-danger btn-sm mt-2"
                          onClick={() =>
                            removeFromCart(
                              item.id
                            )
                          }
                        >
                          Remove
                        </button>

                      </div>

                    </div>

                  </div>
                </div>
              ))}

            </div>

            {/* Order Summary */}

            <div className="col-lg-4">

              <div className="card shadow border-0">

                <div className="card-body">

                  <h4
                    style={{
                      color: "#082A78",
                      fontWeight: "700",
                    }}
                  >
                    Order Summary
                  </h4>

                  <hr />

                  <div className="d-flex justify-content-between mb-2">
                    <span>
                      Total Products
                    </span>

                    <strong>
                      {cartItems.length}
                    </strong>
                  </div>

                  <div className="d-flex justify-content-between mb-2">
                    <span>
                      Delivery Charge
                    </span>

                    <strong>
                      Free
                    </strong>
                  </div>

                  <div className="d-flex justify-content-between mb-3">
                    <span>
                      Product Total
                    </span>

                    <strong>
                      ₹
                      {totalPrice.toFixed(
                        2
                      )}
                    </strong>
                  </div>

                  <hr />

                  <div className="d-flex justify-content-between">

                    <h4>
                      Grand Total
                    </h4>

                    <h4
                      style={{
                        color: "#082A78",
                      }}
                    >
                      ₹
                      {totalPrice.toFixed(
                        2
                      )}
                    </h4>

                  </div>

                  <Link
                    to="/checkout"
                    className="btn btn-success w-100 mt-3"
                  >
                    Proceed To Checkout
                  </Link>

                  <Link
                    to="/products"
                    className="btn btn-outline-primary w-100 mt-2"
                  >
                    Continue Shopping
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