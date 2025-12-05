import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../Context/CartContext'



const ProducListView = ({product}) => {
    const navigate = useNavigate()
    const {addToCart} = useCart()
  return (
    <div className='space-y-4 mt-4 rounded-md'>
     <div className='bg-gray-100 flex gap-7 items-center p-2 rounded-md'>
        <img src={product.thumbnail} alt={product.title} className='md:h-60 md:w-60 h-25 w-25 rounded-md cursor-pointer' onClick={()=>navigate(`/products/${product.id}`)} />

        <div className='space-y-2'>
            <h1 className='font-bold md:text-xl text-lg line-clamp-3 hover:text-red-400 w-full  '>{product.title}</h1>
            <p className='font-semibold flex items-center md:text-lg text-sm'>$<span className='md:text-4xl text-3xl'>{product.price}</span>({product.discountPercentage} % off)</p>
            <p className='text-sm'>Free devlivery <span className='font-semibold'>Fri, 18 Des</span>  <br />
                or fastest delivery <span className='font-semibold'>Wed, 17 Dec</span> </p>
            
            <button onClick={()=>addToCart(product)} className='bg-red-500 text-white px-5 py-2 rounded-md cursor-pointer font-bold '> Add to Cart</button>
        </div>
     </div>

    </div>
  )
}

export default ProducListView
