import React, { useState } from 'react'
import menu from '../assets/menu.svg'
import close from '../assets/close.svg'
import { useSelector,useDispatch} from 'react-redux'
import { sideBar } from '../store/sideBarSlice'
import search_icon from '../assets/search.png'
import cart from '../assets/cart.png'
import address from '../assets/address.png'
import { useNavigate } from 'react-router-dom'
import { SideBar} from '.'
import {userState} from '../store/user'
import { filteractions } from '../store/filterSLice'

const Navbar = () => {
  const navigate=useNavigate()
  const isSideOpen=useSelector((state)=>state.isSideOpen.isSideOpen)
  const user=useSelector((state)=>state.user.user)
  const dispatch=useDispatch()
  const cartProducts=useSelector(state=>state.cartProducts.cartProducts)
  const cartNo=useSelector(state=>state.cartNumber.cartNumber)
  const [cartNumber,setCartNumber]=useState(cartProducts.length)
  const [search,setSearch]=useState('');

  const calluser=async ()=>{
    try {
      // setLoading(true)
      let res= await fetch(`http://localhost:8000/api/user/getuser`,{
        method:'GET',
        // mode: 'no-cors',
        headers:{
          'Access-Control-Allow-Origin': '*',
          Accept:"application/json",
          "Content-Type":"application/json"
        },
        credentials:'include', 
      });
      let data=await res.json();
      // setLoading(false)
      // console.log(res.status);
      if(res.status===200){
        dispatch(userState.setUser(data.can));
        console.log(data.can);
    }
    else{
      dispatch(userState.unsetUser());
    }
    } catch (err) {
     
    }
  }

  const logout=async ()=>{
    let res= await fetch(`http://localhost:8000/api/user/sign-out`,{
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
      navigate('/');
      calluser();
    }else{      
                       
    }
  }

  const submit=()=>{
    // console.log(search);
    navigate('/products')
    dispatch(filteractions.setfilter([search]))
  }

  const handleChange=(e)=>{
    setSearch(e.target.value);
  }

  const handleEnter=(e)=>{
    // console.log(e.key);
    if(e.key==='Enter'){
      submit();
    }
  }

  return (
    <div className='w-[100vw] h-[50px] fixed top-0 text-white bg-black flex items-center justify-around px-2 z-10'>
      <img src={isSideOpen?close:menu} alt="menu" className='h-[35px] w-[34px] cursor-pointer hover:border-[1px] hover:border-white z-[3]' onClick={()=>{dispatch(sideBar.toggle())}}/>
      <SideBar/>
      <div className={`font-medium  cursor-pointer flex flex-wrap hover:border-[1px] hover:border-white justify-center items-center p-2 h-[100%] w-[100px] text-[18px]`} onClick={()=>{navigate('/')}}>E-comerce</div>
      <div className={`flex flex-row h-[90%] px-4 w-[190px] cursor-pointer hover:border-[1px] hover:border-white `}>
       <div className=' flex justify-center items-end -mt-3'> 
       <img src={address} className='h-[20px] w-[20px] ' alt="address-icon" />
       </div>
        <div>
          <p className='opacity-80 text-[15px]'>Hello</p>
          <p className='font-medium -mt-1'>select your address</p>
        </div>
      </div>

      <div className='h-[75%] w-[33%] flex flex-row'>
      <input type="text" className='h-[100%] w-[80%] p-2 px-4 text-black outline-none' placeholder='Search in ecommerce' onChange={handleChange} onKeyUp={handleEnter}/>
      <div className='h-[100%] w-[45px] bg-green-600 hover:bg-green-700 cursor-pointer flex justify-center items-center'>
        <img src={search_icon} alt="search-icon" className='h-[80%]' onClick={submit}/>
      </div>
      </div>

      {!user && <p className='font-medium text-[1.45rem] cursor-pointer flex flex-wrap hover:border-[1px] hover:border-white justify-center items-center p-2 h-[100%] w-[140px]' onClick={()=>{navigate('/login')}}>Hello, sign-in accounts</p>}
     {user && <p className='font-medium text-[18px] hover:text-red-600 cursor-pointer flex flex-wrap hover:border-[1px] hover:border-white justify-center items-center p-2 h-[100%] w-[140px]' onClick={logout}>Sign out</p>}

      <p className='font-medium text-[1.45rem] cursor-pointer flex flex-wrap hover:border-[1px] hover:border-white justify-center items-center p-2 h-[100%] w-[120px]' onClick={()=>{if(user){navigate('/orders')}else{navigate('/login')}}} >Returns<span className='font-bold'>& orders</span></p>

      <div className='relative w-[100px] cursor-pointer flex h-[100%] hover:border-[1px] hover:border-white justify-center items-center' onClick={()=>{if(user){navigate('/cart')}else{navigate('/login')}}}>
        <span className='absolute top-0 flex justify-center items-center right-2 h-[50%] bg-red-600 text-white rounded-full p-2'>{cartNo}</span>
        <img src={cart} alt="cart-icon" className='h-[80%]' />
      </div>

    </div>
  )
}

export default Navbar
