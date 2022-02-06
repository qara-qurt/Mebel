import React from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/css'
import 'swiper/css/navigation';

import SwiperCore, {
    Navigation,
    Scrollbar
  } from 'swiper';
import Card from '../components/Card';



SwiperCore.use([Scrollbar,Navigation]);

const Carousel = ({items}) => {
    return (
        <Swiper scrollbar={{
            "hide": true
          }} 
          breakpoints={{
                320:{
                    slidesPerView:1,
                    spaceBetween:30
                },
                768:{
                    slidesPerView:2,
                    spaceBetween:30
                },
                1024:{
                    slidesPerView:3,
                    spaceBetween:30
                },
                1400:{
                    slidesPerView:4,
                    spaceBetween:20
                }
          }}
          centeredSlidesBounds={true}
          slidesPerView={4} 
          spaceBetween={20} 
          navigation
          className="mySwiper">
              {items.map((item)=>{
                  return(
                    <SwiperSlide key={item.id}>
                        <Card title={item.title} description={item.description} price={item.price} img={item.img} id={item.id}/>
                    </SwiperSlide>
                  )
              })}
        </Swiper>
    )
}

export default Carousel
