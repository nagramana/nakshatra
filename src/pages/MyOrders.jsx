import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useOrders } from "../context/OrderContext";

function MyOrders() {
  const { orders, requestReturn } =
    useOrders();

  const [selectedOrder,
    setSelectedOrder] =
    useState(null);

  const [returnReason,
    setReturnReason] =
    useState("");

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
                      {order.createdAt}
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
                  (item) => (
                    <div
                      key={item.id}
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
                            item.quantity
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
                            item.quantity
                          ).toFixed(
                            2
                          )}
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
                      width: `${order.progress || 25}%`,
                    }}
                  ></div>
                </div>

                <div
                  className="d-flex justify-content-between mb-4"
                >
                  <small>
                    Ordered
                  </small>

                  <small>
                    Confirmed
                  </small>

                  <small>
                    Shipped
                  </small>

                  <small>
                    Delivered
                  </small>
                </div>

                {/* Timeline */}

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
                </div>

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

                    {/* <button
                      className="btn btn-outline-primary"
                    >
                      Track Order
                    </button> */}

                    {/* {order.returnRequested ? (
                      <button
                        className="btn btn-secondary"
                        disabled
                      >
                        Return:
                        {" "}
                        {
                          order.returnStatus
                        }
                      </button>
                    ) : (
                      <button
                        className="btn btn-warning"
                        onClick={() =>
                          requestReturn(
                            order.id
                          )
                        }
                      >
                        Request Return
                      </button>
                    )} */}


                    {order.returnRequested ? (
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
    {order.returnStatus}
  </button>
): (
                      <button
                        className="btn btn-warning"
                        onClick={() =>
                          setSelectedOrder(order.id)
                        }
                      >
                        Request Return
                      </button>
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