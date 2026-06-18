import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import HeroBanner from "../components/HeroBanner";
import CategorySection from "../components/CategorySection";
import FeaturedProducts from "../components/FeaturedProducts";

function Home() {
  return (
    <>
      <Navbar />

      {/* Hero Banner */}
      <HeroBanner />

      {/* Categories */}
      <CategorySection />

      {/* Featured Products */}
      <FeaturedProducts />

      <Footer />
    </>
  );
}

export default Home;