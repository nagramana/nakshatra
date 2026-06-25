import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useOrders } from "../context/OrderContext";

function TrackOrder() {
  const { orders } = useOrders();

  return (
    <>
      <Navbar />

      <div className="container py-5">
        <h2 className="mb-4">Track Orders</h2>

        {orders.length === 0 ? (
          <div className="text-center py-5">
            <h4>No Orders Found</h4>
          </div>
        ) : (
          orders.map((order) => {

            let trackingSteps =
              order.trackingSteps || [];

            if (
              order.returnStatus ===
              "Approved"
            ) {
              trackingSteps = [
                "Order Placed",
                "Confirmed",
                "Shipped",
                "Delivered",
                "Return Requested",
                "Return Approved",
                "Order Returned",
              ];
            }

            if (
              order.returnStatus ===
              "Rejected"
            ) {
              trackingSteps = [
                "Order Placed",
                "Confirmed",
                "Shipped",
                "Delivered",
                "Return Requested",
                "Return Rejected",
              ];
            }

            let currentStatus =
              order.orderStatus;

            if (
              order.returnStatus ===
              "Approved"
            ) {
              currentStatus =
                "Order Returned";
            }

            if (
              order.returnStatus ===
              "Rejected"
            ) {
              currentStatus =
                "Return Rejected";
            }

            const currentIndex =
              trackingSteps.indexOf(
                currentStatus
              );

            return (
              <div
                key={order.id}
                className="card shadow mb-4"
              >
                <div className="card-body">

                  <div className="d-flex justify-content-between align-items-center">
                    <h5>
                      Order ID: {order.id}
                    </h5>

                    <span className="badge bg-primary">
                      {currentStatus}
                    </span>
                  </div>

                  <hr />

                  <div className="row">

                    <div className="col-md-6">

                      <p>
                        <strong>
                          Customer:
                        </strong>{" "}
                        {
                          order.customer
                            ?.name
                        }
                      </p>

                      <p>
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
                          Date:
                        </strong>{" "}
                        {
                          order.createdAt
                        }
                      </p>

                    </div>

                    <div className="col-md-6 text-md-end">

                      <h5 className="text-success">
                        ₹{order.total}
                      </h5>

                    </div>

                  </div>

                  <hr />

                  <h5 className="mb-4">
                    Tracking Status
                  </h5>

                  <div>

                    {trackingSteps.map(
                      (
                        step,
                        index
                      ) => (
                        <div
                          key={index}
                          className="d-flex align-items-center mb-3"
                        >
                          <div
                            className={`rounded-circle me-3 ${
                              index <=
                              currentIndex
                                ? "bg-success"
                                : "bg-secondary"
                            }`}
                            style={{
                              width:
                                "18px",
                              height:
                                "18px",
                            }}
                          ></div>

                          <span
                            className={
                              index <=
                              currentIndex
                                ? "fw-bold text-success"
                                : "text-muted"
                            }
                          >
                            {step}
                          </span>

                        </div>
                      )
                    )}

                  </div>

                  <hr />

                  <div className="alert alert-info">

                    Current Status:
                    <strong>
                      {" "}
                      {currentStatus}
                    </strong>

                  </div>

                </div>
              </div>
            );
          })
        )}
      </div>

      <Footer />
    </>
  );
}

export default TrackOrder;