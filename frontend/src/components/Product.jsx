import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import apple_icon from '../assets/apple_icon.png'
import delete_icon from '../assets/delete_white.png'
import avatar from '../assets/avatar.png'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useSelector,useDispatch } from 'react-redux'
import {cartNumberAction} from '../store/cartNumberSlice'
// import '../order.css'

//back drop
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

const Product = () => {
    const navigate=useNavigate();
    const classes=useStyles();
    const [loading,setLoading]=useState(false)
  const dispatch=useDispatch();
  const user=useSelector((state)=>state.user.user)
    const [product,setProduct]=useState({})
    const [reviews,setReview]=useState([])
    const [content,setContent]=useState('')
    const {id}=useParams()
    const getProductDetails=async ()=>{
      setLoading(true)
        let res= await fetch(`http://localhost:8000/api/product/getProductDetails/${id}`,{
            method:'GET',
            headers:{
              'Access-Control-Allow-Origin': '*',
              Accept:"application/json",
              "Content-Type":"application/json"
            },
            credentials:'include', 
          });
          let data=await res.json();
          if(res.status===200){
            setLoading(false)
            if(product){
              setProduct(data.product);
              setReview(data.product.reviews);
              console.log(data.product);
            }
          }
    }

    const handleDeleteReview=async (e,id)=>{
      let res= await fetch(`http://localhost:8000/api/review/delete/${id}`,{
        method:'POST',
        // mode: 'no-cors',
        headers:{
          'Access-Control-Allow-Origin': '*',
          Accept:"application/json",
          "Content-Type":"application/json"
        },
        credentials:'include', 
      });
      if(res.status===200){
      e.target.parentElement.classList.add('hidden'); 
      // console.log(e);
      }
      else{
        
      }
    }

    const handleAddCart=async (id)=>{
        if(user){
          setLoading(true)
          let res=await fetch(`http://localhost:8000/api/cart/addProduct/${id}`,{
                method:"post",
                headers:{
                  "Content-Type":"application/json"
              },
              credentials:'include', 
              })
              let data=await res.json();
              setLoading(false)
              if(res.status===200){
                // window.alert('added to cart')
                dispatch(cartNumberAction.setinc(1))
              }
    
        }else{
          navigate('/login')
        }
      }

      const handleChange=(e)=>{
        setContent(e.target.value)
      }

      const submit=async ()=>{
        if(user){
          let res=await fetch(`http://localhost:8000/api/review/create`,{
                method:"post",
                headers:{
                  "Content-Type":"application/json"
              },
              credentials:'include', 
              body:JSON.stringify({
                content,product:id
            })
              })
              let data=await res.json();
              if(res.status===200){
                setReview([...reviews,data.review])
                setContent('')
                document.getElementById('reviewLabel').classList.remove('-top-4');
                document.getElementById('reviewLabel').classList.add('top-7');
                document.getElementById('reviewUnderline').classList.remove('w-[80%]');
                document.getElementById('reviewUnderline').classList.add('w-0');
                console.log(data.review);
              }
    
        }else{
          navigate('/login')
        }
      }
    useEffect(()=>{
    getProductDetails();
    console.log(id);
    },[])
  return (
    <div className='mt-[50px] font-medium text-[17px] flex flex-col justify-center items-center'>
      <div className='flex flex-row justify-center items-center mt-[3%]'>
        <img src={`http://localhost:8000/api/product/photo/${id}`}  alt="" className='h-[350px] mx-6'/>
        <div className='w-[450px] flex flex-col mx-12'>
            <p className='text-[21px] font-poppins'>{product.name}</p>
            <p>&nbsp;&nbsp;&nbsp;&nbsp;{product.description}</p>
            <p className='ml-4 mt-6 border-b-2 border-slate-400 '>4⭐⭐⭐⭐<span className='text-[15px] text-[#007185] ml-6 cursor-pointer hover:underline hover:text-[#CC0C39]'>1,065 ratings</span></p>
            <p className='h-[35px] p-2 bg-[#CC0C39] rounded-lg my-4 w-[140px] flex justify-center items-center'>Deal of the Day</p>
            <p className='font-medium text-[25px]'><span className='text-[#CC0C39] font-normal text-[25px]'>-67% &nbsp;</span> $<span className='font-poppins'>{product.price}</span></p>
            <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
        className='h-[35px] rounded-lg text-[17px] px-4 w-[140px] p-2 text-black bg-green-600 hover:bg-green-700 my-4' onClick={()=>{handleAddCart(id)}}>Add To Bucket</motion.button>
        </div>
      </div>
      <div className='w-[60vw] flex flex-col justify-center items-center my-6'>

          <div className='relative  w-[60vw] flex flex-row justify-between p-5 items-center'>
          <label id='reviewLabel' htmlFor='reviewInput' className={`text-black font-medium mb-4 absolute top-7 transition-all duration-300 ease-in-out`}>Your Review</label>
          <input 
          type="text" 
          name='review'
          value={content}
          onChange={handleChange}
          // onBlur={formik.handleBlur}
          // placeholder="write review"
          onFocus={()=>{
            document.getElementById('reviewLabel').classList.remove('top-7');
            document.getElementById('reviewLabel').classList.add('-top-4');
            document.getElementById('reviewUnderline').classList.remove('w-0');
            document.getElementById('reviewUnderline').classList.add('w-[80%]');
          }}
          id='reviewInput'
          className={`placeholder:text-black bg-gray-200 text-black w-[80%] py-4 px-4  rounded-lg outline-none  border-b-2 border-slate-500 font-medium`}
          />
          <div className='w-0 h-[3px] bg-blue-700 absolute bottom-5 transition-all duration-300 ease-in-out' id='reviewUnderline'></div>
       
        <button
        className='h-[35px] rounded-lg text-[17px] px-4 w-auto p-2 text-black bg-green-600 hover:bg-green-700' onClick={submit}>Add Review</button>
          </div>
      </div>
     {reviews.map((review)=>(
       <div className='flex flex-col relative justify-start items-start w-[60vw] p-2 text-[15px]'>
       <div className='flex flex-row justify-center items-center p-2'>
       <img src={avatar} alt="" className='h-[45px] rounded-full mx-2'/>
       <div className='flex flex-col'>
       <p>{review.user.name}</p>
       <p>⭐⭐⭐⭐</p>
       </div>
       </div>
       <p className='mx-9'>{review.content}</p>
        {review.user._id===user._id && <img src={delete_icon} alt="" className='absolute right-[50%] top-4 h-[40px] cursor-pointer' onClick={(e)=>{handleDeleteReview(e,review._id)}}/>}
     </div>
     ))}
      {loading && <Backdrop className={classes.backdrop} open>
        <CircularProgress color="inherit" />
      </Backdrop>}
      {/* <Footer/> */}
    </div>
  )
}

export default Product
