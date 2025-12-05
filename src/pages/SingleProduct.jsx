import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Lottie from 'lottie-react';
import Loadingspinner from '../assets/Loadingspinner.json';
import Breadcrums from '../components/Breadcrums';
import { IoCartOutline } from 'react-icons/io5';
import { useCart } from '../Context/CartContext';


const SingleProduct = () => {
  const params = useParams();
  const [SingleProduct, setSingleProduct] = useState(null);
  const {addToCart} = useCart() 

  const getSingleProduct = async () => {
    try {
      const res = await axios.get(`https://dummyjson.com/products/${params.id}`);
      setSingleProduct(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSingleProduct();
  }, []);

  return (
    <>
      {SingleProduct ? (
        <div className="px-4 pb-4 md:px-0">
          <Breadcrums title={SingleProduct.title} />

          <div className="max-w-6xl mx-auto md:p-6 grid grid-col-1 md:grid-cols-2 gap-10">
            {/* Product Image */}
            <div className="w-full">
              <img
                src={SingleProduct.thumbnail}
                alt={SingleProduct.title}
                className="rounded-2xl w-full object-cover"
              />
            </div>

            {/* Product Details */}
            <div className="flex flex-col gap-6">
              <h1 className="md:text-3xl text-xl font-bold text-gray-800">
                {SingleProduct.title}
              </h1>

              <div className="text-gray-700 font-semibold uppercase">
                {SingleProduct.brand} / {SingleProduct.category} / {SingleProduct.sku}
              </div>

              {/* PRICE Section - FIXED */}
              <p className="text-xl text-red-500 font-bold">
                ${SingleProduct.price}

                <span className="line-through text-gray-700 ml-2">
                  $
                  {Math.round(
                    SingleProduct.price +
                      (SingleProduct.price * SingleProduct.discountPercentage) / 100
                  )}
                </span>

                <span className="bg-red-500 text-white px-4 py-1 rounded-full ml-2">
                  {Math.round(SingleProduct.discountPercentage)} % Off
                </span>
              </p>

              <p className='text-black font-medium'>{SingleProduct.description}</p>

              {/* quantity */}
              <div className='flex items-center gap-4'>
                <label htmlFor="" className='text-sm font-medium text-gray-700'>Quantity</label>
                <input type="number" min={1} value={1} className='w-20 border-gray-300 rounded-lg px-3 py-1 focus:outline-none focus:ring-2 focus:ring-red-500'/>
              </div>
             <div className='flex gap-4 mt-4'>
                <button onClick={()=> addToCart(SingleProduct)} className='bg-red-500 text-white px-6 py-2 flex gap-2 rounded-md font-bold cursor-pointer text-lg'><IoCartOutline className='w-6 h-6'/>Add to Cart</button>
             </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center md:h-[600px] md:w-[900px] mt-10">
          <Lottie animationData={Loadingspinner} className="w-[500px]" />
        </div>
      )}
    </>
  );
};

export default SingleProduct;
