import { useState } from "react";
import {
    useNavigate,
    useLocation,
} from "react-router-dom";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useOrders } from "../context/OrderContext";
import { useCart } from "../context/CartContext";

function Payment() {
    const navigate = useNavigate();
    const location = useLocation();

    const customer =
        location.state?.customer;

    const { placeOrder } = useOrders();

    const {
        cartItems,
        totalPrice,
        clearCart,
    } = useCart();

    const [paymentMethod, setPaymentMethod] =
        useState("Cash On Delivery");

    //   const handlePlaceOrder = () => {
    //   navigate("/order-success");
    // };

const handlePlaceOrder = async () => {

  const orderId =
    "ORD" + Date.now();

  const orderData = {
    id: orderId,

    customer: {
      name: customer?.name || "",
      phone: customer?.phone || "",
      address: customer?.address || "",
      city: customer?.city || "",
      state: customer?.state || "",
      pincode: customer?.pincode || "",
    },

    items: cartItems,

    total: totalPrice,

    paymentMethod,

    orderStatus: "Order Placed",
  };

  const savedOrder =
  await placeOrder(orderData);

clearCart();

navigate("/order-success", {
  state: {
    orderId: savedOrder.id,
  },
});
};


    
    return (
        <>
            <Navbar />

            <div className="container py-5">

                {/* STEP BAR */}

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
                                        fontWeight: "700",
                                    }}
                                >
                                    ✓
                                </div>

                                <small>Review</small>

                            </div>

                            <div
                                style={{
                                    flex: 1,
                                    height: "3px",
                                    background: "#9f2089",
                                    margin: "0 10px",
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
                                        fontWeight: "700",
                                    }}
                                >
                                    2
                                </div>

                                <small>Payment</small>

                            </div>

                        </div>

                    </div>

                </div>

                <div className="row g-4">

                    {/* LEFT */}

                    <div className="col-lg-8">

                        <div className="card border-0 shadow-sm">

                            <div className="card-body">

                                <h3
                                    className="fw-bold mb-4"
                                    style={{
                                        color: "#353543",
                                    }}
                                >
                                    Select Payment Method
                                </h3>

                                {/* COD */}

                                <div
                                    className={`border rounded p-4 mb-3 ${paymentMethod ===
                                            "Cash On Delivery"
                                            ? "border-danger"
                                            : ""
                                        }`}
                                    style={{
                                        cursor: "pointer",
                                    }}
                                    onClick={() =>
                                        setPaymentMethod(
                                            "Cash On Delivery"
                                        )
                                    }
                                >
                                    <div className="d-flex justify-content-between">

                                        <div>

                                            <h4 className="fw-bold">
                                                Cash On Delivery
                                            </h4>

                                        </div>

                                        <input
                                            type="radio"
                                            checked={
                                                paymentMethod ===
                                                "Cash On Delivery"
                                            }
                                            readOnly
                                        />

                                    </div>

                                </div>

                                {/* UPI */}

                                <div
                                    className={`border rounded p-4 ${paymentMethod === "UPI"
                                            ? "border-danger"
                                            : ""
                                        }`}
                                    style={{
                                        cursor: "pointer",
                                    }}
                                    onClick={() =>
                                        setPaymentMethod("UPI")
                                    }
                                >
                                    <div className="d-flex justify-content-between">

                                        <div>

                                            <h4 className="fw-bold">
                                                UPI Payment
                                            </h4>

                                            <small>
                                                Extra Discount Available
                                            </small>

                                        </div>

                                        <input
                                            type="radio"
                                            checked={
                                                paymentMethod === "UPI"
                                            }
                                            readOnly
                                        />

                                    </div>

                                    {paymentMethod ===
                                        "UPI" && (
                                            <div className="mt-4">

                                                <img
                                                    src="https://res.cloudinary.com/dzosvvlib/image/upload/v1781962618/WhatsApp_Image_2026-06-20_at_7.05.23_PM_seyhbz.jpg"
                                                    alt="QR"
                                                    style={{
                                                        width: "250px",
                                                        display: "block",
                                                        margin: "auto",
                                                    }}
                                                />

                                                <input
                                                    type="text"
                                                    className="form-control mt-3"
                                                    placeholder="Enter UTR Number"
                                                />

                                            </div>
                                        )}

                                </div>

                            </div>

                        </div>

                    </div>

                    {/* RIGHT */}

                    <div className="col-lg-4">

                        <div
                            className="card border-0 shadow"
                            style={{
                                position: "sticky",
                                top: "90px",
                            }}
                        >
                            <div className="card-body">

                                <h3
                                    className="fw-bold mb-4"
                                >
                                    Price Details
                                </h3>

                                <div className="d-flex justify-content-between mb-3">

                                    <span>
                                        Product Price
                                    </span>

                                    <strong>
                                        ₹{totalPrice}
                                    </strong>

                                </div>

                                <div className="d-flex justify-content-between mb-3">

                                    <span>
                                        Delivery
                                    </span>

                                    <strong
                                        style={{
                                            color: "green",
                                        }}
                                    >
                                        FREE
                                    </strong>

                                </div>

                                <hr />

                                <div className="d-flex justify-content-between">

                                    <h4>
                                        Order Total
                                    </h4>

                                    <h4
                                        style={{
                                            color: "#9f2089",
                                        }}
                                    >
                                        ₹{totalPrice}
                                    </h4>

                                </div>

                                <div className="alert alert-success mt-3">
                                    Yay! Your order is ready
                                </div>

                                <button
                                    className="btn w-100"
                                    style={{
                                        background:
                                            "#9f2089",
                                        color: "#fff",
                                        height: "52px",
                                        fontWeight: "700",
                                    }}
                                    onClick={
                                        handlePlaceOrder
                                    }
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

export default Payment;