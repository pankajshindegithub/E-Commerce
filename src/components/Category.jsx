import { getData } from '../Context/DataContext';
import { useNavigate } from 'react-router-dom';

const Category = () => {
  const navigate = useNavigate();
  const { data } = getData();

  // ⭐ FIXED FUNCTION NAME + SAFE CHECK
  const getUniqueCategory = (data, property) => {
    if (!data || !Array.isArray(data)) return [];

    let newVal = data.map((item) => item[property]);

    newVal = [ ...new Set(newVal)].slice(0, 6); 
    return newVal;
  };

  // ⭐ FIXED: function name spelled correctly
  const categoryOnlyData = getUniqueCategory(data, "category");

  return (
    <div className="bg-[#101829] ">
      <div className="max-w-7xl flex flex-wrap mx-auto gap-4 items-center justify-center md:justify-around py-7">
        {categoryOnlyData?.map((item, index) => (
          <div key={index}>
            <button
              onClick={() => navigate(`/category/${item}`)}
              className="uppercase bg-gradient-to-r from-red-500 to-purple-500 text-white py-2 px-4 rounded-md cursor-pointer"
            >
              {item}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Category;
