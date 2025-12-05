import React from 'react'
import { IoCartOutline } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../Context/CartContext';

const ProductsCard = ({product}) => {
    const navigate = useNavigate()
    const {addToCart, cartItem} = useCart()
    
    
    
  return (
    <div className='border relative  border-gray-100 rounded-2xl cursor-pointer hover:shadow-2xl transition-all p-2 h-max' >
    
    <img src={product.thumbnail} alt="" className=' aspect-square ' onClick={()=>navigate(`/products/${product.id}`)}/>
    <h1 className='line-clamp-2 p-1 font-semibold'>{product.title}</h1>
    <p className='my-1 text-lg text-gray-800 font-bold'>{product.price}</p>
    <button onClick={()=>addToCart(product)} className='bg-red-500 px-3 py-2  text-white rounded-md w-full cursor-pointer flex gap-2 items-center justify-center font-semibold' ><IoCartOutline className='w-6 h-6' />Add to Cart</button>
    </div>
  )
}

export default ProductsCard;
