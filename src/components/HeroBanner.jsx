function HeroBanner() {
  return (
    <div
      style={{
        background: "#AFC0DF",
        padding: "120px 20px",
        textAlign: "center",
      }}
    >
      <h1
        style={{
          color: "#082A78",
          fontSize: "60px",
        }}
      >
        Shop Smart With Nakshatra Mart
      </h1>

      <p
        style={{
          fontSize: "22px",
        }}
      >
        Electronics • Fashion • Grocery • Mobiles
      </p>

      <button
        style={{
          background: "#082A78",
          color: "#fff",
          border: "none",
          padding: "15px 35px",
          borderRadius: "10px",
        }}
      >
        Shop Now
      </button>
    </div>
  );
}

export default HeroBanner;