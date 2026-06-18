import { useParams } from "react-router-dom";
import { useCart } from "../context/CartContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import products from "../data/products";

function ProductDetails() {
  const { id } = useParams();

  const { addToCart } = useCart();

  const product = products.find(
    (item) => item.id === Number(id)
  );

  if (!product) {
    return (
      <>
        <Navbar />
        <div className="container py-5">
          <h2>Product Not Found</h2>
        </div>
        <Footer />
      </>
    );
  }

  const gstAmount =
    (product.price * product.gst) / 100;

  const finalPrice =
    product.price + gstAmount;

  const handleAddToCart = () => {
    addToCart(product);
    alert(`${product.name} added to cart`);
  };

  return (
    <>
      <Navbar />

      <div className="container py-5">
        <div className="row">

          {/* Product Image */}

          <div className="col-md-5">
            <img
              src={product.image}
              alt={product.name}
              className="img-fluid rounded shadow"
            />
          </div>

          {/* Product Information */}

          <div className="col-md-7">

            <h2>{product.name}</h2>

            <p className="text-success fw-bold">
              {product.discount}
            </p>

            <p>
              ⭐⭐⭐⭐⭐ (4.5 Rating)
            </p>

            <hr />

            <h4>
              Brand : {product.brand}
            </h4>

            <h3 style={{ color: "#082A78" }}>
              ₹{product.price}
            </h3>

            <p>
              GST ({product.gst}%):
              ₹{gstAmount.toFixed(2)}
            </p>

            <h4 className="text-success">
              Final Price:
              ₹{finalPrice.toFixed(2)}
            </h4>

            <hr />

            <p>
              {product.description}
            </p>

            <p>
              <strong>Stock:</strong>
              {" "}
              {product.stock} Available
            </p>

            <p>
              <strong>Delivery:</strong>
              3-5 Working Days
            </p>

            <p>
              <strong>Return Policy:</strong>
              Return within 5 Days
            </p>

            <p>
              <strong>Payment Method:</strong>
              Cash On Delivery
            </p>

            <div className="d-flex gap-3 mt-4">

              <button
                className="btn btn-primary"
                onClick={handleAddToCart}
              >
                Add To Cart
              </button>

              <button
                className="btn btn-success"
              >
                Buy Now
              </button>

            </div>

          </div>

        </div>

        {/* Product Specifications */}

        <div className="card mt-5">
          <div className="card-body">

            <h3>Product Details</h3>

            <table className="table">
              <tbody>

                <tr>
                  <td>Brand</td>
                  <td>{product.brand}</td>
                </tr>

                <tr>
                  <td>GST</td>
                  <td>{product.gst}%</td>
                </tr>

                <tr>
                  <td>Stock</td>
                  <td>{product.stock}</td>
                </tr>

                <tr>
                  <td>Return Policy</td>
                  <td>5 Days Return</td>
                </tr>

                <tr>
                  <td>Payment</td>
                  <td>Cash On Delivery</td>
                </tr>

              </tbody>
            </table>

          </div>
        </div>

      </div>

      <Footer />
    </>
  );
}

export default ProductDetails;