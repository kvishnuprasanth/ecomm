import React from 'react'
import success from '../assets/success.png'
import { useNavigate } from 'react-router-dom'

const CHeckoutSuccess = () => {
  const navigate=useNavigate()
  return (
    <div className='grid place-items-center w-full lg:h-screen h-full
    font-raleway bg-[#F7F7F7]'>
     <div className='max-w-5xl rounded flex flex-col'>
          <span className='text-green-600 text-5xl'>Payment successful</span>
          <span className='text-yellow-600 text-center mt-8 text-2xl font-bold'>
           Your order is in our system
          </span>
          <div className='flex justify-end items-center mx-auto my-24 w-60'>
           <img src={success} alt="success"/>
          </div>
          <div className=' mx-auto'>
          <p className='text-[16px] text-[#4381fe] hover:text-[#194eb9] hover:underline cursor-pointer' onClick={()=>{navigate('/')}}><span className='text-[30px]'> &larr;</span> Continue shopping</p>
          </div>
     </div>
   </div>
  )
}

export default CHeckoutSuccess
