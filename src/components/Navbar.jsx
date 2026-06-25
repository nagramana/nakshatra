import {
Link,
NavLink,
useNavigate
} from "react-router-dom";

import {
useState,
useEffect
} from "react";

import {
FaShoppingCart,
FaUserCircle,
FaSearch,
FaBars,
FaTimes,
FaChevronDown,
} from "react-icons/fa";

import axios from "axios";

import {
useLoading
} from "../context/LoadingContext";

import {
useCart
} from "../context/CartContext";

import "./Navbar.css";

const API_URL =
"https://nakshatra-mart-backend.onrender.com";

function Navbar() {

const navigate = useNavigate();

const {
setLoading
} = useLoading();


const {
cartItems
} = useCart();

const [menuOpen, setMenuOpen] =
useState(false);

const [showProfile, setShowProfile] =
useState(false);

const [searchTerm, setSearchTerm] =
useState("");

const user = JSON.parse(
localStorage.getItem("user")
);

const cartCount =
cartItems.reduce(
(total,item)=>
total + item.quantity,
0
);

useEffect(() => {


const handleEsc = (e) => {

  if (e.key === "Escape") {
    setMenuOpen(false);
  }

};

window.addEventListener(
  "keydown",
  handleEsc
);

return () =>
  window.removeEventListener(
    "keydown",
    handleEsc
  );


}, []);

const openPage = (path) => {


setLoading(true);

setTimeout(() => {

  navigate(path);

  setLoading(false);

  setMenuOpen(false);

}, 600);


};

const handleSearch = async (e) => {


if (e.key !== "Enter") return;

try {

  const response =
    await axios.get(
      `${API_URL}/api/products`
    );

  const foundProduct =
    response.data.find(
      (product) =>
        product.name
          ?.toLowerCase()
          .includes(
            searchTerm.toLowerCase()
          )
    );

  if (foundProduct) {

    openPage(
      `/product/${foundProduct._id}`
    );

  } else {

    openPage(
      `/products?search=${searchTerm}`
    );

  }

} catch (error) {

  console.log(error);

}


};

const logout = () => {


localStorage.removeItem("user");

navigate("/login");

window.location.reload();


};

return (
<> <nav className="modern-navbar">


    <button
      className="navbar-logo"
      onClick={() =>
        openPage("/")
      }
    >
      Nakshatra Mart
    </button>

    <div className="navbar-search">

      <FaSearch />

      <input
        type="text"
        placeholder="Search products..."
        value={searchTerm}
        onChange={(e) =>
          setSearchTerm(
            e.target.value
          )
        }
        onKeyDown={handleSearch}
      />

    </div>

    <div className="navbar-menu">

      <button
        className="nav-btn"
        onClick={() =>
          openPage("/")
        }
      >
        Home
      </button>

      <button
        className="nav-btn"
        onClick={() =>
          openPage("/products")
        }
      >
        Products
      </button>

      <button
className="nav-btn cart-btn"
onClick={() =>
openPage("/cart")
}
>
<FaShoppingCart />

Cart

{cartCount > 0 && (

<span className="cart-badge">

{cartCount}

</span>

)}

</button>

      {!user ? (

        <button
          className="nav-btn"
          onClick={() =>
            openPage("/login")
          }
        >
          Login
        </button>

      ) : (

        <div
          className="profile-menu"
          onClick={() =>
            setShowProfile(
              !showProfile
            )
          }
        >

          <FaUserCircle />

          <span>
            Hello{" "}
            {user.name ||
              "User"}
          </span>

          <FaChevronDown />

          {showProfile && (

            <div className="profile-dropdown">

              <button
                className="dropdown-btn"
                onClick={() =>
                  openPage("/profile")
                }
              >
                My Profile
              </button>

              <button
                className="dropdown-btn"
                onClick={() =>
                  openPage("/my-orders")
                }
              >
                My Orders
              </button>

              <button
                onClick={logout}
              >
                Logout
              </button>

            </div>

          )}

        </div>

      )}

    </div>

    <button
      className="mobile-menu-btn"
      onClick={() =>
        setMenuOpen(
          !menuOpen
        )
      }
    >
      {menuOpen ? (
        <FaTimes />
      ) : (
        <FaBars />
      )}
    </button>

  </nav>

  <div className="mobile-search-box">

    <FaSearch />

    <input
      type="text"
      placeholder="Search..."
      value={searchTerm}
      onChange={(e) =>
        setSearchTerm(
          e.target.value
        )
      }
      onKeyDown={handleSearch}
    />

  </div>

  {menuOpen && (

    <>
      <div
        className="mobile-overlay"
        onClick={() =>
          setMenuOpen(false)
        }
      />

      <aside className="mobile-menu">

        <button
          className="mobile-link"
          onClick={() =>
            openPage("/")
          }
        >
          🏠 Home
        </button>

        <button
          className="mobile-link"
          onClick={() =>
            openPage("/products")
          }
        >
          📦 Products
        </button>

        <button
          className="mobile-link"
          onClick={() =>
            openPage("/cart")
          }
        >
          🛒 Cart
        </button>

        {user ? (
          <>
            <button
              className="mobile-link"
              onClick={() =>
                openPage("/profile")
              }
            >
              👤 Profile
            </button>

            <button
              className="mobile-link"
              onClick={() =>
                openPage("/my-orders")
              }
            >
              📋 My Orders
            </button>

            <button
              className="logout-btn"
              onClick={logout}
            >
              🚪 Logout
            </button>
          </>
        ) : (
          <button
            className="mobile-link"
            onClick={() =>
              openPage("/login")
            }
          >
            🔑 Login
          </button>
        )}

      </aside>
    </>
  )}

</>


);

}

export default Navbar;
