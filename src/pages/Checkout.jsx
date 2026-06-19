import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useCart } from "../context/CartContext";
import { useOrders } from "../context/OrderContext";
import { useNavigate } from "react-router-dom";

function Checkout() {
  const navigate = useNavigate();

  const {
    cartItems,
    totalPrice,
    clearCart,
  } = useCart();

  const { placeOrder } =
    useOrders();

  const [formData, setFormData] =
    useState({
      name: "",
      phone: "",
      address: "",
      city: "",
      state: "",
      pincode: "",
    });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  const grandTotal =
    totalPrice;

  const handleOrder = () => {
    if (
      !formData.name ||
      !formData.phone ||
      !formData.address ||
      !formData.city ||
      !formData.state ||
      !formData.pincode
    ) {
      alert(
        "Please fill all fields"
      );
      return;
    }

    const orderData = {
      id: "ORD" + Date.now(),
      date: new Date().toLocaleString(),
      status: "Pending",
      customer: formData,
      items: cartItems,
      total: grandTotal,
    };

    placeOrder(orderData);

    clearCart();

    alert(
      `Order Placed Successfully!\nOrder ID: ${orderData.id}`
    );

    navigate("/my-orders");
  };

  return (
    <>
      <Navbar />

      <div
        className="container py-5"
      >
        <h2
          className="mb-4 fw-bold"
          style={{
            color: "#082A78",
          }}
        >
          Checkout
        </h2>

        <div className="row">

          {/* Delivery Address */}

          <div className="col-lg-8">

            <div className="card shadow-sm border-0">

              <div className="card-body">

                <h3 className="mb-4">
                  Delivery Address
                </h3>

                <input
                  type="text"
                  className="form-control mb-3"
                  placeholder="Full Name"
                  name="name"
                  value={formData.name}
                  onChange={
                    handleChange
                  }
                />

                <input
                  type="text"
                  className="form-control mb-3"
                  placeholder="Phone Number"
                  name="phone"
                  value={formData.phone}
                  onChange={
                    handleChange
                  }
                />

                <textarea
                  className="form-control mb-3"
                  rows="4"
                  placeholder="Full Address"
                  name="address"
                  value={
                    formData.address
                  }
                  onChange={
                    handleChange
                  }
                />

                <input
                  type="text"
                  className="form-control mb-3"
                  placeholder="City"
                  name="city"
                  value={formData.city}
                  onChange={
                    handleChange
                  }
                />

                <input
                  type="text"
                  className="form-control mb-3"
                  placeholder="State"
                  name="state"
                  value={formData.state}
                  onChange={
                    handleChange
                  }
                />

                <input
                  type="text"
                  className="form-control"
                  placeholder="Pincode"
                  name="pincode"
                  value={
                    formData.pincode
                  }
                  onChange={
                    handleChange
                  }
                />

              </div>

            </div>

          </div>

          {/* Order Summary */}

          <div className="col-lg-4">

            <div className="card shadow border-0">

              <div className="card-body">

                <h3
                  style={{
                    fontWeight:
                      "700",
                  }}
                >
                  Order Summary
                </h3>

                <hr />

                <div className="d-flex justify-content-between mb-2">
                  <span>
                    Products
                  </span>

                  <strong>
                    {
                      cartItems.length
                    }
                  </strong>
                </div>

                <div className="d-flex justify-content-between mb-2">
                  <span>
                    Delivery
                  </span>

                  <strong
                    style={{
                      color:
                        "green",
                    }}
                  >
                    FREE
                  </strong>
                </div>

                <div className="d-flex justify-content-between mb-2">
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
                    Order Total
                  </h4>

                  <h4
                    style={{
                      color:
                        "#B12704",
                      fontWeight:
                        "700",
                    }}
                  >
                    ₹
                    {grandTotal.toFixed(
                      2
                    )}
                  </h4>

                </div>

                <hr />

                <h6 className="mb-3">
                  Payment Method
                </h6>

                <div className="alert alert-success">
                  Cash On Delivery
                  (COD)
                </div>

                <button
                  className="btn w-100"
                  style={{
                    background:
                      "#FFD814",
                    color:
                      "#111",
                    fontWeight:
                      "700",
                    border:
                      "1px solid #FCD200",
                  }}
                  onClick={
                    handleOrder
                  }
                >
                  Place Your Order
                </button>

              </div>

            </div>

          </div>

        </div>
      </div>

      <Footer />
    </>
  );
}

export default Checkout;