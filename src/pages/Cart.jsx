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

  const totalGST = cartItems.reduce(
    (total, item) =>
      total +
      ((item.price * item.quantity) * item.gst) / 100,
    0
  );

  const grandTotal = totalPrice + totalGST;

  return (
    <>
      <Navbar />

      <div className="container py-5">
        <h2 className="mb-4">
          My Cart ({cartItems.length})
        </h2>

        {cartItems.length === 0 ? (
          <div className="text-center py-5">
            <h4>Cart is Empty</h4>

            <Link
              to="/products"
              className="btn btn-primary mt-3"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <>
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="card mb-3 shadow-sm"
              >
                <div className="card-body">
                  <div className="row align-items-center">

                    <div className="col-md-2">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="img-fluid rounded"
                      />
                    </div>

                    <div className="col-md-4">
                      <h5>{item.name}</h5>

                      <p>
                        Price: ₹{item.price}
                      </p>

                      <p>
                        GST: {item.gst}%
                      </p>
                    </div>

                    <div className="col-md-3">
                      <div className="d-flex align-items-center">

                        <button
                          className="btn btn-outline-danger"
                          onClick={() =>
                            decreaseQuantity(item.id)
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
                            increaseQuantity(item.id)
                          }
                        >
                          +
                        </button>

                      </div>
                    </div>

                    <div className="col-md-3 text-end">

                      <h6>
                        ₹
                        {(
                          item.price *
                          item.quantity
                        ).toFixed(2)}
                      </h6>

                      <button
                        className="btn btn-danger btn-sm mt-2"
                        onClick={() =>
                          removeFromCart(item.id)
                        }
                      >
                        Remove
                      </button>

                    </div>

                  </div>
                </div>
              </div>
            ))}

            <div className="card mt-4 shadow">
              <div className="card-body">

                <h5>
                  Product Total :
                  ₹{totalPrice.toFixed(2)}
                </h5>

                <h5>
                  GST Total :
                  ₹{totalGST.toFixed(2)}
                </h5>

                <hr />

                <h3 className="text-primary">
                  Grand Total :
                  ₹{grandTotal.toFixed(2)}
                </h3>

                <div className="mt-3">

                  <Link
                    to="/products"
                    className="btn btn-outline-primary me-2"
                  >
                    Continue Shopping
                  </Link>

                  <Link
                    to="/checkout"
                    className="btn btn-success"
                  >
                    Proceed To Checkout
                  </Link>

                </div>

              </div>
            </div>
          </>
        )}
      </div>

      <Footer />
    </>
  );
}

export default Cart;