import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';

import SwiperCore, { Navigation, Scrollbar } from 'swiper';
import Card from '../components/Card';
import Loader from '../components/Loader';
import { useSelector } from 'react-redux';

SwiperCore.use([Scrollbar, Navigation]);

const Carousel = ({ items }) => {
  const { loading } = useSelector((state) => state.products);
  return (
    <>
      {loading ? (
        Array(4)
          .fill(0)
          .map((_, index) => (
            <div key={index} style={{ marginLeft: 20, marginRight: 100 }}>
              <Loader />
            </div>
          ))
      ) : (
        <Swiper
          scrollbar={{
            hide: true,
          }}
          breakpoints={{
            320: {
              slidesPerView: 1,
              spaceBetween: 30,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 30,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 30,
            },
            1400: {
              slidesPerView: 4,
              spaceBetween: 20,
            },
          }}
          centeredSlidesBounds={true}
          slidesPerView={4}
          spaceBetween={20}
          navigation
          className='mySwiper'>
          {items.map((item) => {
            return (
              <SwiperSlide key={item.id}>
                <Card
                  title={item.data.name}
                  description={item.data.description}
                  price={item.data.price}
                  img={item.data.photos[0].photoUrl}
                  id={item.id}
                />
              </SwiperSlide>
            );
          })}
        </Swiper>
      )}
    </>
  );
};

export default Carousel;
