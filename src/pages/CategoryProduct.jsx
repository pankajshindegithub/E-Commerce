import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import Loading4 from "../assets/Loading4.webm"
import { ChevronLeft } from 'lucide-react';
import ProducListView from '../components/ProducListView';

const CategoryProduct = () => {
  const [searchData, setSearchData] = useState([]);
  const { category } = useParams();
  const navigate = useNavigate()

  const getFilterData = async () => {
    try {
      // ✅ FIXED URL
      const res = await axios.get(
        `https://dummyjson.com/products/category/${category}`
      );

      setSearchData(res.data.products); 
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getFilterData();
    window.scrollTo(0, 0); // Scroll to top when category changes
  }, [category]); // <-- update when category changes

  return (
    <div>
      {
        searchData.length > 0 ? (
          <div className='max-w-6xl mx-auto mt-10 mb-10 px-4'>
          <button onClick={()=>navigate('/') } className='flex px-5 py-2 bg-gray-800 text-white rounded-md cursor-pointer items-center'><ChevronLeft className='w-6 h-6' />Back</button>
          
          {
            searchData.map((product, index)=>{
              return <ProducListView key={index} product={product}/>

            })
          }
          </div>
          

        ) : (
          <div className='flex items-center justify-center h-[400px]'>
            <video muted autoPlay loop>
              <source src={Loading4} type='video/webm' />
            </video>
          
          </div>
        )
      }
         </div>
  );
};

export default CategoryProduct;
