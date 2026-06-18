import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import "../styles/navbar.css";

function Navbar() {
  const { cartItems } = useCart();
  const { user, logout } = useAuth();

  return (
    <nav className="navbar navbar-expand-lg top-navbar">
      <div className="container">
        <Link className="brand-logo" to="/">
          Nakshatra Mart
        </Link>

        <button
          className="navbar-toggler bg-light"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
        >
          ☰
        </button>

        <div
          className="collapse navbar-collapse"
          id="navbarContent"
        >
          <form className="mx-auto w-50">
            <input
              className="form-control search-box"
              type="search"
              placeholder="Search products..."
            />
          </form>

          <ul className="navbar-nav align-items-center">
            <li className="nav-item">
              <Link
                className="nav-link-custom px-3"
                to="/"
              >
                Home
              </Link>
            </li>

            <li className="nav-item">
              <Link
                className="nav-link-custom px-3"
                to="/products"
              >
                Products
              </Link>
            </li>

            <li className="nav-item">
              <Link
                className="nav-link-custom px-3"
                to="/cart"
              >
                Cart ({cartItems.length})
              </Link>
            </li>

            {user ? (
              <>
                <li className="nav-item">
                  <Link
                    className="nav-link-custom px-3"
                    to="/profile"
                  >
                    {user.name}
                  </Link>
                </li>

                <li className="nav-item">
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={logout}
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link
                    className="nav-link-custom px-3"
                    to="/login"
                  >
                    Login
                  </Link>
                </li>

                <li className="nav-item">
                  <Link
                    className="btn btn-success btn-sm"
                    to="/register"
                  >
                    Register
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;