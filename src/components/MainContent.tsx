import React, { useEffect, useState } from "react";
import { useFilter } from "./FilterContext";
import { Book, Tally3 } from "lucide-react";
import axios from "axios";
import BookCard from "./BookCard";
import type { Product } from "./ProductPage";

const MainContent = () => {
  const [products, setProducts] = useState<Product[]>([]);

  const [loading, setLoading] = useState<boolean>(false);

  const [filter, setFilter] = useState<string>("all");

  const [currentPage, setCurrentPage] = useState<number>(1);

  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);

  const itemsPerPage = 12;

  const { searchQuery, selectedCategory, minPrice, maxPrice, keyword } =
    useFilter();

  useEffect(() => {
    setLoading(true);

    let url = `https://dummyjson.com/products?limit=${itemsPerPage}&skip=${
      (currentPage - 1) * itemsPerPage
    }`;

    if (keyword) {
      url = `https://dummyjson.com/products/search?q=${keyword}`;
    }

    axios
      .get(url)
      .then((response) => {
        setProducts(response.data.products);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [currentPage, keyword]);

  const getFilteredProducts = () => {
    let filteredProducts = products;

    if (selectedCategory) {
      filteredProducts = filteredProducts.filter(
        (product) => product.category === selectedCategory
      );
    }

    if (minPrice !== undefined) {
      filteredProducts = filteredProducts.filter(
        (product) => product.price >= minPrice
      );
    }

    if (maxPrice !== undefined) {
      filteredProducts = filteredProducts.filter(
        (product) => product.price <= maxPrice
      );
    }

    if (searchQuery) {
      filteredProducts = filteredProducts.filter((product) =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    switch (filter) {
      case "cheap":
        filteredProducts = filteredProducts.sort((a, b) => a.price - b.price);
        break;
      case "expensive":
        filteredProducts = filteredProducts.sort((a, b) => b.price - a.price);
        break;
      case "popular":
        filteredProducts = filteredProducts.sort((a, b) => b.rating - a.rating);
        break;
      default:
        break;
    }

    return filteredProducts;
  };

  const filteredProducts = getFilteredProducts();

  const totalProducts = 100;

  const totalPages = Math.ceil(totalProducts / itemsPerPage);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const getPaginationButtons = () => {
    const buttons: number[] = [];

    let startPage = Math.max(1, currentPage - 2);

    let endPage = Math.min(totalPages, currentPage + 2);

    if (currentPage - 2 < 1) {
      endPage = Math.min(totalPages, endPage + (2 - currentPage));
    }

    if (currentPage + 2 > totalPages) {
      startPage = Math.max(1, startPage - (2 - totalPages - currentPage));
    }

    for (let i = startPage; i <= endPage; i++) {
      buttons.push(i);
    }

    return buttons;
  };

  return (
    <section className="p-5 xl:w-[55rem] lg:w-[55rem] sm:w-[40rem] xs:w-[20rem] ">
      <div className="mb-5">
        <div className="flex flex-col sm:flex-row justify-between items-center">
          <div className="relative mb-5 mt-5">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="border px-4 py-2 rounded-full flex items-center cursor-pointer"
            >
              <Tally3 className="mr-2" />

              {filter === "all"
                ? "Filter"
                : filter.charAt(0).toUpperCase() + filter.slice(1)}
            </button>

            {dropdownOpen && (
              <div className="absolute bg-white border border-gray-300 rounded mt-2 w-full sm:w-40">
                <button
                  className="block px-4 py-2 w-full text-left hover:bg-gray-200 cursor-pointer"
                  onClick={() => setFilter("cheap")}
                >
                  Cheap
                </button>

                <button
                  className="block px-4 py-2 w-full text-left hover:bg-gray-200"
                  onClick={() => setFilter("expensive")}
                >
                  Expensive
                </button>

                <button
                  className="block px-4 py-2 w-full text-left hover:bg-gray-200"
                  onClick={() => setFilter("popular")}
                >
                  Popular
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-4 sm:grid-cols-3 md:grid-cols-4 gap-5">
          {/* BookCard: */}

          {loading ? (
            <p className="col-span-4 text-center my-8">Loading products...</p>
          ) : filteredProducts.length === 0 && !loading ? (
            <p className="col-span-4 text-center my-8">No products found.</p>
          ) : (
            filteredProducts.map((product) => (
              <BookCard
                key={product.id}
                id={product.id}
                title={product.title}
                image={product.thumbnail}
                price={product.price}
              />
            ))
          )}
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center mt-5">
          {/* Previous: */}
          <button
            className="border px-4 py-2 mx-2 rounded-full cursor-pointer"
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
          >
            Previous
          </button>
          {/* Page Numebrs: */}

          <div className="flex flex-wrap justify-center">
            {/* Pagination: */}
            {getPaginationButtons().map((pageNumber) => (
              <button
                key={pageNumber}
                className={`border px-4 py-2 mx-1 rounded-full ${
                  pageNumber === currentPage
                    ? "bg-black text-white"
                    : "cursor-pointer"
                }`}
                onClick={() => handlePageChange(pageNumber)}
              >
                {pageNumber}
              </button>
            ))}
          </div>

          {/* Next: */}
          <button
            className="border px-4 py-2 mx-2 rounded-full cursor-pointer"
            disabled={currentPage === totalPages}
            onClick={() => handlePageChange(currentPage + 1)}
          >
            Next
          </button>
        </div>
      </div>
    </section>
  );
};

export default MainContent;
