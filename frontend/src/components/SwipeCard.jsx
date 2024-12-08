import React from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import {cartNumberAction} from '../store/cartNumberSlice'
import { useSelector,useDispatch } from 'react-redux'

const SwipeCard = ({src,id}) => {
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
    <div  className='h-[100%] w-[100%] flex flex-col justify-center items-start bg-white shadow-xl rounded-xl p-4'>
    <motion.div
    whileHover={{
      scale:1.1
    }}
    className='flex justify-center items-center w-[100%]'
    onClick={()=>{navigate(`/product/${id}`)}}
    >
    <img src={src} alt="" className='h-[75%] object-cover' />
    </motion.div>
      <div className='font-medium text-[18px] w-[100%] flex flex-row justify-between mt-4 items-center px-4 my-2'>
        <p>flower</p>
        <p className='font-medium'>$ <span className='font-bold'>99</span></p>
      </div>
      <p className='px-4'>⭐⭐⭐</p>
      <p className='font-medium text-[18px] flex flex-row justify-between items-center px-4'>description</p>
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
        className='h-[35px] rounded-lg text-[17px] px-4 w-auto p-2 text-black bg-green-600 hover:bg-green-700 my-8 mx-auto' onClick={()=>{handleAddCart(id)}}>Add To Bucket</motion.button>
    </div>
  )
}

export default SwipeCard
