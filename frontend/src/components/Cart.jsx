import React, { useEffect, useState } from 'react'
import apple_icon from '../assets/apple_icon.png'
import { useDispatch, useSelector } from 'react-redux'
import {cartNumberAction} from '../store/cartNumberSlice'
import {cartProductsActions} from '../store/cartProductsSlice'
import CartProduct from './CartProduct'
import {subTotalActions} from '../store/subTotalSlice'
import { useNavigate } from 'react-router-dom'

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


const Cart = () => {
  const navigate=useNavigate()
  const classes=useStyles();
  const [loading,setLoading]=useState(false)
  const user=useSelector(state=>state.user.user)
  const cartProducts=useSelector(state=>state.cartProducts.cartProducts)
 const dispatch=useDispatch()
 const subTotal=useSelector(state=>state.subTotal.subTotal)
 
  const handleCheckOut=async()=>{
    setLoading(true)
    let res= await fetch(`http://localhost:8000/api/stripe/create-checkout-session`,{
          method:'post',
          headers:{
            'Access-Control-Allow-Origin': '*',
            Accept:"application/json",
            "Content-Type":"application/json"
          },
          credentials:'include', 
          body:JSON.stringify({
            userId:user._id
        })
        });
        let data=await res.json();
        if(res.status===200){
          // navigate(data.url)
          setLoading(false)
          window.location.href=data.url
        }
  }
  const getCartProducts=async ()=>{
    setLoading(true)
    let res= await fetch(`http://localhost:8000/api/cart/getProducts`,{
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
          // if(data.products!==undefined)
          dispatch(cartProductsActions.setCartProducts(data.cartProducts))
          dispatch(cartNumberAction.setCartNumber(data.cartProducts.length))
          setSubTotal()
        }
  }
  const setSubTotal=()=>{
    let total=0;
    cartProducts.map((product)=>{
        total+=product.quantity*product.cartProduct.price
    })
    dispatch(subTotalActions.setSubTotal(total))
  }

  const hadleEmptycart=async ()=>{
    setLoading(true)
    let res= await fetch(`http://localhost:8000/api/cart/emptycart`,{
      method:'POST',
      headers:{
        'Access-Control-Allow-Origin': '*',
        Accept:"application/json",
        "Content-Type":"application/json"
      },
      credentials:'include', 
    });
    if(res.status===200){
      setLoading(false)
      getCartProducts();
    }
  }

  useEffect( () => {
    
    getCartProducts()
    
 }, [user]);
  return (
   <>
    <div className='mt-[50px] flex flex-col justify-center items-center font-medium p-12'>
      {cartProducts.length!==0 && cartProducts.map((product,index)=>(
        <CartProduct product={product} index={index}/>
      ))}
      {cartProducts.length!==0 && <div className='flex flex-row items-center justify-between w-[60vw] mt-12'>
        <p className='text-[28px]'>Sub Total:-$ {subTotal}</p>
        <div className='text-white'>
          <button className='h-[35px] rounded-lg bg-pink-700 hover:bg-pink-800 w-[140px] mx-4' onClick={()=>{hadleEmptycart()}}>Empty Cart</button>
          <button className='h-[35px] rounded-lg bg-blue-700 hover:bg-blue-800 w-[140px] mx-4' onClick={()=>{handleCheckOut()}}>Checkout</button>
        </div>

      </div>}
      {cartProducts.length===0 && <p className='text-red-600 mt-[10%] font-medium text-[30px]'>.... Cat is Empty ....</p>}
      <p className='text-[16px] mt-5 text-[#4381fe] hover:text-[#194eb9] hover:underline cursor-pointer' onClick={()=>{navigate('/')}}><span className='text-[30px]'> &larr;</span> Continue shopping</p>
      
    </div>
    {loading && <Backdrop className={classes.backdrop} open>
        <CircularProgress color="inherit" />
      </Backdrop>}
      {/* <Footer/> */}
    </>
  )
}

export default Cart
