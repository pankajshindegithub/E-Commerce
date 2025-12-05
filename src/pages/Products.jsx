import React, { useEffect, useState } from 'react';
import { getData } from '../Context/DataContext';
import FilterSection from '../components/FilterSection';
import MobileFilter from '../components/MobileFilter';
import ProductsCard from '../components/ProductsCard';
import Pagination from '../components/Pagination';
import Lottie from 'lottie-react';
import notfound from '../assets/notfound.json';

const Products = () => {
  const { data, fetchAllProducts } = getData();

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [brand, setBrand] = useState("All");
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [page, setPage] = useState(1);
  const [openFilter, setOpenFilter] = useState(false);

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
    setPage(1);
    setOpenFilter(false);
  };

  const handleBrandChange = (e) => {
    setBrand(e.target.value);
    setPage(1);
    setOpenFilter(false);
  };

  const pageHandler = (selectedPage) => {
    setPage(selectedPage);
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    fetchAllProducts();
    window.scrollTo(0, 0);
  }, []);

  // Apply filters
  const filteredProducts = data
    ?.filter(item => item.title.toLowerCase().includes(search.toLowerCase()))
    .filter(item => category === "All" ? true : item.category === category)
    .filter(item => brand === "All" ? true : item.brand === brand)
    .filter(item => item.price >= priceRange[0] && item.price <= priceRange[1]);

  const dynamicPageCount = Math.ceil(filteredProducts?.length / 8);

  return (
    <div className="max-w-6xl mx-auto px-4 mb-10">
      {/* MOBILE FILTER */}
      <MobileFilter
        openFilter={openFilter}
        setOpenFilter={setOpenFilter}
        search={search}
        setSearch={setSearch}
        brand={brand}
        setBrand={setBrand}
        category={category}
        setCategory={setCategory}
        priceRange={priceRange}
        setPriceRange={setPriceRange}
        handleCategoryChange={handleCategoryChange}
        handleBrandChange={handleBrandChange}
      />

      {data?.length > 0 ? (
        <div className="flex gap-8">
          {/* DESKTOP FILTER */}
          <FilterSection
            search={search}
            setSearch={setSearch}
            brand={brand}
            setBrand={setBrand}
            category={category}
            setCategory={setCategory}
            priceRange={priceRange}
            setPriceRange={setPriceRange}
            handleCategoryChange={handleCategoryChange}
            handleBrandChange={handleBrandChange}
          />

          {/* PRODUCTS */}
          <div className="w-full">
            {filteredProducts?.length > 0 ? (
              <>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-7 mt-10">
                  {filteredProducts
                    .slice(page * 8 - 8, page * 8)
                    .map((product, index) => (
                      <ProductsCard key={index} product={product} />
                    ))}
                </div>

                {/* PAGINATION */}
                <div className="flex justify-center mt-6">
                  <Pagination
                    pageHandler={pageHandler}
                    page={page}
                    dynamicPageCount={dynamicPageCount}
                  />
                </div>
              </>
            ) : (
              <div className="flex flex-col justify-center items-center w-full mt-10">
                <Lottie animationData={notfound} className="w-[300px] md:w-[500px] h-[300px] md:h-[500px]" />
                <h1 className="text-center mt-3 text-gray-600 font-semibold">
                  No products match your filters
                </h1>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center md:h-[600px] md:w-[900px] mt-10">
          <Lottie animationData={notfound} className="w-[500px]" />
        </div>
      )}
    </div>
  );
};

export default Products;
