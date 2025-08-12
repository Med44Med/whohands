"use client";
import React from "react";
import { useState, useRef } from "react";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import { Pagination } from "swiper/modules";

import { GoArrowLeft, GoArrowRight } from "react-icons/go";

import "swiper/css";
import "swiper/css/pagination";



const Slider = ({ images }: { images: string[] }) => {

  const swiperRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  
  return (
    <div className="relative flex-1 w-full h-full overflow-hidden border-r border-gray-200 bg-gray-100 select-none flex flex-col ">
      <Swiper
        ref={swiperRef}
        onSlideChange={(swiper) => setCurrentIndex(swiper.activeIndex)}
        pagination={{
          clickable: true,
        }}
        speed={300}
        className="mySwiper w-full h-full"
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <div className="h-full w-full flex justify-center items-center">
              <picture>
                <img
                  src={image}
                  alt={`item ${index + 1}`}
                  className="bg-center bg-cover "
                />
              </picture>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className='z-10 absolute top-1/2 left-0 w-full h-10 px-3 justify-between items-center hidden md:flex'>
        <GoArrowLeft onClick={()=>swiperRef?.current?.swiper?.slidePrev()} className={`bg-black size-12 text-white rounded-full text-xs p-3  duration-300  ${currentIndex === 0 ? 'bg-gray-600 cursor-default':'bg-black cursor-pointer'}`}/>
        <GoArrowRight onClick={()=>swiperRef?.current?.swiper?.slideNext()} className={`bg-black size-12 text-white rounded-full text-xs p-3  duration-300  ${currentIndex + 1 === images.length ? 'bg-gray-600 cursor-default':'bg-black cursor-pointer'}`}/>
      </div>
      <div className="h-16 w-full p-5 flex justify-center items-center gap-2 md:gap-5">
        {images.map((image, index) => (
          <div
            key={index}
            onClick={() => swiperRef.current?.swiper?.slideTo(index)}
            className={`w-1/4 aspect-video rounded shadow-xl flex justify-center items-center cursor-pointer border-2 md:border-4 ${
              index === currentIndex ? "border-primary" : "border-transparent"
            }`}
          >
            <picture>
              <img
                src={image}
                alt={`item ${index + 1}`}
                className="bg-center bg-cover h-full w-full"
              />
            </picture>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Slider;
