import React, { useEffect ,useState} from 'react'
import {fadeIn,textVariant} from '../utils/motion'
import {motion} from 'framer-motion'
import { SectionWrapper } from '../hoc'
import apple_icon from '../assets/apple_icon.png'
import dress_icon from '../assets/dress_icon.png'
import earPod_icon from '../assets/earPod_icon.png'
import headPhone_icon from '../assets/headPhone_icon.png'
import shoe_icon from '../assets/shoe_icon.png'
import watch_icon from '../assets/watch_icon.png'
import { useNavigate } from 'react-router-dom'
import { useSelector,useDispatch } from 'react-redux'
import {cartNumberAction} from '../store/cartNumberSlice'

const HomeSection_2 = () => {
  const navigate=useNavigate();
  const dispatch=useDispatch();
  const user=useSelector((state)=>state.user.user)
  const [section2Products,setSection2Products]=useState([]);
  const getSection2=async ()=>{
    let res=await fetch(`http://localhost:8000/api/product/getParticularProducts?belongsTo=section2`,{
            method:"GET",
            headers:{
              "Content-Type":"application/json"
          },
          credentials:'include', 
          })
          let data=await res.json();
          if(res.status===200){
            // console.log('section2Products',data.products);
         
            if(data.products!==undefined){setSection2Products(data.products)}
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
    getSection2()
  },[])
  return (
    <>
    {section2Products.length!==0 && <div className='w-[100%] bg-dimWhite h-auto p-10 my-4 py-15'>
      <div className='flex flex-wrap m-3 justify-around items-center mb-16 mt-10'>
      <div  className='text-[18px] font-medium flex flex-col justify-center items-start'>
        <p>{section2Products[0].name}</p>
        <p>$ <span className='font-bold'>{section2Products[0].price}</span></p>
        <p>⭐⭐⭐</p>

            <motion.div
             whileHover={{
              scale:1.1
            }}
            onClick={()=>{navigate(`/product/${section2Products[0]._id}`)}}
            >
        <img src={`http://localhost:8000/api/product/photo/${section2Products[0]._id}?${Date.now()}`} alt="" className='h-[230px] w-[230px] object-contain cursor-pointer'/>
            </motion.div>
            <span className='text-red-600 text-[14px] mx-auto'>available:- {section2Products[0].quantity}</span>
        <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
        className='h-[35px] rounded-lg text-[17px] px-4 w-auto p-2 text-black bg-green-600 hover:bg-green-700 my-4 mx-auto' onClick={()=>{handleAddCart(section2Products[0]._id)}}>Add To Bucket</motion.button>
      </div>
      <div  className='text-[18px] font-medium flex flex-col justify-center items-start'>
        <p>{section2Products[1].name}</p>
        <p>$ <span className='font-bold'>{section2Products[1].price}</span></p>
        <p>⭐⭐⭐</p>
            <motion.div
            whileHover={{
              scale:1.1
            }}
            onClick={()=>{navigate(`/product/${section2Products[1]._id}`)}}
            >
        <img src={`http://localhost:8000/api/product/photo/${section2Products[1]._id}?${Date.now()}`} alt="" className='h-[230px] w-[230px] object-contain cursor-pointer'/>
            </motion.div>
            <span className='text-red-600 text-[14px] mx-auto'>available:- {section2Products[1].quantity}</span>
            <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
        className='h-[35px] rounded-lg text-[17px] px-4 w-auto p-2 text-black bg-green-600 hover:bg-green-700 my-4 mx-auto' onClick={()=>{handleAddCart(section2Products[1]._id)}}>Add To Bucket</motion.button>
      </div>
      <div 
       
      className='text-[18px] font-medium flex flex-col justify-center items-start'>
        <p>{section2Products[2].name}</p>
        <p>$ <span className='font-bold'>{section2Products[2].price}</span></p>
        <p>⭐⭐⭐</p>
            <motion.div
              whileHover={{
                scale:1.1
              }}
              onClick={()=>{navigate(`/product/${section2Products[2]._id}`)}}
            >
        <img src={`http://localhost:8000/api/product/photo/${section2Products[2]._id}?${Date.now()}`} alt="" className='h-[230px] w-[230px] object-contain cursor-pointer'/>
            </motion.div>
            <span className='text-red-600 text-[14px] mx-auto'>available:- {section2Products[2].quantity}</span>
            <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
        className='h-[35px] rounded-lg text-[17px] px-4 w-auto p-2 text-black bg-green-600 hover:bg-green-700 my-4 mx-auto' onClick={()=>{handleAddCart(section2Products[2]._id)}}>Add To Bucket</motion.button>
      </div>
      </div>

      <div className='flex flex-wrap justify-around items-center mb-16'>
      <div  className='text-[18px] font-medium flex flex-col justify-center items-start'>
        <p>{section2Products[3].name}</p>
        <p>$ <span className='font-bold'>{section2Products[3].price}</span></p>
        <p>⭐⭐⭐</p>
            <motion.div
            whileHover={{
              scale:1.1
            }}
            onClick={()=>{navigate(`/product/${section2Products[3]._id}`)}}
            >
        <img src={`http://localhost:8000/api/product/photo/${section2Products[3]._id}?${Date.now()}`} alt="" className='h-[230px] w-[230px] object-contain cursor-pointer'/>
            </motion.div>
            <span className='text-red-600 text-[14px] mx-auto'>available:- {section2Products[3].quantity}</span>
            <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
        className='h-[35px] rounded-lg text-[17px] px-4 w-auto p-2 text-black bg-green-600 hover:bg-green-700 my-4 mx-auto' onClick={()=>{handleAddCart(section2Products[3]._id)}}>Add To Bucket</motion.button>
      </div>
      <div  className='text-[18px] font-medium flex flex-col justify-center items-start'>
        <p>{section2Products[4].name}</p>
        <p>$ <span className='font-bold'>{section2Products[4].price}</span></p>
        <p>⭐⭐⭐</p>
            <motion.div
              whileHover={{
                scale:1.1
              }}
              onClick={()=>{navigate(`/product/${section2Products[4]._id}`)}}
            >
        <img src={`http://localhost:8000/api/product/photo/${section2Products[4]._id}?${Date.now()}`} alt="" className='h-[230px] w-[230px] object-contain cursor-pointer'/>
            </motion.div>
            <span className='text-red-600 text-[14px] mx-auto'>available:- {section2Products[4].quantity}</span>
            <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
        className='h-[35px] rounded-lg text-[17px] px-4 w-auto p-2 text-black bg-green-600 hover:bg-green-700 my-4 mx-auto' onClick={()=>{handleAddCart(section2Products[4]._id)}}>Add To Bucket</motion.button>
      </div>
      <div  className='text-[18px] font-medium flex flex-col justify-center items-start'>
        <p>{section2Products[5].name}</p>
        <p>$ <span className='font-bold'>{section2Products[5].price}</span></p>
        <p>⭐⭐⭐</p>
            <motion.div
              whileHover={{
                scale:1.1
              }}
              onClick={()=>{navigate(`/product/${section2Products[5]._id}`)}}
            >
        <img src={`http://localhost:8000/api/product/photo/${section2Products[5]._id}?${Date.now()}`} alt="" className='h-[230px] w-[230px] object-contain cursor-pointer'/>
            </motion.div>
            <span className='text-red-600 text-[14px] mx-auto'>available:- {section2Products[4].quantity}</span>
            <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
        className='h-[35px] rounded-lg text-[17px] px-4 w-auto p-2 text-black bg-green-600 hover:bg-green-700 my-4 mx-auto' onClick={()=>{handleAddCart(section2Products[5]._id)}}>Add To Bucket</motion.button>
      </div>
      </div>
      </div>}
    </>
  )
}

// export default HomeSection_2
export default SectionWrapper(HomeSection_2,"HomeSection_2")
