import { useEffect, useState } from "react";
import axios from "axios";

import Navbar from "../components/Navbar";
import HeroBanner from "../components/HeroBanner";
import TopCategories from "../components/TopCategories";
import FlashSale from "../components/FlashSale";
import TrendingProducts from "../components/TrendingProducts";
import FeaturedProducts from "../components/FeaturedProducts";
import NewArrivals from "../components/NewArrivals";
import Footer from "../components/Footer";

import "../styles/home.css";

const API_URL =
  "https://nakshatra-mart-backend.onrender.com";

function Home() {

  const [products, setProducts] =
    useState([]);

  const [
    selectedCategory,
    setSelectedCategory
  ] = useState("All");

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {

    try {

      const res = await axios.get(
        `${API_URL}/api/products`
      );

      setProducts(res.data || []);

    } catch (error) {

      console.error(
        "Failed to fetch products",
        error
      );

    }

  };

  const flashProducts =
    products.filter(
      (product) =>
        product.showInFlashSale === true
    );

  return (
    <>
      <Navbar />

      <main className="home-page">

        <HeroBanner />

        <TopCategories
          filterCategory={
            setSelectedCategory
          }
        />

        {/* FLASH SALE */}

        <FlashSale
          products={flashProducts}
        />

        {/* PRODUCTS SECTION */}

        <div id="products-section">

          <TrendingProducts
            selectedCategory={
              selectedCategory
            }
          />

          <FeaturedProducts
            selectedCategory={
              selectedCategory
            }
          />

          <NewArrivals
            selectedCategory={
              selectedCategory
            }
          />

        </div>

      </main>

      <Footer />
    </>
  );

}

export default Home;