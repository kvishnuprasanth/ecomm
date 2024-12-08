import React ,{useState,useEffect} from 'react'
import { motion } from 'framer-motion'
import {cartNumberAction} from '../store/cartNumberSlice'
import { useNavigate } from 'react-router-dom'
import { useSelector,useDispatch } from 'react-redux'

const LastHome = () => {
  const navigate=useNavigate();
  const dispatch=useDispatch();
  const user=useSelector((state)=>state.user.user)
  const [section6Products,setSection6Products]=useState([]);
  const getSection1=async ()=>{
    let res=await fetch(`http://localhost:8000/api/product/getParticularProducts?belongsTo=section6`,{
            method:"GET",
            headers:{
              "Content-Type":"application/json"
          },
          credentials:'include', 
          })
          let data=await res.json();
          if(res.status===200){
            // console.log(data.products);
         
            if(data.products!==undefined){setSection6Products(data.products)}
          }else{
            window.alert('error in fetching products of section1')
          }
  }
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
  useEffect(()=>{
    getSection1()
    // console.log("section1Products",typeof section1Products);
  },[])
  return (
    <>
    {section6Products.length!==0 && <div className='flex flex-row justify-center items-center my-10'>
    {/* 3watch alexa phone */}
    <div className='bg-white h-auto w-[27vw] m-2 break-words p-4 shadow-xl text-[18px] flex flex-col justify-center items-start'>
        <p className='font-medium'>Smasang kjdf gokkj iokmdf pjkmkdf pokk  pojsdfmf jiop dfgv </p>
        <p className='font-poppins my-1 mt-2'>$ <span className='font-bold'>{section6Products[0].price}</span> </p>
        <p className='my-1'>⭐⭐⭐</p>
        <motion.div
             whileHover={{
              scale:1.1
            }}
            className='h-[250px] m-auto cursor-pointer'
            onClick={()=>{navigate(`/product/${section6Products[0]._id}`)}}
            >

        <img src={`http://localhost:8000/api/product/photo/${section6Products[0]._id}`} alt="" className='h-[250px] m-auto' />
            </motion.div>
            <span className='text-red-600 text-[14px] mx-auto'>available:- {section6Products[0].quantity}</span>
            <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
        className='h-[35px] font-medium rounded-lg text-[17px] px-4 w-auto p-2 text-black bg-green-600 hover:bg-green-700 my-4 mx-auto' onClick={()=>{handleAddCart(section6Products[0]._id)}}>Add To Bucket</motion.button>
    </div>
    <div className='bg-white h-auto w-[27vw] m-2 break-words p-4 shadow-xl text-[18px] flex flex-col justify-center items-start'>
    <p className='font-medium'>Smasang kjdf gokkj iokmdf pjkmkdf pokk  pojsdfmf jiop dfgv </p>
        <p className='font-poppins my-1 mt-2'>$ <span className='font-bold'>{section6Products[1].price}</span> </p>
        <p className='my-1'>⭐⭐⭐⭐</p>
        <motion.div
             whileHover={{
              scale:1.1
            }}
            className='h-[250px] m-auto cursor-pointer'
            onClick={()=>{navigate(`/product/${section6Products[1]._id}`)}}
            >

    <img src={`http://localhost:8000/api/product/photo/${section6Products[1]._id}`} alt="" className='h-[250px] m-auto' />
            </motion.div>
            <span className='text-red-600 text-[14px] mx-auto'>available:- {section6Products[1].quantity}</span>
            <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
        className='h-[35px] font-medium rounded-lg text-[17px] px-4 w-auto p-2 text-black bg-green-600 hover:bg-green-700 my-4 mx-auto' onClick={()=>{handleAddCart(section6Products[1]._id)}}>Add To Bucket</motion.button>
    </div>
    <div className='bg-white h-auto w-[27vw] m-2 break-words p-4 shadow-xl text-[18px] flex flex-col justify-center items-start'>
    <p className='font-medium'>Smasang kjdf gokkj iokmdf pjkmkdf pokk  pojsdfmf jiop dfgv </p>
        <p className='font-poppins my-1 mt-2'>$ <span className='font-bold'>{section6Products[2].price}</span> </p>
        <p className='my-1'>⭐⭐⭐⭐⭐</p>
        <motion.div
             whileHover={{
              scale:1.1
            }}
            className='h-[250px] m-auto cursor-pointer'
            onClick={()=>{navigate(`/product/${section6Products[2]._id}`)}}
            >

    <img src={`http://localhost:8000/api/product/photo/${section6Products[2]._id}`} alt="" className='h-[250px] m-auto'/>
            </motion.div>
            <span className='text-red-600 text-[14px] mx-auto'>available:- {section6Products[2].quantity}</span>
            <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
        className='h-[35px] font-medium rounded-lg text-[17px] px-4 w-auto p-2 text-black bg-green-600 hover:bg-green-700 my-4 mx-auto' onClick={()=>{handleAddCart(section6Products[2]._id)}} >Add To Bucket</motion.button>
    </div>
    </div>}
    </>
  )
}

export default LastHome
