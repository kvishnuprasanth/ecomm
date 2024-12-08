import React, { useEffect, useState } from 'react'
import {OrderItem} from '.'

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

const Orders = () => {
  const [orders,setOrders]=useState([])
  const classes=useStyles();
  const [loading,setLoading]=useState(false)
  const getOrders=async ()=>{
    setLoading(true)
    let res= await fetch(`http://localhost:8000/api/order/getorders`,{
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
      setOrders(data.orders)
      console.log(data.orders);
    }
  }
  useEffect(()=>{
    getOrders()
  },[])
  return (
    <div className='mt-[60px] flex flex-col justify-center items-center'>
      {orders.map((order)=>(
       <OrderItem order={order}/>
      ))}
      {loading && <Backdrop className={classes.backdrop} open>
        <CircularProgress color="inherit" />
      </Backdrop>}
      {/* <Footer/> */}
    </div>
  )
}

export default Orders
