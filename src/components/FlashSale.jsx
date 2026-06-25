import { useState, useEffect, useRef } from "react";
import ProductCard from "./ProductCard";
import "./FlashSale.css";

function FlashSale({ products = [] }) {

  const sliderRef = useRef(null);

  const [timeLeft, setTimeLeft] = useState({
    hours: 1,
    minutes: 59,
    seconds: 59,
  });

  /* =========================
     COUNTDOWN TIMER
  ========================= */

  useEffect(() => {

    const timer = setInterval(() => {

      setTimeLeft((prev) => {

        let { hours, minutes, seconds } = prev;

        if (seconds > 0) {

          seconds--;

        } else {

          if (minutes > 0) {

            minutes--;
            seconds = 59;

          } else if (hours > 0) {

            hours--;
            minutes = 59;
            seconds = 59;

          }

        }

        return {
          hours,
          minutes,
          seconds,
        };

      });

    }, 1000);

    return () => clearInterval(timer);

  }, []);

  /* =========================
     MANUAL SCROLL
  ========================= */

  const scrollLeft = () => {

    sliderRef.current?.scrollBy({
      left: -300,
      behavior: "smooth",
    });

  };

  const scrollRight = () => {

    sliderRef.current?.scrollBy({
      left: 300,
      behavior: "smooth",
    });

  };

  return (

    <section className="flash-sale">

      <div className="flash-header">

        <div className="flash-title">
           Flash Sale
        </div>

        <div className="flash-timer">

          <div className="time-box">
            <span>
              {String(timeLeft.hours).padStart(2, "0")}
            </span>
            <small>Hours</small>
          </div>

          <div className="time-box">
            <span>
              {String(timeLeft.minutes).padStart(2, "0")}
            </span>
            <small>Min</small>
          </div>

          <div className="time-box">
            <span>
              {String(timeLeft.seconds).padStart(2, "0")}
            </span>
            <small>Sec</small>
          </div>

        </div>

      </div>

      <button
        className="slider-arrow left"
        onClick={scrollLeft}
      >
        ‹
      </button>

      <div
        className="flash-slider"
        ref={sliderRef}
      >

        {products.map((product) => (

          <div
            className="flash-item"
            key={product._id || product.id}
          >

            <ProductCard
              product={product}
            />

          </div>

        ))}

      </div>

      <button
        className="slider-arrow right"
        onClick={scrollRight}
      >
        ›
      </button>

    </section>

  );

}

export default FlashSale;