import React ,{useState,useEffect}from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { EffectCoverflow, Pagination, Navigation } from 'swiper';
import SwipeCard from './SwipeCard'

import computer1_icon from '../assets/computer1_icon.png'
import laptop1_icon from '../assets/laptop1_icon.png'
import mouse1_icon from '../assets/mouse1_icon.png'
import pendrive1_icon from '../assets/pendrive1_icon.png'
import phone1_icon from '../assets/phone1_icon.png'

function SwiperComponent() {
  const [section3Products,setSection3Products]=useState([]);
  const getSection1=async ()=>{
    let res=await fetch(`http://localhost:8000/api/product/getParticularProducts?belongsTo=section3`,{
            method:"GET",
            headers:{
              "Content-Type":"application/json"
          },
          credentials:'include', 
          })
          let data=await res.json();
          if(res.status===200){
            // console.log(data.products);
         
            if(data.products!==undefined){setSection3Products(data.products)}
          }else{
          window.alert('error in fetching products of section1')
          }
  }
  
  useEffect(()=>{
    getSection1()
  },[])
  return (
    <>
    {section3Products.length!==0 && <div className="container">
      <h1 className="heading">Flower Gallery</h1>
      <Swiper
        effect={'coverflow'}
        grabCursor={true}
        centeredSlides={true}
        loop={true}
        slidesPerView={'auto'}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 100,
          modifier: 2.5,
        }}
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
          <SwipeCard id={section3Products[0]._id} src={`http://localhost:8000/api/product/photo/${section3Products[0]._id}`} />
          </div>
          </SwiperSlide>
      
        <SwiperSlide>
        <div className=' mt-5 h-[430px] w-[340px]'>
        <SwipeCard id={section3Products[1]._id} src={`http://localhost:8000/api/product/photo/${section3Products[1]._id}`} />
        </div>
          
        </SwiperSlide>
        <SwiperSlide>
        <div className=' mt-5 h-[430px] w-[340px]'>
        <SwipeCard id={section3Products[2]._id} src={`http://localhost:8000/api/product/photo/${section3Products[2]._id}`} />
        </div>
         
        </SwiperSlide>
       
       
        <SwiperSlide>
        <div className=' mt-5 h-[430px] w-[340px]'>
        <SwipeCard id={section3Products[3]._id} src={`http://localhost:8000/api/product/photo/${section3Products[3]._id}`} />
        </div>
         
        </SwiperSlide>       
        <SwiperSlide>
        <div className=' mt-5 h-[430px] w-[340px]'>
        <SwipeCard id={section3Products[4]._id} src={`http://localhost:8000/api/product/photo/${section3Products[4]._id}`} />
        </div>
        
        </SwiperSlide>
        <div className="slider-controler mt-6">
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

export default SwiperComponent;