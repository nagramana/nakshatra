import {
  useState,
  useEffect
} from "react";

import {
  useLocation
} from "react-router-dom";
import "../styles/product.css";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProductFilter from "../components/ProductFilter";
import TopCategories from "../components/TopCategories";



import { useCart } from "../context/CartContext";
import axios from "axios";



const API_URL =
  "https://nakshatra-mart-backend.onrender.com";


function Products() {
  const location =
    useLocation();

  const query =
    new URLSearchParams(
      location.search
    ).get("search") || "";
  const [showFilters, setShowFilters] =
    useState(false);
  const [allProducts, setAllProducts] =
    useState([]);

  const [products, setProducts] =
    useState([]);
  const filteredProducts =
    query.trim() === ""
      ? products
      : products.filter((product) =>
        product.name
          ?.toLowerCase()
          .includes(
            query.toLowerCase()
          )
      );
  const [
    imageIndexes,
    setImageIndexes
  ] = useState({});
  const [currentPage, setCurrentPage] =
    useState(1);

  const productsPerPage = 20;

  const { addToCart } = useCart();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        `${API_URL}/api/products`
      );

      console.log(
        "PRODUCTS DATA:",
        response.data
      );

      setAllProducts(response.data);
      setProducts(response.data);
    } catch (error) {
      console.log(
        "Error fetching products",
        error
      );
    }
  };

  const prevImage = (
    productId,
    totalImages
  ) => {

    setImageIndexes(prev => ({

      ...prev,

      [productId]:

        (
          (prev[productId] || 0)
          - 1
          + totalImages
        )
        %
        totalImages

    }));

  };

  const nextImage = (
    productId,
    totalImages
  ) => {

    setImageIndexes(prev => ({

      ...prev,

      [productId]:

        (
          (prev[productId] || 0)
          + 1
        )
        %
        totalImages

    }));

  };

  const filterCategory = (category) => {

    if (category === "All") {
      setProducts(allProducts);
      return;
    }

    const filtered = allProducts.filter(
      (product) =>

        product.gender === category ||

        product.category
          ?.toLowerCase()
        === category.toLowerCase()
    );

    setProducts(filtered);
  };

  return (
    <>
      <Navbar
        filterCategory={filterCategory}
      />

      <TopCategories
        filterCategory={filterCategory}
      />

      <div
        style={{
          background: "#fafafa",
          minHeight: "100vh",
          padding: "20px",
        }}
      >
        <div className="container">

          <h2
            style={{
              fontWeight: "700",
              marginBottom: "20px",
              color: "#222",
            }}
          >
            Products For You
          </h2>

          <p
            style={{
              color: "#666",
              marginBottom: "20px",
            }}
          >
            {filteredProducts.length} products available
          </p>

          <div className="mobile-filter-btn">
            <button
              onClick={() =>
                setShowFilters(true)
              }
            >
              ☰ Filters
            </button>
          </div>
          {showFilters && (
            <div
              className="filter-overlay"
              onClick={() => setShowFilters(false)}
            ></div>
          )}

          <div className="products-layout">
            {/* <div
              style={{
                display: "flex",
                gap: "20px",
                alignItems: "flex-start",
              }}
            ></div> */}
            {/* LEFT FILTERS */}

            <div
              className={`filter-sidebar ${showFilters ? "show" : ""
                }`}
            >
              <div className="meesho-filter-card">

                <div className="filter-header-mobile">

                  <h5>FILTERS</h5>

                  <button
                    className="close-filter-btn"
                    onClick={() => setShowFilters(false)}
                  >
                    ✕
                  </button>

                </div>

                <p
                  style={{
                    color: "#888",
                    marginBottom: "15px",
                  }}
                >
                  {products.length}+ Products
                </p>

                <div
                  className="product-box"
                  style={{
                    height: "1px",
                    background: "#eee",
                    margin: "15px 0",
                  }}
                ></div>

                <ProductFilter
                  products={allProducts}
                  onFilter={setProducts}
                />

              </div>

            </div>


            {/* RIGHT PRODUCTS */}

            <div className="products-content">

              <div className="meesho-top-bar">

                <h3 className="meesho-heading">
                  Products For You
                </h3>

                <div className="sort-box">

                  <select className="sort-select">
                    <option>Relevance</option>
                    <option>Price Low - High</option>
                    <option>Price High - Low</option>
                    <option>Newest First</option>
                  </select>

                </div>

              </div>

              <div className="products-grid">

                {filteredProducts.length === 0 ? (

                  <div
                    style={{
                      width: "100%",
                      minHeight: "500px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      gridColumn: "1 / -1",
                    }}
                  >

                    <div style={{ textAlign: "center" }}>

                      <h1
                        style={{
                          color: "#ef4444",
                          fontSize: "40px",
                        }}
                      >
                        Product Not Found
                      </h1>

                      <p
                        style={{
                          color: "#666",
                          fontSize: "18px",
                        }}
                      >
                        This product is currently
                        unavailable or out of stock.
                      </p>

                    </div>

                  </div>

                ) : (

                  filteredProducts.map((product) => {

                    console.log("PRODUCT", product);
                    console.log("IMAGES", product.images);

                    return (

                      <div
                        key={product._id || product.id}
                        className="product-item"
                      >

                        <div className="meesho-product-card">

                          <div className="product-image-box">
                            {product.images?.length > 1 && (

                              <button
                                className="slider-arrow left"
                                onClick={(e) => {
                                  e.stopPropagation();

                                  prevImage(
                                    product._id || product.id,
                                    product.images.length
                                  );
                                }}
                              >

                                ❮

                              </button>

                            )}

                            {product.discount > 0 && (
                              <span className="discount-badge">
                                {product.discount}% OFF
                              </span>
                            )}

                            <span
                              style={{
                                position:
                                  "absolute",
                                right:
                                  "10px",
                                top:
                                  "10px",
                                width: "28px",
                                height: "28px",
                                fontSize: "12px",
                                background:
                                  "#fff",
                                borderRadius:
                                  "50%",
                                display:
                                  "flex",
                                alignItems:
                                  "center",
                                justifyContent:
                                  "center",
                                boxShadow:
                                  "0 2px 8px rgba(0,0,0,.1)",
                                cursor:
                                  "pointer",
                              }}
                            >
                              ♡
                            </span>

                            <img
  src={
    product.images?.[
      imageIndexes[
        product._id || product.id
      ] || 0
    ] || product.image
  }
  alt={product.name}
  className="product-image"
/>
                            {product.images?.length > 1 && (
                              <span className="image-count">
                                {(imageIndexes[
                                  product._id || product.id
                                ] || 0) + 1}
                                /
                                {product.images.length}
                              </span>
                            )}
                            {product.images?.length > 1 && (

                              <button
                                className="slider-arrow right"
                                onClick={(e) => {
                                  e.stopPropagation();

                                  nextImage(
                                    product._id || product.id,
                                    product.images.length
                                  );
                                }}
                              >
                                ❯
                              </button>

                            )}
                          </div>
                          <div className="product-info">

                            <h6
                              style={{
                                fontSize: "14px",
                                color: "#555",
                                overflow: "hidden",
                                whiteSpace: "nowrap",
                                textOverflow: "ellipsis",
                                marginBottom: "5px",
                              }}
                            >
                              {
                                product.name
                              }
                            </h6>

                            <p
                              style={{
                                color: "#888",
                                fontSize: "11px",
                              }}
                            >
                              {product.category}
                            </p>

                            <p
                              style={{
                                color: "red",
                                fontSize: "12px",
                                fontWeight: "bold",
                              }}
                            >
                              Gender: {product.gender}
                            </p>

                            <div
                              style={{
                                display:
                                  "flex",
                                gap:
                                  "4px",
                                alignItems:
                                  "center",
                              }}
                            >

                              <span
                                style={{
                                  fontSize:
                                    "18px",
                                  fontWeight:
                                    "700",
                                }}
                              >
                                ₹
                                {
                                  product.price
                                }
                              </span>

                              <span
                                style={{
                                  color:
                                    "#999",
                                  textDecoration:
                                    "line-through",
                                }}
                              >
                                ₹
                                {Math.round(
                                  product.price *
                                  1.3
                                )}
                              </span>

                              <span
                                style={{
                                  color: "#038D63",
                                  fontWeight: "600",
                                  fontSize: "11px"
                                }}
                              >
                                30% off
                              </span>

                            </div>

                            <div
                              style={{
                                marginTop:
                                  "10px",
                                display:
                                  "flex",
                                gap:
                                  "4px",
                              }}
                            >

                              <span
                                style={{
                                  background:
                                    "#038D63",
                                  color:
                                    "#fff",
                                  padding:
                                    "2px 6px",
                                  borderRadius:
                                    "20px",
                                  fontSize:
                                    "10px",
                                }}
                              >
                                4.3 ★
                              </span>

                              <div>
                                <span
                                  style={{
                                    color: "#666",
                                    fontSize: "10px"
                                  }}
                                >
                                  Free Delivery
                                </span>


                              </div>

                            </div>

                            <div
                              style={{
                                marginTop: "12px",
                              }}
                            >
                              {product.stock > 0 ? (

                                <button
                                  className="add-cart-btn"
                                  onClick={() => {

                                    addToCart(product);

                                    alert(
                                      "Product Added To Cart"
                                    );

                                  }}
                                >
                                  Add To Cart
                                </button>

                              ) : (

                                <button
                                  className="out-stock-btn"
                                  disabled
                                >
                                  Out Of Stock
                                </button>

                              )}
                            </div>

                          </div>

                        </div>

                      </div>

                    );
                  })
                )}
              </div> {/* products-grid */}

            </div> {/* products-content */}

          </div> {/* products-layout */}

        </div> {/* container */}

      </div> {/* page wrapper */}

      <Footer />
    </>
  );
}

export default Products;