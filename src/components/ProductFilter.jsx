import { useState, useEffect } from "react";

function ProductFilter({
  products,
  onFilter,
}) {
  const [search, setSearch] = useState("");
  const [category, setCategory] =
    useState("All");
  const [sort, setSort] =
    useState("");

  const categories = [
    "All",
    ...new Set(
      products.map(
        (product) => product.category
      )
    ),
  ];

  useEffect(() => {
    let filteredProducts = [...products];

    // Search
    if (search) {
      filteredProducts =
        filteredProducts.filter((product) =>
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
            product.category === category
        );
    }

    // Sorting
    if (sort === "lowToHigh") {
      filteredProducts.sort(
        (a, b) => a.price - b.price
      );
    }

    if (sort === "highToLow") {
      filteredProducts.sort(
        (a, b) => b.price - a.price
      );
    }

    onFilter(filteredProducts);
 }, [
  search,
  category,
  sort,
  products,
]);

  return (
    <div className="card shadow-sm mb-4">
      <div className="card-body">

        <div className="row g-3">

          <div className="col-md-4">
            <input
              type="text"
              className="form-control"
              placeholder="Search Products..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
            />
          </div>

          <div className="col-md-4">
            <select
              className="form-select"
              value={category}
              onChange={(e) =>
                setCategory(e.target.value)
              }
            >
              {categories.map((cat) => (
                <option
                  key={cat}
                  value={cat}
                >
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div className="col-md-4">
            <select
              className="form-select"
              value={sort}
              onChange={(e) =>
                setSort(e.target.value)
              }
            >
              <option value="">
                Sort By
              </option>

              <option value="lowToHigh">
                Price: Low → High
              </option>

              <option value="highToLow">
                Price: High → Low
              </option>
            </select>
          </div>

        </div>

      </div>
    </div>
  );
}

export default ProductFilter;