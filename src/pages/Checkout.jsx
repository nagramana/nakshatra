import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useCart } from "../context/CartContext";
import { useOrders } from "../context/OrderContext";
import { useNavigate } from "react-router-dom";

function Checkout() {
  const navigate = useNavigate();

  const { cartItems, totalPrice, clearCart } = useCart();
  const { placeOrder } = useOrders();

  const [formData, setFormData] = useState({
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
      [e.target.name]: e.target.value,
    });
  };

  const totalGST = cartItems.reduce(
    (total, item) =>
      total +
      ((item.price * item.quantity) * item.gst) / 100,
    0
  );

  const grandTotal = totalPrice + totalGST;

  const handleOrder = () => {
    if (
      !formData.name ||
      !formData.phone ||
      !formData.address ||
      !formData.city ||
      !formData.state ||
      !formData.pincode
    ) {
      alert("Please fill all fields");
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

      <div className="container py-5">
        <h2 className="mb-4">Checkout</h2>

        <div className="row">
          {/* Customer Details */}
          <div className="col-md-8">
            <div className="card shadow-sm">
              <div className="card-body">
                <h4 className="mb-4">
                  Delivery Address
                </h4>

                <input
                  type="text"
                  className="form-control mb-3"
                  placeholder="Full Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                />

                <input
                  type="text"
                  className="form-control mb-3"
                  placeholder="Phone Number"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                />

                <textarea
                  className="form-control mb-3"
                  rows="3"
                  placeholder="Address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                />

                <input
                  type="text"
                  className="form-control mb-3"
                  placeholder="City"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                />

                <input
                  type="text"
                  className="form-control mb-3"
                  placeholder="State"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                />

                <input
                  type="text"
                  className="form-control"
                  placeholder="Pincode"
                  name="pincode"
                  value={formData.pincode}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="col-md-4">
            <div className="card shadow">
              <div className="card-body">
                <h4>Order Summary</h4>

                <hr />

                <p>
                  Products: {cartItems.length}
                </p>

                <p>
                  Product Total:
                  ₹{totalPrice.toFixed(2)}
                </p>

                <p>
                  GST Total:
                  ₹{totalGST.toFixed(2)}
                </p>

                <hr />

                <h5 className="text-primary">
                  Grand Total:
                  ₹{grandTotal.toFixed(2)}
                </h5>

                <hr />

                <p>Payment Method</p>

                <div className="alert alert-success">
                  Cash On Delivery (COD)
                </div>

                <button
                  className="btn btn-success w-100"
                  onClick={handleOrder}
                >
                  Place Order
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