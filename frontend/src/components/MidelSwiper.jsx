import React,{useState,useEffect} from 'react'
import { motion } from 'framer-motion'
import {cartNumberAction} from '../store/cartNumberSlice'
import { useNavigate } from 'react-router-dom'
import { useSelector,useDispatch } from 'react-redux'

const MidelSwiper = () => {
  const navigate=useNavigate();
  const dispatch=useDispatch();
  const user=useSelector((state)=>state.user.user)
  const [section4Products,setSection4Products]=useState([]);
  const getSection4=async ()=>{
    let res=await fetch(`http://localhost:8000/api/product/getParticularProducts?belongsTo=section4`,{
            method:"GET",
            headers:{
              "Content-Type":"application/json"
          },
          credentials:'include', 
          })
          let data=await res.json();
          if(res.status===200){
            // console.log(data.products);
         
            if(data.products!==undefined){setSection4Products(data.products)}
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
    window.scrollTo(0,0)
    getSection4()
    // console.log("section1Products",typeof section1Products);
  },[])
  return (
    <>{section4Products.length!==0 && <div className='flex flex-col justify-center items-center mb-7'>
      <div className='flex flex-row justify-center items-center'>
        <div  className='bg-white h-auto w-[40vw] m-3 break-words p-4 shadow-xl text-[18px] flex flex-col justify-center items-start'>
        <p className='font-medium'>Smasang kjdf gokkj iokmdf pjkmkdf pokk  pojsdfmf jiop dfgv </p>
            <p className='font-poppins my-1 mt-2'>$ <span className='font-bold'>{section4Products[0].price}</span> </p>
            <p className='my-1'>⭐⭐⭐</p>
            <motion.div
             whileHover={{
              scale:1.1
            }}
            className='h-[250px] m-auto cursor-pointer'
            onClick={()=>{navigate(`/product/${section4Products[0]._id}`)}}
            >

            <img src={`http://localhost:8000/api/product/photo/${section4Products[0]._id}`} alt="" className='h-[250px] m-auto'/>
            </motion.div>
            <span className='text-red-600 text-[14px] mx-auto'>available:- {section4Products[0].quantity}</span>
            <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
        className='h-[35px] font-medium rounded-lg text-[17px] px-4 w-auto p-2 text-black bg-green-600 hover:bg-green-700 my-4 mx-auto' onClick={()=>{handleAddCart(section4Products[0]._id)}}>Add To Bucket</motion.button>
        </div>
        <div className='bg-white h-auto w-[40vw] m-3 break-words p-4 shadow-xl text-[18px] flex flex-col justify-center items-start'>
        <p className='font-medium'>Smasang kjdf gokkj iokmdf pjkmkdf pokk  pojsdfmf jiop dfgv </p>
            <p className='font-poppins my-1 mt-2'>$ <span className='font-bold'>{section4Products[1].price}</span> </p>
            <p className='my-1'>⭐⭐⭐</p>
            <motion.div
             whileHover={{
              scale:1.1
            }}
            className='h-[250px] m-auto cursor-pointer'
            onClick={()=>{navigate(`/product/${section4Products[1]._id}`)}}
            >

            <img src={`http://localhost:8000/api/product/photo/${section4Products[1]._id}`} alt="" className='h-[250px] m-auto'/>
            </motion.div>
            <span className='text-red-600 text-[14px] mx-auto'>available:- {section4Products[1].quantity}</span>
            <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
        className='h-[35px] font-medium rounded-lg text-[17px] px-4 w-auto p-2 text-black bg-green-600 hover:bg-green-700 my-4 mx-auto' onClick={()=>{handleAddCart(section4Products[1]._id)}}>Add To Bucket</motion.button>
        </div>
        </div>

      <div className='flex flex-row justify-center items-center'>
        {/* 3watch alexa phone */}
        <div className='bg-white h-auto w-[27vw] m-2 break-words p-4 shadow-xl text-[18px] flex flex-col justify-center items-start'>
            <p className='font-medium'>Smasang kjdf gokkj iokmdf pjkmkdf pokk  pojsdfmf jiop dfgv </p>
            <p className='font-poppins my-1 mt-2'>$ <span className='font-bold'>{section4Products[2].price}</span> </p>
            <p className='my-1'>⭐⭐⭐</p>
            <motion.div
             whileHover={{
              scale:1.1
            }}
            className='h-[250px] m-auto cursor-pointer'
            onClick={()=>{navigate(`/product/${section4Products[2]._id}`)}}
            >

            <img src={`http://localhost:8000/api/product/photo/${section4Products[2]._id}`} alt="" className='h-[250px] m-auto' />
            </motion.div>
            <span className='text-red-600 text-[14px] mx-auto'>available:- {section4Products[2].quantity}</span>
            <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
        className='h-[35px] font-medium rounded-lg text-[17px] px-4 w-auto p-2 text-black bg-green-600 hover:bg-green-700 my-4 mx-auto' onClick={()=>{handleAddCart(section4Products[2]._id)}}>Add To Bucket</motion.button>
        </div>
        <div className='bg-white h-auto w-[27vw] m-2 break-words p-4 shadow-xl text-[18px] flex flex-col justify-center items-start'>
        <p className='font-medium'>Smasang kjdf gokkj iokmdf pjkmkdf pokk  pojsdfmf jiop dfgv </p>
            <p className='font-poppins my-1 mt-2'>$ <span className='font-bold'>{section4Products[3].price}</span> </p>
            <p className='my-1'>⭐⭐⭐⭐</p> <motion.div
             whileHover={{
              scale:1.1
            }}
            className='h-[250px] m-auto cursor-pointer'
            onClick={()=>{navigate(`/product/${section4Products[3]._id}`)}}
            >

        <img src={`http://localhost:8000/api/product/photo/${section4Products[3]._id}`} alt="" className='h-[250px] m-auto' />
            </motion.div>
            <span className='text-red-600 text-[14px] mx-auto'>available:- {section4Products[3].quantity}</span>
            <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
        className='h-[35px] font-medium rounded-lg text-[17px] px-4 w-auto p-2 text-black bg-green-600 hover:bg-green-700 my-4 mx-auto' onClick={()=>{handleAddCart(section4Products[3]._id)}}>Add To Bucket</motion.button>
        </div>
        <div className='bg-white h-auto w-[27vw] m-2 break-words p-4 shadow-xl text-[18px] flex flex-col justify-center items-start'>
        <p className='font-medium'>Smasang kjdf gokkj iokmdf pjkmkdf pokk  pojsdfmf jiop dfgv </p>
            <p className='font-poppins my-1 mt-2'>$ <span className='font-bold'>{section4Products[4].price}</span> </p>
            <p className='my-1'>⭐⭐⭐⭐⭐</p>
            <motion.div
             whileHover={{
              scale:1.1
            }}
            className='h-[250px] m-auto cursor-pointer'
            onClick={()=>{navigate(`/product/${section4Products[4]._id}`)}}
            >

        <img src={`http://localhost:8000/api/product/photo/${section4Products[4]._id}`} alt="" className='h-[250px] m-auto'/>
            </motion.div>
            <span className='text-red-600 text-[14px] mx-auto'>available:- {section4Products[4].quantity}</span>
            <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
        className='h-[35px] font-medium rounded-lg text-[17px] px-4 w-auto p-2 text-black bg-green-600 hover:bg-green-700 my-4 mx-auto' onClick={()=>{handleAddCart(section4Products[4]._id)}}>Add To Bucket</motion.button>
        </div>
        </div>

      <div className='flex flex-row justify-center items-center'>
        {/* 1 tv */}
        <div className='bg-white h-auto w-[80vw] m-3 my-12 break-words p-4 shadow-xl text-[18px] flex flex-col justify-center items-start'>
        <p className='font-medium'>Smasang kjdf gokkj iokmdf pjkmkdf pokk  pojsdfmf jiop dfgv </p>
            <p className='font-poppins my-1 mt-2'>$ <span className='font-bold'>{section4Products[5].price}</span> </p>
            <p className='my-1'>⭐⭐⭐⭐⭐</p>
            <motion.div
             whileHover={{
              scale:1.1
            }}
            className='h-[250px] mx-auto my-4 cursor-pointer'
            onClick={()=>{navigate(`/product/${section4Products[5]._id}`)}}
            >
            <img src={`http://localhost:8000/api/product/photo/${section4Products[5]._id}`} alt="" className='h-[300px] w-[80vw] m-auto object-contain'/>
            </motion.div>
            <span className='text-red-600 text-[14px] mx-auto'>available:- {section4Products[5].quantity}</span>
            <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
        className='h-[35px] font-medium rounded-lg text-[17px] px-4 w-auto p-2 text-black bg-green-600 hover:bg-green-700 my-12 mt-24 mx-auto' onClick={()=>{handleAddCart(section4Products[5]._id)}}>Add To Bucket</motion.button>
            
        </div>
      </div>
    </div>}
    </>
  )
}

export default MidelSwiper
