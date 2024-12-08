import React, { useEffect, useState } from 'react'
import {ProductCard} from '.'
import { useSelector,useDispatch } from 'react-redux'

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

const Products = () => {
    const [allProducts,setAllProducts]=useState([]);
    const classes=useStyles();
    const [loading,setLoading]=useState(false)
    const filter=useSelector(state=>state.filter.filter)
    const getallproducts=async ()=>{
      setLoading(true)
        let res=await fetch(`http://localhost:8000/api/product/getallproducts`,{
            method:"GET",
            headers:{
              "Content-Type":"application/json"
          },
          credentials:'include', 
          })
          let data=await res.json();
          if(res.status===200){
            setLoading(false)
            setAllProducts(data.allproducts);
            console.log(data.allproducts);
          }
    }
    useEffect(()=>{
        getallproducts();
    },[filter.length])
  return (
    <div className='m-[50px] flex flex-wrap p-12 justify-center items-center'>
      {allProducts.map((product,index)=>(
        <>
        {/* {console.log(filter.includes(product.categery))} */}
      {filter.includes(product.categery) && <ProductCard product={product} index={index}/>}
        </>
        ))}
        {loading && <Backdrop className={classes.backdrop} open>
        <CircularProgress color="inherit" />
      </Backdrop>}
      {/* <Footer/> */}
    </div>
  )
}

export default Products
