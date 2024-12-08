import * as React from "react";
import { motion } from "framer-motion";
import { filteractions } from "../../store/filterSLice";
import { useSelector,useDispatch} from 'react-redux'
import { useNavigate } from "react-router-dom";

const variants = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -100 }
    }
  },
  closed: {
    y: 50,
    opacity: 0,
    transition: {
      y: { stiffness: 1000 }
    }
  }
};


export const MenuItem = ({name,index}) => {
  const navigate=useNavigate()
  const dispatch=useDispatch()
  const filter=useSelector(state=>state.filter.filter)
  const handleFilter=async (e)=>{
  navigate('/products')
  console.log('filter',filter);
  
  if(e.target.value==='All products'){
    if(document.querySelector('.filterallproducts').checked){
      dispatch(filteractions.setfilter(['men','women','smart watches','wall clocks','alarm clock','border']))
      
    let elements = document.getElementsByClassName('filterproducts');
    for (let i = 0; i < elements.length; i++) {
      elements[i].checked = false;
    }
    }else{
      dispatch(filteractions.reset())
    }
  }else{
    document.querySelector('.filterallproducts').checked = false;
    if(e.target.checked){
      dispatch(filteractions.setfilter([...filter,e.target.value]))
    }else{
      dispatch(filteractions.remove(e.target.value))
    }
  }
  // console.log(document.querySelector('.filterallproducts').checked);
  // console.log(e.target.value);
  console.log('filter',filter);
}

  return (
   <>
    {name!=='border' ? <motion.li
      variants={variants}
    >
      <motion.label className={`${name==='All products'?'ml-[30px]':'ml-[60px]'}  flex my-6 items-center`}>
      <input type="checkbox" className={`mr-6 ${name==='All products'?'filterallproducts h-[17px] w-[17px]':'filterproducts h-[15px] w-[15px]'} `} value={name} onChange={handleFilter}/>
      <motion.p
      whileHover={{ scale: 1.2 }}
      whileTap={{ scale: 0.95 }}
      className={`${name==='All products'?' text-[17px] my-3':' text-[15px]'} cursor-pointer w-[100px] mx-4`}
      >
        {name}</motion.p>
      </motion.label>
    </motion.li>:
    <div >
<span className=" mx-[30px]">

</span>
    </div>
    }
   </>
  );
};


export default MenuItem
