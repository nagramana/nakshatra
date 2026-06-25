import { useState } from "react";
import "./TopCategories.css";

function TopCategories({
  filterCategory,
}) {

  const [activeCategory,
    setActiveCategory] =
    useState("All");

  const categories = [
    "All",
    "Women",
    "Men",
    "Kids",
    "Electronics",
    "Home",
    "Beauty",
    "Grocery",
  ];

  const handleClick = (
    category
  ) => {

    setActiveCategory(
      category
    );

    if (
      filterCategory
    ) {

      filterCategory(
        category
      );

    }

    setTimeout(() => {

      const section =
        document.getElementById(
          "products-section"
        );

      if (section) {

        section.scrollIntoView({
          behavior:
            "smooth",
          block:
            "start",
        });

      }

    }, 100);

  };

  return (

    <div className="top-categories">

      {categories.map(
        (category) => (

          <button
            key={category}
            className={
              activeCategory ===
              category

                ? "category-btn active"

                : "category-btn"
            }
            onClick={() =>
              handleClick(
                category
              )
            }
          >

            {category}

          </button>

        )
      )}

    </div>

  );

}

export default TopCategories;