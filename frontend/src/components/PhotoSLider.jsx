import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

import "../photoSLider.css";

// import required modules
import {Autoplay, Navigation } from "swiper";

export default function PhotoSLider() {
  const imgStyle={

  }
  return (
    <>
      <Swiper autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }} navigation={true} modules={[Autoplay,Navigation]} className="mySwiper swiper1">
        <SwiperSlide className="swiper-slide1">
        <img
        src="https://cdn.cultofmac.com/wp-content/uploads/2016/07/Prime-Day-Banner.jpg"
        alt="image 1"
        className="h-full w-full object-cover "
        style={{maskImage:`linear-gradient(to bottom, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0))`}}
      />
        </SwiperSlide>
        <SwiperSlide className="swiper-slide1">
        <img
        src="https://storage.sg.content-cdn.io/in-resources/daa13981-2a03-49e2-bd84-cccf2646050b/Images/userimages/banner001.jpg"
        alt="image 2"
        className="h-full w-full object-cover"
      />
        </SwiperSlide>
        <SwiperSlide className="swiper-slide1">
        <img
        src="https://thumbs.dreamstime.com/z/online-shopping-banner-bags-icons-shop-61959143.jpg"
        alt="image 3"
        className="h-full w-full object-cover"
      />
        </SwiperSlide>
      </Swiper>
    </>
  );
}
