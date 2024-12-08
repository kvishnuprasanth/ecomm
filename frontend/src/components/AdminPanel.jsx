import React from 'react'
import apple_icon from '../assets/apple_icon.png'
import delete_icon from '../assets/delete_icon.png'
import edit_icon from '../assets/edit_icon.png'
import { useSelector,useDispatch } from 'react-redux'
import {createProductForm} from '../store/createProductSlice'

const AdminPanel = () => {
    const dispath=useDispatch();
    const isCreateProductOpen=useSelector(state=>state.isCreateProductFormOpen.isCreateProductOpen)
  return (
    <div className='mt-[10%] flex flex-col justify-center items-center font-medium'>
      <button className='h-[40px] w-[600px] bg-green-600 hover:bg-green-700 rounded-lg'  onClick={()=>{dispath(createProductForm.toggle())}}>Create Product</button>
     <div className='flex flex-row w-[600px] my-4 h-auto justify-between items-center'>
        <img src={apple_icon} alt="" className='h-[100px]'/>
        <div className='flex flex-col w-[66%] mt-4'>
        <p className='font-bold text-[18px]'>apple_icon</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iste vero reiciendis repellendus officiis cumque! Ea corporis, molestiae</p>
        </div>
        <img src={edit_icon} alt="edit" className='h-[25px] cursor-pointer hover:bg-slate-300 rounded-lg'/>
        <img src={delete_icon} alt="delete" className='h-[32px] cursor-pointer hover:bg-red-500 rounded-lg'/>
      </div>
     
    </div>
  )
}

export default AdminPanel
