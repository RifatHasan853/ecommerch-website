import axios from "axios";
import { useEffect, useState } from "react";
import ProductCart from "../components/ProductCart";
import Loader from "../components/Loader";

const AllProduct = () => {
  const [itemsPerPage, setItemsPerPage] = useState(9);
  const [currentPage, setCurrentPage] = useState(1);
  const [count, setCount] = useState(0);
  const [filter, setFilter] = useState("");
  const [sort, setSort] = useState("");
  const [search, setSearch] = useState("");
  const [searchText, setSearchText] = useState("");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false); // Loading state

  // Fetch products data
  useEffect(() => {
    const getData = async () => {
      setLoading(true); // Start loading
      const { data } = await axios(
        `${
          import.meta.env.VITE_API_URL
        }/all-products?page=${currentPage}&size=${itemsPerPage}&filter=${filter}&sort=${sort}&search=${search}`
      );
      setProducts(data);
      setLoading(false); // End loading
    };
    getData();
  }, [currentPage, filter, itemsPerPage, search, sort]);

  // Fetch products count
  useEffect(() => {
    const getCount = async () => {
      const { data } = await axios(
        `${import.meta.env.VITE_API_URL}/products-count?filter=${filter}&search=${search}`
      );
      setCount(data.count);
    };
    getCount();
  }, [filter, search]);

  const numberOfPages = Math.ceil(count / itemsPerPage);
  const pages = [...Array(numberOfPages).keys()].map((element) => element + 1);

  const handlePaginationButton = (value) => {
    setCurrentPage(value);
  };

  const handleReset = () => {
    setFilter("");
    setSort("");
    setSearch("");
    setSearchText("");
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setSearch(searchText);
  };

  return (
    <div className="flex justify-center items-center">
      <div className="container mx-auto flex flex-col justify-between">
        <div>
          <div className="flex flex-col md:flex-row justify-center items-center gap-5">
            <div>
              <select
                onChange={(e) => {
                  setFilter(e.target.value);
                  setCurrentPage(1);
                }}
                value={filter}
                className="border p-4 rounded-lg"
              >
                <option value="">Filter By Category</option>
                <option value="Glasses">Glasses</option>
                <option value="Sneaker">Sneaker</option>
                <option value="Watch">Watch</option>
                <option value="Cloth">Cloth</option>
              </select>
            </div>

            <form onSubmit={handleSearch}>
              <div className="flex p-1 overflow-hidden border rounded-lg">
                <input
                  className="px-6 py-2 text-gray-700 placeholder-gray-500 bg-white outline-none"
                  type="text"
                  onChange={(e) => setSearchText(e.target.value)}
                  value={searchText}
                  placeholder="Enter Product Title"
                />
                <button className="px-4 py-3 text-sm font-medium tracking-wider text-gray-100 bg-gray-700 rounded-md hover:bg-gray-600">
                  Search
                </button>
              </div>
            </form>

            <div>
              <select
                onChange={(e) => {
                  setSort(e.target.value);
                  setCurrentPage(1);
                }}
                value={sort}
                className="border p-4 rounded-md"
              >
                <option value="dsc">Descending Order</option>
                <option value="asc">Ascending Order</option>
              </select>
            </div>

            <button onClick={handleReset} className="btn">
              Reset
            </button>
          </div>

          {/* Loader */}
          {loading ? (
            <div className="flex justify-center items-center mt-10">
             <Loader></Loader>
            </div>
          ) : (
            // Display Products
            <div className="grid grid-cols-1 xl:ml-20 lg:ml-12 md:ml-10 ml-8 w-[90%] justify-end gap-8 mt-8 xl:mt-16 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
              {products.map((product) => (
                <ProductCart key={product._id} products={product} />
              ))}
            </div>
          )}
        </div>

        {/* Pagination Section */}
        <div className="flex justify-center mt-12">
          {/* Previous Button */}
          <button
            disabled={currentPage === 1}
            onClick={() => handlePaginationButton(currentPage - 1)}
            className="px-4 py-2 mx-1 text-gray-700 disabled:text-gray-500 capitalize bg-gray-200 rounded-md disabled:cursor-not-allowed hover:bg-blue-500 hover:text-white"
          >
            <div className="flex items-center -mx-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 mx-1 rtl:-scale-x-100"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M7 16l-4-4m0 0l4-4m-4 4h18"
                />
              </svg>
              <span className="mx-1">previous</span>
            </div>
          </button>

          {/* Pagination Numbers */}
          {pages.map((btnNum) => (
            <button
              onClick={() => handlePaginationButton(btnNum)}
              key={btnNum}
              className={`hidden ${
                currentPage === btnNum ? "bg-blue-500 text-white" : ""
              } px-4 py-2 mx-1 transition-colors duration-300 rounded-md sm:inline hover:bg-blue-500 hover:text-white`}
            >
              {btnNum}
            </button>
          ))}

          {/* Next Button */}
          <button
            disabled={currentPage === numberOfPages}
            onClick={() => handlePaginationButton(currentPage + 1)}
            className="px-4 py-2 mx-1 text-gray-700 transition-colors bg-gray-200 rounded-md hover:bg-blue-500 hover:text-white disabled:cursor-not-allowed"
          >
            <div className="flex items-center -mx-1">
              <span className="mx-1">Next</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 mx-1 rtl:-scale-x-100"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AllProduct;
