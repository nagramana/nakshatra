import "../styles/category.css";

function CategorySection() {
  const categories = [
    { name: "Mobiles", icon: "📱" },
    { name: "Fashion", icon: "👕" },
    { name: "Electronics", icon: "💻" },
    { name: "Groceries", icon: "🛒" },
    { name: "Beauty", icon: "💄" },
    { name: "Home", icon: "🏠" },
  ];

  return (
    <section className="category-section">
      <h2 className="category-title">
        Shop By Category
      </h2>

      <div className="category-grid">
        {categories.map((item) => (
          <div
            key={item.name}
            className="category-card"
          >
            <div className="category-icon">
              {item.icon}
            </div>

            <h4>{item.name}</h4>
          </div>
        ))}
      </div>
    </section>
  );
}

export default CategorySection;