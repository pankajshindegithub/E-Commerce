import { getData } from '../Context/DataContext';

const FilterSection = ({
  search,
  setSearch,
  brand,
  setBrand,
  category,
  setCategory,
  priceRange,
  setPriceRange,
  handleCategoryChange,
 handleBrandChange
}) => {

  const { categoryOnlyData, brandOnlyData } = getData();

  const handleReset = () => {
    setSearch("");
    setCategory("All");
    setBrand("All");
    setPriceRange([0, 5000]);
  };

  return (
    <div className='bg-gray-100 mt-10 p-4 rounded-md h-max hidden md:block'>

      {/* Search */}
      <input
        type="text"
        value={search}
        placeholder='Search..'
        onChange={(e) => setSearch(e.target.value)}
        className='bg-white p-2 rounded-md border-gray-400 border-2'
      />

      {/* Category */}
      <h1 className="mt-5 font-semibold text-xl">Category</h1>
      <div className="flex flex-col gap-2 mt-3">
        {categoryOnlyData?.map((item, index) => (
          <div key={index} className='flex gap-2'>
            <input
              type="checkbox"
              checked={category === item}
              value={item}
              onChange={handleCategoryChange}
            />
            <button className='cursor-pointer uppercase'>{item}</button>
          </div>
        ))}
      </div>

      {/* Brand */}
      <h1 className="mt-5 font-semibold text-xl mb-3">Brand</h1>
      <select
        className='bg-white w-full p-2 border-gray-200 border-2 rounded-md uppercase'
        value={brand}
        onChange={handleBrandChange}
      >
      <option value="All">All</option>
{brandOnlyData
  ?.filter(item => item !== "All")
  .map((item, index) => (
    <option key={index} value={item}>{item}</option>
))}

      </select>

      {/* Price Range */}
      <h1 className="mt-5 font-semibold text-xl mb-3">Price Range</h1>
      <div className='flex flex-col gap-2'>
        <label>Price Range: ${priceRange[0]} - ${priceRange[1]}</label>

        <input
          type="range"
          min={0}
          max={5000}
          value={priceRange[1]}
          onChange={(e) => setPriceRange([0, Number(e.target.value)])}
        />

        <button
          className='bg-red-500 px-3 py-1 text-white font-semibold rounded-2xl mt-5 cursor-pointer'
          onClick={handleReset}
        >
          Reset Filters
        </button>
      </div>

    </div>
  );
};

export default FilterSection;
