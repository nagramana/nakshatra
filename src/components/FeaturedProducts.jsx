import ProductCard from "./ProductCard";
import products from "../data/products";

function FeaturedProducts() {
  return (
    <div className="row">
      {products.map((product) => (
        <div
          key={product.id}
          className="col-lg-4 col-md-6 mb-4"
        >
          <ProductCard product={product} />
        </div>
      ))}
    </div>
  );
}

export default FeaturedProducts;