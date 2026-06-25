import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import {
  useEffect
} from "react";

import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Payment from "./pages/Payment";
import OrderSuccess from "./pages/OrderSuccess";
import Login from "./pages/Login";
import Register from "./pages/Register";
import MyOrders from "./pages/MyOrders";
import TrackOrder from "./pages/TrackOrder";
import Profile from "./pages/Profile";

import Loader from "./pages/Loader";

import {
  useLoading
} from "./context/LoadingContext";

function App() {

  const {
    loading
  } = useLoading();

  useEffect(() => {

    if (
      "scrollRestoration" in
      window.history
    ) {

      window.history
        .scrollRestoration =
        "manual";

    }

    window.scrollTo(
      0,
      0
    );

  }, []);

  return (
    <>

      {loading && (
        <Loader />
      )}

      <BrowserRouter>

        <Routes>

          {/* Home */}

          <Route
            path="/"
            element={<Home />}
          />

          {/* Products */}

          <Route
            path="/products"
            element={<Products />}
          />

          <Route
            path="/product/:id"
            element={
              <ProductDetails />
            }
          />

          {/* Cart */}

          <Route
            path="/cart"
            element={<Cart />}
          />

          {/* Checkout */}

          <Route
            path="/checkout"
            element={
              <Checkout />
            }
          />

          {/* Payment */}

          <Route
            path="/payment"
            element={<Payment />}
          />

          {/* Order Success */}

          <Route
            path="/order-success"
            element={
              <OrderSuccess />
            }
          />

          {/* Orders */}

          <Route
            path="/my-orders"
            element={
              <MyOrders />
            }
          />

          <Route
            path="/track-order"
            element={
              <TrackOrder />
            }
          />

          {/* Profile */}

          <Route
            path="/profile"
            element={<Profile />}
          />

          {/* Auth */}

          <Route
            path="/login"
            element={<Login />}
          />

          <Route
            path="/register"
            element={<Register />}
          />

        </Routes>

      </BrowserRouter>

    </>
  );

}

export default App;