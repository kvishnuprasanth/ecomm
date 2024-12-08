import React,{useState,useEffect} from "react";
import SwipeCard from './SwipeCard'
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import 'swiper/css/navigation';

// import required modules
import { EffectCoverflow, Pagination ,Navigation} from "swiper";

import laptop2_icon from '../assets/laptop2_icon.png'
import laptop3_icon from '../assets/laptop3_icon.png'
import shoe2_icon from '../assets/shoe2_icon.png'
import watch2_icon from '../assets/watch2_icon.png'
import computer2_icon from '../assets/computer2_icon.png'

export default function SwiperComponent2() {
  const [section5Products,setSection5Products]=useState([]);
  const getSection5=async ()=>{
    let res=await fetch(`http://localhost:8000/api/product/getParticularProducts?belongsTo=section5`,{
            method:"GET",
            headers:{
              "Content-Type":"application/json"
          },
          credentials:'include', 
          })
          let data=await res.json();
          if(res.status===200){
            // console.log(data.products);
         
            if(data.products!==undefined){setSection5Products(data.products)}
          }else{
            window.alert('error in fetching products of section1')
          }
  }
  
  useEffect(()=>{
    getSection5()
    // console.log("section1Products",typeof section1Products);
  },[])
  return (
    <>
    {section5Products.length!==0 && <div className="container bg-dimWhite ">
      <Swiper
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        loop={true}
        slidesPerView={"auto"}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        // pagination={true}
        pagination={{ el: '.swiper-pagination', clickable: true }}
        navigation={{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
          clickable: true,
        }}
        modules={[EffectCoverflow, Pagination, Navigation]}
        className="swiper_container"
      >
        <SwiperSlide>
        <div className=' mt-5 h-[430px] w-[340px]'>
        <SwipeCard id={section5Products[0]._id} src={`http://localhost:8000/api/product/photo/${section5Products[0]._id}`} />
        </div>
        </SwiperSlide>
        <SwiperSlide>
        <div className=' mt-5 h-[430px] w-[340px]'>
        <SwipeCard id={section5Products[1]._id} src={`http://localhost:8000/api/product/photo/${section5Products[1]._id}`} />
        </div>
        
        </SwiperSlide>
        
        <SwiperSlide>
        <div className=' mt-5 h-[430px] w-[340px]'>
        <SwipeCard id={section5Products[2]._id} src={`http://localhost:8000/api/product/photo/${section5Products[2]._id}`} />
        </div>
        
        </SwiperSlide>
        <SwiperSlide>
        <div className=' mt-5 h-[430px] w-[340px]'>
        <SwipeCard id={section5Products[3]._id} src={`http://localhost:8000/api/product/photo/${section5Products[3]._id}`} />
        </div>
        
        </SwiperSlide>
        
        <SwiperSlide>
        <div className=' mt-5 h-[430px] w-[340px]'>
        <SwipeCard id={section5Products[4]._id} src={`http://localhost:8000/api/product/photo/${section5Products[4]._id}`} />
        </div>
        
        </SwiperSlide>
        <div className="slider-controler">
          <div className="swiper-button-prev slider-arrow">
            <ion-icon name="arrow-back-outline"></ion-icon>
          </div>
          <div className="swiper-button-next slider-arrow">
            <ion-icon name="arrow-forward-outline"></ion-icon>
          </div>
          <div className="swiper-pagination"></div>
        </div>
      </Swiper>
    </div>}
    </>
  );
}
