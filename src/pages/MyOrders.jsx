import {
  useState,
  useEffect,
  useRef,
} from "react";

import { io } from "socket.io-client";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useOrders } from "../context/OrderContext";


const API_URL =
  "https://nakshatra-mart-backend.onrender.com";

function MyOrders() {
  const {
    orders,
    requestReturn,
    fetchOrders,
  } = useOrders();

  const [selectedOrder,
    setSelectedOrder] =
    useState(null);

  const [returnReason,
    setReturnReason] =
    useState("");


    // ======================================
// NOTIFICATION SOUND
// ======================================

const notificationSound = useRef(
  new Audio(
    "https://res.cloudinary.com/dzosvvlib/video/upload/v1782734034/mixkit-clinking-coins-1993_uudse4.wav"
  )
);

const playNotification = () => {

  notificationSound.current.currentTime = 0;

  notificationSound.current.play().catch((err) => {

    console.log("Audio Error:", err);

  });

};

  // ======================================
// SOCKET CONNECTION
// ======================================

useEffect(() => {

  // Load Orders First
  fetchOrders();

  // Connect Socket
  const socket = io(API_URL);

  socket.on("connect", () => {

    console.log(
      "✅ User Connected:",
      socket.id
    );

  });

  // ======================================
  // PAYMENT APPROVED
  // ======================================

  socket.on(
    "payment-approved",
    (data) => {

      console.log(data);

      playNotification();

      alert(
        "🎉 Payment Approved!\n\nYour payment has been approved successfully."
      );

      fetchOrders();

    }
  );

  // ======================================
  // PAYMENT REJECTED
  // ======================================

  socket.on(
    "payment-rejected",
    (data) => {

      console.log(data);

      playNotification();

      alert(
        "❌ Payment Rejected!\n\nReason : " +
        data.message
      );

      fetchOrders();

    }
  );

  socket.on("disconnect", () => {

    console.log(
      "❌ User Disconnected"
    );

  });

  return () => {

    socket.disconnect();

  };

}, []);


  const getProgress = (status) => {
  switch (status) {
    case "Pending":
      return 10;

    case "Ordered":
      return 20;

    case "Processing":
      return 40;

    case "Shipped":
      return 60;

    case "Out for Delivery":
      return 80;

    case "Delivered":
      return 100;

    case "Order Returned":
      return 100;

    default:
      return 10;
  }
};

  // Check Return Eligibility
  const canReturn = (order) => {
    if (
      order.orderStatus !==
      "Delivered"
    )
      return false;

    if (!order.deliveredAt)
      return false;

    const deliveredDate =
      new Date(
        order.deliveredAt
      );

    const today =
      new Date();

    const diffDays =
      (today -
        deliveredDate) /
      (1000 *
        60 *
        60 *
        24);

    return diffDays <= 7;
  };

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
          My Orders
        </h2>

        {orders.length === 0 ? (
          <div
            className="text-center py-5 bg-white shadow-sm rounded"
          >
            <h4>No Orders Found</h4>
            <p className="text-muted">
              Your orders will appear here.
            </p>
          </div>
        ) : (
          orders.map((order) => (
            <div
              key={order.id}
              className="card border-0 shadow-sm mb-4"
              style={{
                borderRadius: "15px",
              }}
            >
              <div className="card-body p-4">

                {/* Header */}

                <div
                  className="d-flex justify-content-between align-items-center flex-wrap"
                >
                  <div>
                    <h5 className="fw-bold">
                      Order ID :
                      {order.id}
                    </h5>

                    <small className="text-muted">
                      Ordered On :
                      {new Date(
                        order.createdAt
                      ).toLocaleString("en-IN", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: true,
                      })}
                    </small>
                  </div>

                  <span
                    className="badge"
                    style={{
                      background:
                        "#22c55e",
                      fontSize: "14px",
                      padding:
                        "10px 15px",
                    }}
                  >
                    {order.orderStatus}
                  </span>
                </div>

                <hr />

                {/* Customer */}

                <h6 className="fw-bold mb-3">
                  Delivery Address
                </h6>

                <p className="mb-1">
                  <strong>
                    Name:
                  </strong>{" "}
                  {
                    order.customer
                      ?.name
                  }
                </p>

                <p className="mb-1">
                  <strong>
                    Phone:
                  </strong>{" "}
                  {
                    order.customer
                      ?.phone
                  }
                </p>

                <p>
                  <strong>
                    Address:
                  </strong>{" "}
                  {
                    order.customer
                      ?.address
                  }
                </p>

                <hr />

                {/* Products */}

                <h6 className="fw-bold mb-3">
                  Ordered Products
                </h6>

                {order.items?.map(
                  (item, index) => (
                    <div
                      key={
                        item._id ||
                        item.id ||
                        index
                      }
                      className="row align-items-center border rounded p-3 mb-3"
                    >
                      <div className="col-md-2 text-center">

                        <img
                          src={
                            item.image
                          }
                          alt={
                            item.name
                          }
                          style={{
                            width:
                              "90px",
                            height:
                              "90px",
                            objectFit:
                              "cover",
                            borderRadius:
                              "10px",
                          }}
                        />

                      </div>

                      <div className="col-md-6">

                        <h5>
                          {
                            item.name
                          }
                        </h5>

                        <p className="text-muted mb-1">
                          Quantity :
                          {
                            item.quantity ||
                            item.qty ||
                            1
                          }
                        </p>

                        <p className="fw-bold text-success">
                          ₹
                          {
                            item.price
                          }
                        </p>

                      </div>

                      <div className="col-md-4 text-end">

                        <h5
                          style={{
                            color:
                              "#082A78",
                          }}
                        >
                          ₹
                          {(
                            item.price *
                            (
                              item.quantity ||
                              item.qty ||
                              1
                            )
                          ).toFixed(2)}
                        </h5>

                      </div>
                    </div>
                  )
                )}

                <hr />

                {/* Progress */}

                <h6 className="fw-bold">
                  Order Tracking
                </h6>
                {/* {order.returnRequested && (
  <div
    className="alert alert-warning mt-3"
  >
    Return Requested
  </div>
)} */}
{order.returnRequested &&
  !order.returnStatus && (
    <div className="alert alert-warning mt-3">
      Return Requested
    </div>
)}

{order.returnStatus ===
  "Approved" && (
  <div
    className="alert alert-success mt-3"
  >
    Return Approved
  </div>
)}

{order.returnStatus ===
  "Rejected" && (
  <div
    className="alert alert-danger mt-3"
  >
    Return Rejected
  </div>
)}

                <div
                  className="progress mt-3 mb-2"
                  style={{
                    height:
                      "12px",
                  }}
                >
                  <div
                    className="progress-bar bg-success"


                    style={{
                      width: `${getProgress(
                        order.orderStatus
                      )}%`,
                    }}
                  ></div>
                </div>

                <div
  className="d-flex justify-content-between mb-4 flex-wrap"
  style={{
    fontSize: "12px",
  }}
>

  <small>Pending</small>
<small>Ordered</small>
<small>Processing</small>
<small>Shipped</small>
<small>Out For Delivery</small>
<small>Delivered</small>

  {order.returnRequested && (
    <small
      style={{
        color: "#f59e0b",
        fontWeight: "600",
      }}
    >
      Return Requested
    </small>
  )}

  {order.returnStatus ===
    "Approved" && (
    <>
      <small
        style={{
          color: "#22c55e",
          fontWeight: "600",
        }}
      >
        Return Approved
      </small>

      <small
        style={{
          color: "#ef4444",
          fontWeight: "600",
        }}
      >
        Order Returned
      </small>
    </>
  )}

  {order.returnStatus ===
    "Rejected" && (
    <small
      style={{
        color: "#ef4444",
        fontWeight: "600",
      }}
    >
      Return Rejected
    </small>
  )}

</div>

                {/* Timeline */}
                {/* 
                <div
                  className="bg-light p-3 rounded mb-4"
                >
                  <h6 className="fw-bold">
                    Timeline
                  </h6>

                  <ul className="mb-0">
                    {order.trackingSteps?.map(
                      (
                        step,
                        index
                      ) => (
                        <li
                          key={
                            index
                          }
                        >
                          {
                            step
                          }
                        </li>
                      )
                    )}
                  </ul>
                </div> */}

                {/* Footer */}

<div
  className="d-flex justify-content-between align-items-center flex-wrap"
>
  <div>
    <p>
      <strong>
        Payment:
      </strong>{" "}
      {
        order.paymentMethod
      }
    </p>

    <h3
      style={{
        color:
          "#22c55e",
      }}
    >
      ₹
      {
        order.total
      }
    </h3>
  </div>

  <div
    className="d-flex gap-2"
  >

    {order.orderStatus ===
      "Delivered" && (
      <div>
        {order.returnRequested ? (
          <>
            <button
              className={
                order.returnStatus ===
                "Approved"
                  ? "btn btn-success"
                  : order.returnStatus ===
                    "Rejected"
                  ? "btn btn-danger"
                  : "btn btn-secondary"
              }
              disabled
            >
              Return :
{" "}
{order.returnStatus || "Pending"}
            </button>

            {order.returnRequestedAt && (
              <div
                style={{
                  marginTop:
                    "8px",
                  fontSize:
                    "13px",
                  color:
                    "#666",
                }}
              >
                Requested On :
                {new Date(
                  order.returnRequestedAt
                ).toLocaleString()}
              </div>
            )}

            {order.returnActionAt && (
              <div
                style={{
                  marginTop:
                    "5px",
                  fontSize:
                    "13px",
                  color:
                    "#666",
                }}
              >
                Updated On :
                {new Date(
                  order.returnActionAt
                ).toLocaleString()}
              </div>
            )}
          </>
        ) : canReturn(
          order
        ) ? (
          <button
            className="btn btn-warning"
            onClick={() =>
              setSelectedOrder(
                order._id
              )
            }
          >
            Request Return
          </button>
        ) : null}
      </div>
    )}

  </div>
</div>
        </div>
    </div>
  ))
)}


</div>
{selectedOrder && (
  <div
    className="modal d-block"
          style={{
            background:
              "rgba(0,0,0,0.5)",
          }}
        >
          <div className="modal-dialog">
            <div className="modal-content">

              <div className="modal-header">
                <h5>
                  Return Request
                </h5>

                <button
                  className="btn-close"
                  onClick={() =>
                    setSelectedOrder(null)
                  }
                ></button>
              </div>

              <div className="modal-body">

                <label className="fw-bold">
                  Return Reason
                </label>

                <textarea
                  className="form-control mt-2"
                  rows="4"
                  value={returnReason}
                  onChange={(e) =>
                    setReturnReason(
                      e.target.value
                    )
                  }
                  placeholder="Enter return reason..."
                />

              </div>

              <div className="modal-footer">

                <button
                  className="btn btn-secondary"
                  onClick={() =>
                    setSelectedOrder(null)
                  }
                >
                  Cancel
                </button>

                <button
                  className="btn btn-warning"
                  onClick={() => {
                    if (
                      !returnReason.trim()
                    ) {
                      alert(
                        "Please enter a reason"
                      );
                      return;
                    }

                    requestReturn(
                      selectedOrder,
                      returnReason
                    );

                    setSelectedOrder(null);

                    setReturnReason("");
                  }}
                >
                  Submit Return
                </button>

              </div>

            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}

export default MyOrders;


    