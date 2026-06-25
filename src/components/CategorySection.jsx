import { useEffect, useState } from "react";
import axios from "axios";
import "./category.css";

const API_URL =
  "https://nakshatra-mart-backend.onrender.com";

function CategorySection({
  selectedCategory,
  setSelectedCategory,
}) {

  const [categories,
    setCategories] =
    useState([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {

    try {

      const response =
        await axios.get(
          `${API_URL}/api/categories`
        );

      setCategories(
        response.data
      );

    } catch (error) {

      console.log(error);

    }
  };

  const getCategoryImage = (
    categoryName
  ) => {

    const name =
      categoryName?.toLowerCase();

    switch (name) {

      case "mobiles":
        return "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500";

      case "electronics":
        return "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=500";

      case "fashion":
      case "cloths":
      case "clothing":
        return "https://images.unsplash.com/photo-1445205170230-053b83016050?w=500";

      case "beauty":
        return "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=500";

      case "groceries":
        return "https://images.unsplash.com/photo-1542838132-92c53300491e?w=500";

      case "home":
        return "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=500";

      default:
        return "https://images.unsplash.com/photo-1556740749-887f6717d7e4?w=500";
    }
  };

  return (

    <section className="category-section">

      <div className="section-header">

        <h2>
          Shop By Category
        </h2>

      </div>

      <div className="category-grid">

        <div
          className={`category-card ${
            selectedCategory === "All"
              ? "active"
              : ""
          }`}
          onClick={() =>
            setSelectedCategory(
              "All"
            )
          }
        >

          <img
            src="https://cdn-icons-png.flaticon.com/512/1170/1170678.png"
            alt="All"
          />

          <h4>All</h4>

        </div>

        {categories.map((cat) => (

          <div
            key={cat._id}
            className={`category-card ${
              selectedCategory ===
              cat.name
                ? "active"
                : ""
            }`}
            onClick={() =>
              setSelectedCategory(
                cat.name
              )
            }
          >

            <img
              src={getCategoryImage(
                cat.name
              )}
              alt={cat.name}
            />

            <h4>
              {cat.name}
            </h4>

          </div>

        ))}

      </div>

    </section>

  );
}

export default CategorySection;