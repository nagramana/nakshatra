import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import {
  useNavigate,
  useLocation,
} from "react-router-dom";

function OrderSuccess() {

  const navigate = useNavigate();
  const location =
  useLocation();

const orderId =
  location.state?.orderId;

  return (
    <>
      <Navbar />

      <div
        className="container py-5"
      >

        <div
          className="card border-0 shadow-sm text-center"
        >

          <div
            className="card-body p-5"
          >

            <div
              style={{
                width: "100px",
                height: "100px",
                background: "#16a34a",
                borderRadius: "50%",
                margin: "auto",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#fff",
                fontSize: "50px",
              }}
            >
              ✓
            </div>

            <h2
              className="fw-bold mt-4"
            >
              Order Confirmed
            </h2>

            <p
              className="text-muted"
            >
              Thank you for shopping with us
            </p>

            <h5
              style={{
                color:"#9f2089"
              }}
            >
              Order ID :
{orderId}
            </h5>

            <button
              className="btn mt-4"
              style={{
                background:"#9f2089",
                color:"#fff",
                padding:
                  "12px 30px",
              }}
              onClick={() =>
                navigate("/my-orders")
              }
            >
              View My Orders
            </button>

            <button
              className="btn btn-outline-secondary mt-4 ms-3"
              onClick={() =>
                navigate("/products")
              }
            >
              Continue Shopping
            </button>

          </div>

        </div>

      </div>

      <Footer />
    </>
  );
}

export default OrderSuccess;