import { useState, useEffect } from "react";

import "../styles/ProductFilter.css";
function ProductFilter({
  products,
  onFilter,
}) {
  const [search, setSearch] =
    useState("");

  const [category, setCategory] =
    useState("All");

  const [gender, setGender] =
    useState("All");

  const [priceRange, setPriceRange] =
    useState("All");
  const [color, setColor] =
    useState("All");
  const [fabric, setFabric] =
    useState("All");

  const [size, setSize] =
    useState("All");

  const [rating, setRating] =
    useState("All");

  const [occasion, setOccasion] =
    useState("All");

  const categories = [
    "All",
    ...new Set(
      products.map(
        (product) =>
          product.category
      )
    ),
  ];

  const colors = [
    "All",
    ...new Set(
      products
        .map(
          (product) =>
            product.color
        )
        .filter(Boolean)
    ),
  ];

  const fabrics = [
    "All",
    ...new Set(
      products
        .map(
          (product) =>
            product.fabric
        )
        .filter(Boolean)
    ),
  ];
  const sizes = [
    "All",
    ...new Set(
      products
        .map(
          (product) =>
            product.size
        )
        .filter(Boolean)
    ),
  ];

  useEffect(() => {
    let filteredProducts = [
      ...products,
    ];

    // Search Filter
    if (search) {
      filteredProducts =
        filteredProducts.filter(
          (product) =>
            product.name
              .toLowerCase()
              .includes(
                search.toLowerCase()
              )
        );
    }

    // Category Filter
    if (category !== "All") {
      filteredProducts =
        filteredProducts.filter(
          (product) =>
            product.category ===
            category
        );
    }

    // Gender Filter
    if (gender !== "All") {
      filteredProducts =
        filteredProducts.filter(
          (product) =>
            product.gender ===
            gender
        );
    }

    // Price Filter
    if (priceRange === "0-500") {
      filteredProducts =
        filteredProducts.filter(
          (product) =>
            product.price <= 500
        );
    }

    if (priceRange === "500-1000") {
      filteredProducts =
        filteredProducts.filter(
          (product) =>
            product.price > 500 &&
            product.price <= 1000
        );
    }

    if (priceRange === "1000+") {
      filteredProducts =
        filteredProducts.filter(
          (product) =>
            product.price > 1000
        );
    }

    // Color Filter

    if (color !== "All") {
      filteredProducts =
        filteredProducts.filter(
          (product) =>
            product.color === color
        );
    }
    if (fabric !== "All") {
      filteredProducts =
        filteredProducts.filter(
          (product) =>
            product.fabric ===
            fabric
        );
    }
    if (size !== "All") {
      filteredProducts =
        filteredProducts.filter(
          (product) =>
            product.size === size
        );
    }

    onFilter(filteredProducts);

  },
    [
      search,
      category,
      gender,
      priceRange,
      color,
      fabric,
      size,
      rating,
      occasion,
      products,
      onFilter,
    ]);

  return (
    <div>

      {/* CATEGORY */}

      <h5
        style={{
          fontWeight: "700",
          marginBottom: "15px",
          color: "#222",
        }}
      >
        Category
      </h5>

      <input
        type="text"
        className="form-control"
        placeholder="Search"
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
        style={{
          marginBottom: "15px",
        }}
      />

      <div
  style={{
    marginBottom: "20px",
  }}
>
        {categories.map((cat) => (
          <div
            key={cat}
            style={{
              marginBottom: "12px",
            }}
          >
            <label>
              <input
                type="radio"
                name="category"
                value={cat}
                checked={
                  category === cat
                }
                onChange={(e) =>
                  setCategory(
                    e.target.value
                  )
                }
                style={{
                  marginRight: "10px",
                }}
              />

              {cat}
            </label>
          </div>
        ))}
      </div>

      <hr />

      {/* GENDER */}

      <h5
        style={{
          fontWeight: "700",
          marginBottom: "15px",
        }}
      >
        Gender
      </h5>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "10px",
          marginBottom: "20px",
        }}
      >

        <button
          className={`btn ${gender === "Men"
            ? "btn-primary"
            : "btn-light"
            }`}
          onClick={() =>
            setGender("Men")
          }
        >
          Men
        </button>

        <button
          className={`btn ${gender === "Women"
            ? "btn-primary"
            : "btn-light"
            }`}
          onClick={() =>
            setGender("Women")
          }
        >
          Women
        </button>

        <button
          className={`btn ${gender === "Boys"
            ? "btn-primary"
            : "btn-light"
            }`}
          onClick={() =>
            setGender("Boys")
          }
        >
          Boys
        </button>

        <button
          className={`btn ${gender === "Girls"
            ? "btn-primary"
            : "btn-light"
            }`}
          onClick={() =>
            setGender("Girls")
          }
        >
          Girls
        </button>

        <button
          className={`btn ${gender === "All"
            ? "btn-secondary"
            : "btn-light"
            }`}
          onClick={() =>
            setGender("All")
          }
        >
          All
        </button>

      </div>

      <hr />
<h5
  style={{
    fontWeight: "700",
    marginTop: "20px",
    marginBottom: "15px",
  }}
>
  Fabric
</h5>

<select
  className="form-control"
  value={fabric}
  onChange={(e) =>
    setFabric(e.target.value)
  }
>
  {fabrics.map((item) => (
    <option
      key={item}
      value={item}
    >
      {item}
    </option>
  ))}
</select>

<hr />

<h5
  style={{
    fontWeight: "700",
    marginTop: "20px",
    marginBottom: "15px",
  }}
>
  Size
</h5>

<select
  className="form-control"
  value={size}
  onChange={(e) =>
    setSize(e.target.value)
  }
>
  {sizes.map((item) => (
    <option
      key={item}
      value={item}
    >
      {item}
    </option>
  ))}
</select>

<hr />  
      {/* PRICE */}

      <h5
        style={{
          fontWeight: "700",
          marginBottom: "15px",
        }}
      >
        Price
      </h5>

      <select
        className="form-control"
        value={priceRange}
        onChange={(e) =>
          setPriceRange(
            e.target.value
          )
        }
      >
        <option value="All">
          All Prices
        </option>

        <option value="0-500">
          Under ₹500
        </option>

        <option value="500-1000">
          ₹500 - ₹1000
        </option>

        <option value="1000+">
          Above ₹1000
        </option>
      </select>

      <hr />

      <h5
        style={{
          fontWeight: "700",
          marginTop: "20px",
          marginBottom: "15px",
        }}
      >
        Color
      </h5>

      <select
        className="form-control"
        value={color}
        onChange={(e) =>
          setColor(e.target.value)
        }
      >
        {colors.map((item) => (
          <option
            key={item}
            value={item}
          >
            {item}
          </option>
        ))}
      </select>

      <hr />

      {/* {[
        "Fabric",
        "Size",
        "Rating",
        "Occasion",
        "Combo",
        "Discount",
        "Material",
        "Fit / Shape",
        "Bottom Length",
      ].map((item) => (
        
      ))} */}

    </div>
  );
}

export default ProductFilter;