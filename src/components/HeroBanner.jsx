import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./HeroBanner.css";

const API_URL =
  "https://nakshatra-mart-backend.onrender.com";

function HeroBanner() {
  const [ads, setAds] = useState([]);
  const [currentSlide, setCurrentSlide] =
    useState(0);

  useEffect(() => {
    fetchAds();
  }, []);

  const fetchAds = async () => {
    try {
      const res = await axios.get(
        `${API_URL}/api/ads`
      );

      const activeAds =
        res.data.filter(
          (ad) => ad.active
        );

      setAds(activeAds);
    } catch (error) {
      console.error(
        "Error fetching ads:",
        error
      );
    }
  };

  useEffect(() => {
    if (!ads.length) return;

    const interval =
      setInterval(() => {

        setCurrentSlide(
          (prev) =>
            (prev + 1) %
            ads.length
        );

      }, 4000);

    return () =>
      clearInterval(interval);

  }, [ads]);

  if (!ads.length) return null;

  return (
    <section className="hero-section">

      <div
        className="hero-slide"
        style={{
          backgroundImage: `url(${ads[currentSlide].image})`,
        }}
      >

        <div className="hero-overlay">

          <div className="hero-content">

            <h1>
              {ads[currentSlide].title}
            </h1>

            <h2>
              {
                ads[currentSlide]
                  .description
              }
            </h2>

            <Link
              to="/products"
              className="hero-btn"
            >
              {
                ads[currentSlide]
                  .buttonText ||
                "Shop Now"
              }
            </Link>

          </div>

        </div>

      </div>

      <div className="slider-dots">

        {ads.map((_, index) => (

          <span
            key={index}
            className={
              currentSlide === index
                ? "dot active"
                : "dot"
            }
            onClick={() =>
              setCurrentSlide(index)
            }
          />

        ))}

      </div>

    </section>
  );
}

export default HeroBanner;