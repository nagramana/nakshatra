import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useOrders } from "../context/OrderContext";

function MyOrders() {
  const { orders, requestReturn } = useOrders();

  return (
    <>
      <Navbar />

      <div className="container py-5">
        <h2 className="mb-4">My Orders</h2>

        {orders.length === 0 ? (
          <div className="text-center py-5">
            <h4>No Orders Found</h4>
          </div>
        ) : (
          orders.map((order) => (
            <div
              key={order.id}
              className="card shadow mb-4"
            >
              <div className="card-body">

                <div className="d-flex justify-content-between">
                  <h5>Order ID: {order.id}</h5>

                  <span className="badge bg-primary">
                    {order.orderStatus}
                  </span>
                </div>

                <hr />

                <h6>Customer Details</h6>

                <p>
                  <strong>Name:</strong>{" "}
                  {order.customer?.name}
                </p>

                <p>
                  <strong>Phone:</strong>{" "}
                  {order.customer?.phone}
                </p>

                <p>
                  <strong>Address:</strong>{" "}
                  {order.customer?.address}
                </p>

                <hr />

                <h6>Products</h6>

                {order.items?.map((item) => (
                  <div
                    key={item.id}
                    className="border rounded p-2 mb-2"
                  >
                    <div className="d-flex justify-content-between">
                      <span>
                        {item.name}
                      </span>

                      <span>
                        Qty: {item.quantity}
                      </span>
                    </div>

                    <small>
                      ₹{item.price}
                    </small>
                  </div>
                ))}

                <hr />

                <p>
                  <strong>Payment:</strong>{" "}
                  {order.paymentMethod}
                </p>

                <p>
                  <strong>Order Date:</strong>{" "}
                  {order.createdAt}
                </p>

                <h5 className="text-success">
                  Total: ₹{order.total}
                </h5>

                <hr />

                <h6>Tracking Timeline</h6>

                <ul>
                  {order.trackingSteps?.map(
                    (step, index) => (
                      <li key={index}>
                        {step}
                      </li>
                    )
                  )}
                </ul>

                <hr />

                {order.returnRequested ? (
                  <span className="badge bg-warning text-dark">
                    Return Status:
                    {" "}
                    {order.returnStatus}
                  </span>
                ) : (
                  <button
                    className="btn btn-warning"
                    onClick={() =>
                      requestReturn(order.id)
                    }
                  >
                    Request Return
                  </button>
                )}

              </div>
            </div>
          ))
        )}
      </div>

      <Footer />
    </>
  );
}

export default MyOrders;