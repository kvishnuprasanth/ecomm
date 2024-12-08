import React,{useState} from 'react'
import { useSelector,useDispatch } from 'react-redux'
import {createProductForm} from '../store/createProductSlice'

const CreatePostForm = () => {
    const dispath=useDispatch();
    const isCreateProductOpen=useSelector(state=>state.isCreateProductFormOpen.isCreateProductOpen)
    const [photo,setPhoto]=useState("")
    const [form,setForm]=useState({
        name:'',
        description:'',
        price:0,
        categery:'',
        quantity:0,
        starts:0,
        belongsTo:''
    })
    

    const handleChange=(e)=>{
        const {name,value} =e.target;
        setForm({...form,[name]:value})
      }
      const handlePostUpload=(e)=>{
        setPhoto(e.target.files[0])
      }
      
     const submit=async ()=>{
      if(photo===''){
          return ;
      }
        const formData = new FormData();
        formData.append('photo', photo);
        formData.append('name', form.name);
        formData.append('description', form.description);
        formData.append('price', form.price);
        formData.append('categery', form.categery);
        formData.append('quantity', form.quantity);
        formData.append('starts', form.starts);
        formData.append('belongsTo', form.belongsTo);
        let res=await fetch(`http://localhost:8000/api/product/createproduct`,{
            method:"POST",
            credentials:'include', 
            body:formData
          })
          let data=await res.json();
          if(res.status===200){
            window.alert('successfully created product');
          }
          else{             
                           
          }
     }
  return (
    <div className={`${isCreateProductOpen?"":"hidden"} transition duration-150 -mt-52 ease-in-out absolute z-40 top-10 left-[10%] sm:left-[30%] h-auto p-12 pb-0 w-[85%] ss:w-[500px] bg-slate-300 border-slate-200 rounded-2xl border-2`}>
    <form action=""  className=' flex flex-col gap-6' enctype="multipart/form-data">
    <label className='flex flex-col'>
            <span className={`text-black font-medium mb-4`}>product name</span>
            <input 
            type="text" 
            name='name'
            value={form.name}
            placeholder="Product Name"
            onChange={handleChange}
            className={`bg-white placeholder:text-black text-black py-4 px-4  rounded-lg outline-none border-none font-medium`}
            />
          </label>
          <label className='flex flex-col'>
          <span className={`text-[#0f3330] font-medium text-[1.125rem] mb-4`}>Product description</span>
          <textarea name="description" className={`p-2 bg-slate-100 resize-none rounded-2xl`} value={form.description}  onChange={handleChange} cols="30" rows="7"></textarea>
        </label>
    <label className='flex flex-col'>
            <span className={`text-black font-medium mb-4`}>product price</span>
            <input 
            type="text" 
            name='price'
            value={form.price}
            onChange={handleChange}
            placeholder="Product Name"
            className={`bg-white placeholder:text-black text-black py-4 px-4  rounded-lg outline-none border-none font-medium`}
            />
          </label>
    <label className='flex flex-col'>
            <span className={`text-black font-medium mb-4`}>product categery</span>
            <input 
            type="text" 
            name='categery'
            value={form.categery}
            onChange={handleChange}
            placeholder="Product Name"
            className={`bg-white placeholder:text-black text-black py-4 px-4  rounded-lg outline-none border-none font-medium`}
            />
          </label>
    <label className='flex flex-col'>
            <span className={`text-black font-medium mb-4`}>product quantity</span>
            <input 
            type="text" 
            name='quantity'
            value={form.quantity}
            onChange={handleChange}
            placeholder="Product Name"
            className={`bg-white placeholder:text-black text-black py-4 px-4  rounded-lg outline-none border-none font-medium`}
            />
          </label>
    <label className='flex flex-col'>
            <span className={`text-black font-medium mb-4`}>product starts</span>
            <input 
            type="text" 
            name='starts'
            value={form.starts}
            onChange={handleChange}
            placeholder="Product Name"
            className={`bg-white placeholder:text-black text-black py-4 px-4  rounded-lg outline-none border-none font-medium`}
            />
          </label>
    <label className='flex flex-col'>
            <span className={`text-black font-medium mb-4`}>product starts</span>
            <input 
            type="text" 
            name='belongsTo'
            value={form.belongsTo}
            onChange={handleChange}
            placeholder="Product belongsTo"
            className={`bg-white placeholder:text-black text-black py-4 px-4  rounded-lg outline-none border-none font-medium`}
            />
          </label>
        <label className='flex flex-col'>
          <span className={`text-black font-medium mb-4`}>Upload Product Photo</span>
          <input id='create_post' className='rounded-full cursor-pointer h-[30px] bg-slate-600 text-[#3ddcf9]' type="file" name='photo'  placeholder="profile picture" onChange={handlePostUpload} />
        </label>
    </form>
    <div className='m-6 mb-3 right-3 font-medium'>
    <button className={`h-[42px] rounded-xl border-2 border-slate-600 w-[80px] m-2 p-1 hover:bg-slate-100`} onClick={()=>{dispath(createProductForm.setFalse());}} >Cancel</button>
      <button className={`h-[42px] rounded-xl w-[80px] m-2 p-1 bg-blue-600 hover:bg-blue-700 text-white`} onClick={submit}>Create</button>
    </div>
      
  </div>
  )
}

export default CreatePostForm
