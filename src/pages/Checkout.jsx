import { useState, useRef, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useCart } from "../context/CartContext";
import { useOrders } from "../context/OrderContext";
import {
  useNavigate,
  useLocation,
} from "react-router-dom";
import "../styles/checkout.css";
import { FaTruck } from "react-icons/fa";
import { FaStore } from "react-icons/fa";


function Checkout() {
  const navigate = useNavigate();

  const location =
    useLocation();

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

  const [showPayment, setShowPayment] = useState(false);

  const paymentRef = useRef(null);

  const [paymentMethod,
    setPaymentMethod] =
    useState("Cash On Delivery");



  const [urlError,
    setUrlError] =
    useState("");
  const [transactionId,
    setTransactionId] =
    useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  const grandTotal =
    totalPrice;


  useEffect(() => {

    if (grandTotal > 200) {

      setPaymentMethod("UPI");

    } else {

      setPaymentMethod("Cash On Delivery");

    }

  }, [grandTotal]);

  const handleOrder = async () => {
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


    //     if (
    //   paymentMethod === "UPI"
    // ) {

    //   if (
    //     !transactionId.trim()
    //   ) {
    //     setUrlError(
    //       "Please enter payment proof URL"
    //     );

    //     return;
    //   }

    //   const urlPattern =
    //     /^https?:\/\/.+/;

    //   if (
    //     !urlPattern.test(
    //       transactionId
    //     )
    //   ) {
    //     setUrlError(
    //       "Please enter correct URL"
    //     );

    //     return;
    //   }

    //   setUrlError("");
    // }

    if (
      paymentMethod === "UPI"
    ) {

      if (
        !transactionId.trim()
      ) {

        setUrlError(
          "Please enter UTR / Transaction ID"
        );

        return;
      }

      if (
        transactionId.length < 8
      ) {

        setUrlError(
          "UTR / Transaction ID must be at least 8 characters"
        );

        return;
      }

      setUrlError("");
    }
    const orderData = {
  id: "ORD" + Date.now(),

  customer: {
    name: formData.name,
    phone: formData.phone,
    address: formData.address,
    city: formData.city,
    state: formData.state,
    pincode: formData.pincode,
  },

  items: cartItems,

  total: totalPrice,

  // ==========================
  // PAYMENT
  // ==========================

  paymentMethod: paymentMethod,

  paymentStatus:
    paymentMethod === "UPI"
      ? "Pending Verification"
      : "Paid",

  utrNumber:
    paymentMethod === "UPI"
      ? transactionId
      : "",

  paymentVerifiedBy: "",

  paymentVerifiedAt: null,

  rejectionReason: "",

  paymentLogs: [],

  // ==========================
// ORDER STATUS
// ==========================

orderStatus:
  paymentMethod === "UPI"
    ? "Pending"
    : "Ordered",

progress: 25,

trackingSteps: [
  "Pending",
  "Ordered",
  "Processing",
  "Shipped",
  "Out for Delivery",
  "Delivered",
],

  createdAt: new Date(),
};
   


try {

  await placeOrder(orderData);

  clearCart();

  alert(
    `Order Placed Successfully!\nOrder ID: ${orderData.id}`
  );

  navigate("/my-orders", {
    state: {
      success: true
    }
  });

} catch (error) {

  console.error("Checkout Error:", error);

  if (error.response?.data?.message) {

    setUrlError(error.response.data.message);

    return;

  }

  if (error.message) {

    setUrlError(error.message);

    return;

  }

  setUrlError("Unable to place order. Please try again.");

}
};

  return (
    <>
      <Navbar />

      <div
        className="container py-5"
      >
        {/* <h2
          className="mb-4 fw-bold"
          style={{
            color: "#082A78",
          }}
        >
          Checkout
        </h2> */}



        <div className="card border-0 shadow-sm mb-4">
          <div className="card-body">

            <div className="d-flex justify-content-between align-items-center">

              <div className="text-center">
                <div
                  style={{
                    width: "40px",
                    height: "40px",
                    background: "#9f2089",
                    color: "#fff",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "auto",
                    fontWeight: "700"
                  }}
                >
                  1
                </div>

                <small>Address</small>
              </div>

              <div
                style={{
                  flex: 1,
                  height: "3px",
                  background: "#9f2089",
                  margin: "0 10px"
                }}
              />

              <div className="text-center">
                <div
                  style={{
                    width: "40px",
                    height: "40px",
                    background: "#9f2089",
                    color: "#fff",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "auto",
                    fontWeight: "700"
                  }}
                >
                  2
                </div>

                <small>Review</small>
              </div>

              <div
                style={{
                  flex: 1,
                  height: "3px",
                  background: showPayment ? "#9f2089" : "#e5e7eb",
                  margin: "0 10px",
                  transition: "0.3s"
                }}
              />

              <div className="text-center">
                <div
                  style={{
                    width: "40px",
                    height: "40px",
                    background: showPayment ? "#9f2089" : "#e5e7eb",
                    color: showPayment ? "#fff" : "#000",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "auto",
                    fontWeight: "700",
                    transition: "0.3s"
                  }}
                >
                  3
                </div>

                <small>Payment</small>
              </div>

            </div>

          </div>
        </div>

        <div className="row g-4">

          {/* LEFT SIDE */}

          <div className="col-12 col-lg-8 checkout-left">

            {/* Delivery Address */}

            <div className="card shadow-sm border-0">

              <div className="card-body">

                <h4
                  className="fw-bold mb-4"
                  style={{ color: "#353543" }}
                >
                  Delivery Address
                </h4>

                <input
                  type="text"
                  className="form-control py-3 mb-3"
                  placeholder="Full Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                />

                <input
                  type="text"
                  className="form-control py-3 mb-3"
                  placeholder="Phone Number"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                />

                <textarea
                  className="form-control py-3 mb-3"
                  rows="4"
                  placeholder="Full Address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                />

                <input
                  type="text"
                  className="form-control py-3 mb-3"
                  placeholder="City"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                />

                <input
                  type="text"
                  className="form-control py-3 mb-3"
                  placeholder="State"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                />

                <input
                  type="text"
                  className="form-control py-3"
                  placeholder="Pincode"
                  name="pincode"
                  value={formData.pincode}
                  onChange={handleChange}
                />


              </div>

            </div>

          </div>

          <div className="col-12 col-lg-4 checkout-right">

            <div
              className="card shadow border-0"
              style={{
                position: "sticky",
                top: "90px",
              }}
            >

              <div className="card-body">

                <h4
                  className="fw-bold mb-4"
                  style={{ color: "#353543" }}
                >
                  Product Details
                </h4>

                <div className="product-scroll">

                  {cartItems.map((item) => (

                    <div
                      key={item.id}
                      className="meesho-product-card"
                    >

                      <div className="delivery-header">

                        <FaTruck
                          style={{
                            marginRight: "8px",
                            color: "#666"
                          }}
                        />

                        Estimated Delivery in 3-5 Days

                      </div>

                      <div className="product-row">

                        <img
                          src={item.image}
                          className="checkout-product-image"
                          alt={item.name}
                        />

                        <div className="product-info">

                          <h5>{item.name}</h5>

                          <p className="qty">
                            Qty : {item.quantity}
                          </p>

                          <h4 className="price">
                            ₹{item.price}
                          </h4>

                          <p className="free-delivery">
                            Free Delivery
                          </p>

                        </div>

                      </div>

                      <div className="seller-row">

                        <FaStore
                          style={{
                            marginRight: "8px",
                            color: "#666"
                          }}
                        />

                        Sold By : Nakshatra Mart

                      </div>

                    </div>

                  ))}

                </div>
              </div>   {/* End Product Details card-body */}
              <hr />


              <div className="card-body">

                <h4
                  className="fw-bold"
                  style={{ color: "#353543" }}
                >
                  Price Details
                </h4>

                <hr />

                <div className="d-flex justify-content-between mb-2">
                  <span>Products</span>
                  <strong>{cartItems.length}</strong>
                </div>

                <div className="d-flex justify-content-between mb-2">
                  <span>Discount</span>
                  <strong style={{ color: "#16a34a" }}>
                    ₹0
                  </strong>
                </div>

                <div className="d-flex justify-content-between mb-2">
                  <span>Delivery</span>
                  <strong style={{ color: "green" }}>
                    FREE
                  </strong>
                </div>

                <div className="d-flex justify-content-between mb-2">
                  <span>Product Total</span>
                  <strong>
                    ₹{totalPrice.toFixed(2)}
                  </strong>
                </div>

                <hr />

                <div className="d-flex justify-content-between align-items-center">

                  <h4>Order Total</h4>

                  <h4
                    style={{
                      color: "#9f2089",
                      fontWeight: "700",
                    }}
                  >
                    ₹{grandTotal.toFixed(2)}
                  </h4>

                </div>

                <div className="alert alert-success mt-3">
                  You Saved ₹0 on this order
                </div>

                <hr />

                {/* <h5
                  className="fw-bold mb-3"
                  style={{ color: "#353543" }}
                >
                  Payment Method
                </h5> */}

                {/* COD */}

                {/* <div className="border rounded p-3 mb-3">

                  <input
                    className="form-check-input"
                    type="radio"
                    name="paymentMethod"
                    checked={
                      paymentMethod ===
                      "Cash On Delivery"
                    }
                    onChange={() =>
                      setPaymentMethod(
                        "Cash On Delivery"
                      )
                    }
                  />

                  <label className="form-check-label ms-2">
                    Cash On Delivery (COD)
                  </label>

                </div> */}

                {/* UPI */}

                {/* <div className="border rounded p-3 mb-3">

                  <input
                    className="form-check-input"
                    type="radio"
                    name="paymentMethod"
                    checked={
                      paymentMethod === "UPI"
                    }
                    onChange={() =>
                      setPaymentMethod("UPI")
                    }
                  />

                  <label className="form-check-label ms-2">
                    UPI Payment
                  </label>

                </div> */}

                {/* {paymentMethod === "UPI" && (

                  <div className="border rounded p-3 mb-3">

                    <h6 className="fw-bold">
                      Scan QR Code
                    </h6>

                    <img
                      src="https://res.cloudinary.com/dzosvvlib/image/upload/v1781962618/WhatsApp_Image_2026-06-20_at_7.05.23_PM_seyhbz.jpg"
                      alt="QR"
                      style={{
                        width: "220px",
                        display: "block",
                        margin: "auto",
                      }}
                    />

                    <input
                      type="text"
                      className="form-control mt-3"
                      placeholder="Enter UTR Number"
                      value={transactionId}
                      onChange={(e) =>
                        setTransactionId(
                          e.target.value
                        )
                      }
                    />

                  </div>

                )} */}

                <button
                  className="checkout-btn"
                  onClick={() => {

                    setShowPayment(true);

                    setTimeout(() => {

                      paymentRef.current?.scrollIntoView({

                        behavior: "smooth",

                        block: "start"

                      });

                    }, 100);

                  }}
                >
                  Proceed To Payment
                </button>


                {showPayment && (

                  <div
                    ref={paymentRef}
                    className="mt-4"
                  >

                    <hr />

                    <h4
                      className="fw-bold mb-3"
                      style={{ color: "#353543" }}
                    >
                      Payment Method
                    </h4>

                    {/* Cash On Delivery */}

                    {grandTotal <= 200 && (

                      <div className="payment-option">

                        <input
                          type="radio"
                          className="form-check-input"
                          name="paymentMethod"
                          checked={paymentMethod === "Cash On Delivery"}
                          onChange={() =>
                            setPaymentMethod("Cash On Delivery")
                          }
                        />

                        <label className="ms-2">
                          Cash On Delivery
                        </label>

                      </div>

                    )}

                    {/* UPI */}

                    <div className="payment-option mt-3">

                      <input
                        type="radio"
                        className="form-check-input"
                        name="paymentMethod"
                        checked={paymentMethod === "UPI"}
                        onChange={() =>
                          setPaymentMethod("UPI")
                        }
                      />

                      <label className="ms-2">
                        UPI / QR Payment
                      </label>

                    </div>


                    {grandTotal > 200 && (

                      <div
                        className="alert alert-warning mt-3"
                        style={{
                          fontSize: "14px",
                          borderRadius: "10px"
                        }}
                      >
                        For orders above ₹200, only UPI payment is available.
                      </div>

                    )}

                    {paymentMethod === "UPI" && (

                      <div className="border rounded p-3 mt-3">

                        <h6 className="fw-bold">
                          Scan QR Code
                        </h6>

                        <img
                          src="https://res.cloudinary.com/dzosvvlib/image/upload/v1781962618/WhatsApp_Image_2026-06-20_at_7.05.23_PM_seyhbz.jpg"
                          alt="QR"
                          style={{
                            width: "220px",
                            display: "block",
                            margin: "20px auto"
                          }}
                        />

                        <input
  type="text"
  className="form-control"
  placeholder="Enter UTR Number"
  value={transactionId}
  onChange={(e) => {

    setTransactionId(e.target.value);

    // Remove error while typing
    setUrlError("");

  }}
  style={{
    border: urlError
      ? "2px solid red"
      : "1px solid #ced4da",
  }}
/>

                       {urlError && (

  <div
    style={{
      color: "#dc3545",
      marginTop: "8px",
      fontSize: "14px",
      fontWeight: "600",
    }}
  >
    ❌ {urlError}
  </div>

)}

                      </div>

                    )}

                    <button
                      className="checkout-btn mt-4"
                      onClick={handleOrder}
                    >
                      Place Order
                    </button>

                  </div>

                )}
              </div>   {/* card-body */}

            </div>   {/* card */}

          </div>   {/* checkout-right */}

        </div>   {/* row */}

      </div>   {/* container */}

      <Footer />
    </>
  );
}

export default Checkout;