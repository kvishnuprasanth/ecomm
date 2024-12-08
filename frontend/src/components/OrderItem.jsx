import '../order.css'
import React, { useEffect, useState } from 'react'
import downarrow from '../assets/downarrow.png'
import ac_icon from '../assets/ac_icon.png'
import { useNavigate } from 'react-router-dom'

const OrderItem = ({order}) => {
    const navigate=useNavigate()
    const [productOpen,setProductOpen]=useState(false)
    const [SubTotal,setSubTotal]=useState(0)
    const calTotal=()=>{
        let total=0;
        order.products.map((product)=>{
        total+=product.quantity*product.productId.price
    })
    setSubTotal(total)
    }
    useEffect(()=>{
        calTotal()
    },[])
  return (
    <div className='w-[75vw] my-6 bg-slate-200 text-[13px]'>
    <table  className='border-2 border-slate-500'>
  <thead className='border-2 border-black h-[50px]'>
    <th>#PaymentIntentId</th>
    <th>customerId</th>
    <th>Delivery Status</th>
    <th>payment through</th>
    <th>Payment Status</th>
    <th>mobile</th>
  </thead>
  <tbody className='font-medium'>
  <tr className='h-[50px]'>
    <td><p className='bg-violet-400 rounded-l-full rounded-r-full w-[90%] font-medium text-violet-800'>#{order.paymentIntentId}</p></td>
    <td><p>{order.customerId}</p></td>
    <td ><p className='bg-orange-300 rounded-l-full rounded-r-full w-[60%] font-medium text-orange-700'>{order.delivery_status}</p></td>
    <td><p>{order.paymentBy}</p></td>
    <td ><p className='bg-green-400 rounded-l-full rounded-r-full w-[60%] font-medium text-green-800'>{order.payment_status}</p></td>
    <td><p>{order.mobile}</p></td>
  </tr>
  </tbody>
  <tfoot >
    <td colSpan='6'>
    <div className='h-[35px] hover:bg-slate-300 cursor-pointer w-[75vw] flex justify-center items-center font-bold border-t-2 border-slate-500' onClick={()=>{setProductOpen((pre)=>!pre)}}><p>Products</p>
    <img src={downarrow} alt="" className='mx-4'/>
    </div>
    <div className={`${productOpen?`h-auto`:'h-0'} w-[75vw] flex flex-col transition-all duration-300 ease-in-out overflow-hidden`}>
   { order.products.map((product)=>(
         <div className='flex flex-row justify-around px-20'>
         <div className='flex flex-row '>
         <img src={`http://localhost:8000/api/product/photo/${product.productId._id}?${Date.now()}`} alt="" className='h-[100px] cursor-pointer' onClick={()=>{navigate(`/product/${product.productId._id}`)}}/>
          <div className='flex flex-col justify-center items-center'>
          <p className='font-medium'>{product.productId.name}</p>
          <p className='ml-6'>⭐⭐⭐⭐</p>
          </div>
         </div>
          <p  className='font-medium'>qyt:- {product.quantity}</p>
          <div className='flex flex-row justify-center items-center'>
          <p className='font-medium mx-4'>Each:- $ <span className='font-bold'>{product.productId.price}</span></p>
          <p className='font-medium mx-4'>Total:- $ <span className='font-bold'>{product.quantity*product.productId.price}</span></p>
          </div>
      </div>
   ))}
       <div className='flex flex-row mt-8 text-[14.5px]'>
        <div className='w-[50%] font-medium flex flex-col justify-start items-start ml-[15%]'>
        <p>Phone:- {order.mobile}</p>
        <p>Name:- {order.shipping.name}</p>
        <p className='font-bold text-[15px] -ml-2'>Address:-</p>
        <p>City:- {order.shipping.address.city}</p>
        <p>Country:- {order.shipping.address.country}</p>
        <p>Line1:- {order.shipping.address.line1}</p>
        <p>Line2:- {order.shipping.address.line2}</p>
        <p>PostalCode:- {order.shipping.address.postal_code}</p>
        <p>Sate:- {order.shipping.address.state}</p>
        </div>
        <div className='w-[50%] flex flex-col font-medium text-[16px] '>
        <p className='my-2'>Delivery Charges:- $ <span className='font-bold'>{parseInt(order.delivary_charge)/100}</span></p>
        <p className='my-2'>SubTotal :- $ <span className='font-bold'>{SubTotal}</span> </p>
        <p className='my-2'>Total :- $ <span className='font-bold'>{SubTotal+parseInt(order.delivary_charge)/100}</span> </p>
        </div>
       </div>
    </div>
    </td>
  </tfoot>
</table>
      
    </div>
  )
}

export default OrderItem
