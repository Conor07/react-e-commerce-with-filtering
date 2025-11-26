import React, { useEffect, useState } from "react";
import { useFilter } from "./FilterContext";

interface Product {
  category: string;
}

interface FetchResponse {
  products: Product[];
}

const Sidebar = () => {
  const [categories, setCategories] = useState<string[]>([]);

  const [keywords, _] = useState<string[]>([
    "apple",
    "watch",
    "fashion",
    "trend",
    "shoes",
    "shirt",
  ]);

  const {
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    minPrice,
    setMinPrice,
    maxPrice,
    setMaxPrice,
    keyword,
    setKeyword,
  } = useFilter();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("https://dummyjson.com/products");

        const data: FetchResponse = await response.json();

        const uniqueCategories = Array.from(
          new Set(data.products.map((product) => product.category))
        );

        setCategories(uniqueCategories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleMinPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    setMinPrice(value ? parseFloat(value) : undefined);
  };

  const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    setMaxPrice(value ? parseFloat(value) : undefined);
  };

  const handleChangeCategory = (category: string) => {
    setSelectedCategory(category);
  };

  const handleKeywordClick = (keyword: string) => {
    setKeyword(keyword);
  };

  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedCategory("");
    setMinPrice(undefined);
    setMaxPrice(undefined);
    setKeyword("");
  };

  return (
    <div className="w-64 p-5 h-screen">
      <h1 className="text-2xl font-bold mb-10 mt-4">React Store</h1>

      <section>
        <input
          type="text"
          className="border-2 rounded px-2 py-3 w-full sm:mb-2 "
          placeholder="Search Product"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        <div className="flex flex-col justify-center mt-3 items-start">
          <input
            type="text"
            className="border-2 mr-2 px-5 py-3 mb-3 w-full"
            placeholder="Min"
            value={minPrice ?? ""}
            onChange={handleMinPriceChange}
          />

          <input
            type="text"
            className="border-2 mr-2 px-5 py-3 mb-3 w-full"
            placeholder="Max"
            value={maxPrice ?? ""}
            onChange={handleMaxPriceChange}
          />

          {/* Categories */}
          <div className="mb-5">
            <h2 className="text-xl font-semibold mb-3">Categories</h2>

            <section>
              {categories.map((category, idx) => (
                <label key={idx} className="block mb-2">
                  <input
                    type="radio"
                    name="category"
                    className="mr-2 w-[16px] h-[16px] cursor-pointer"
                    value={category}
                    onChange={() => handleChangeCategory(category)}
                    checked={selectedCategory === category}
                  />

                  {category.toUpperCase()}
                </label>
              ))}
            </section>
          </div>

          {/* Keywords: */}

          <div className="mb-5 w-full">
            <h2 className="text-xl font-semibold mb-3 ">
              <div className="">
                {keywords.map((keyword, idx) => (
                  <button
                    key={idx}
                    className="block mb-2 px-4 py-2 w-full text-left border rounded hover:bg-gray-200 cursor-pointer"
                    onClick={() => handleKeywordClick(keyword)}
                  >
                    {keyword.toUpperCase()}
                  </button>
                ))}
              </div>
            </h2>
          </div>
        </div>

        <button
          className="w-full mb-[4rem] py-2 bg-black text-white rounded mt-5 cursor-pointer"
          onClick={handleResetFilters}
        >
          Reset filters
        </button>
      </section>
    </div>
  );
};

export default Sidebar;
