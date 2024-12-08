import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {cartNumberAction} from '../store/cartNumberSlice'
import {subTotalActions} from '../store/subTotalSlice'

const CartProduct = ({product}) => {
    const navigate=useNavigate()
    const dispatch=useDispatch()
    
    const [productPrice,setProductPrice]=useState(product.quantity*product.cartProduct.price);
    const [productQyt,setProductQyt]=useState(product.quantity);
    const removeItemFremCart=async (event,id,productPrice,qyt)=>{
        let res= await fetch(`http://localhost:8000/api/cart/deleteProduct/${id}`,{
              method:'post',
              headers:{
                'Access-Control-Allow-Origin': '*',
                Accept:"application/json",
                "Content-Type":"application/json"
              },
              credentials:'include', 
            });
            if(res.status===200){
              // console.log(event.target);
              event.target.parentElement.parentElement.parentElement.classList.add('hidden');
              console.log(event.target.parentElement);
              dispatch(cartNumberAction.setdec(1))
              dispatch(subTotalActions.decSubTotal(parseInt(productPrice*qyt)))
            }
      }
      const handleqyt=async (type)=>{
        let res= await fetch(`http://localhost:8000/api/cart/changeqyt?type=${type}&&id=${product._id}`,{
              method:'post',
              headers:{
                'Access-Control-Allow-Origin': '*',
                Accept:"application/json",
                "Content-Type":"application/json"
              },
              credentials:'include', 
            });
            if(res.status===200){
              if(type==='inc'){
                setProductQyt(productQyt+1)
                dispatch(subTotalActions.addSubTotal(parseInt(product.cartProduct.price)))
              }else{
                if(productQyt>1){
                  setProductQyt(productQyt-1)
                dispatch(subTotalActions.decSubTotal(parseInt(product.cartProduct.price)))
                }
              }
            }  
      }
  return (
    <div className='flex flex-row justify-between items-center my-6'>
        <img src={`http://localhost:8000/api/product/photo/${product.cartProduct._id}`} alt="" className='h-[130px] cursor-pointer' onClick={()=>{navigate(`/product/${product.cartProduct._id}`)}}/>
        <div className='w-[550px] ml-6'>
          <p className='font-bold text-[18px]'>{product.cartProduct.name}</p>
          <p className='overflow-clip h-[50px]'>{product.cartProduct.description}</p>
          <p>⭐⭐⭐</p>
         <div className='flex flex-row justify-start items-center'>
          <div className='flex flex-row justify-around p-4 items-center h-[32px] w-[100px] rounded-r-full rounded-s-full mx-4 border-[1px] border-slate-500'>
            <p className={`text-[38px] font-normal mb-3 cursor-pointer ${productQyt<=1?'opacity-20':''}`} onClick={()=>{handleqyt('dec')}}>-</p>
            <p className='text-[18px] font-normal'>{productQyt}</p>
            <p className='text-[28px] font-normal mb-1 cursor-pointer' onClick={()=>{handleqyt('inc')}}>+</p>
          </div>
         <button className='h-[32px] w-[80px] bg-red-600 hover:bg-red-700 rounded-lg my-4' onClick={(event)=>{removeItemFremCart(event,product.cartProduct._id,productQyt,product.cartProduct.price)}}>Remove</button>
         </div>
        </div>
          <p className='mx-4 -mt-20 text-[25px]'>$ <span className='font-medium'>{productQyt*product.cartProduct.price}</span></p> 
      </div>
  )
}

export default CartProduct
