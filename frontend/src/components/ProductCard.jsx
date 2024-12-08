import React from 'react'
import {Tilt} from 'react-tilt'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import {cartNumberAction} from '../store/cartNumberSlice'
import { useSelector,useDispatch } from 'react-redux'


const ProductCard = ({product,index}) => {
  const navigate=useNavigate()
  const user=useSelector((state)=>state.user.user)
  const dispatch=useDispatch();
  const handleAddCart=async (id)=>{
    if(user){
      let res=await fetch(`http://localhost:8000/api/cart/addProduct/${id}`,{
            method:"post",
            headers:{
              "Content-Type":"application/json"
          },
          credentials:'include', 
          })
          let data=await res.json();
          if(res.status===200){
            // window.alert('added to cart')
            dispatch(cartNumberAction.setinc(1))
          }

    }else{
      navigate('/login')
    }
  }

  return (
     <motion.div 
    whileHover={{
      scale:1.1
    }}
    key={index} className='h-auto flex flex-col w-[250px] justify-center p-2 items-center font-medium bg-white shadow-xl rounded-xl m-6 my-10'>
      <img src={`http://localhost:8000/api/product/photo/${product._id}?${Date.now()}`} alt="" className='h-[230px] w-[230px] object-contain cursor-pointer' onClick={()=>{navigate(`/product/${product._id}`)}}/>
      
      <div className='font-medium text-[18px] w-[100%] flex flex-row justify-between mt-4 items-center px-4 my-2'>
        <p>{product.name}</p>
        <p>$ <span className='font-bold'>{product.price}</span></p>
      </div>
      <div className='flex flex-col justify-start w-[100%] items-start'>
      <p className='px-4'>⭐⭐⭐</p>
     
     <p className='font-poppins flex flex-row justify-between items-center px-4 my-2'>description</p>
      </div>
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
        className='h-[35px] rounded-lg text-[17px] px-4 w-auto p-2 text-black bg-green-600 hover:bg-green-700 my-4 mx-auto' onClick={()=>{handleAddCart(product._id)}}>Add To Bucket</motion.button>
    </motion.div>
  )
}

export default ProductCard
