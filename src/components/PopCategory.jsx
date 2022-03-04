import { Link } from 'react-router-dom';
import item1 from '../assets/img/item1.avif';
import item2 from '../assets/img/item2.avif';
import item3 from '../assets/img/item3.avif';
import item4 from '../assets/img/item4.avif';
import item5 from '../assets/img/item5.avif';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import SwiperCore, { Scrollbar } from 'swiper';

SwiperCore.use([Scrollbar]);

const typeOfProducts = [
  {
    name: 'Диваны',
    img: item1,
    link: '/offers/couch',
  },
  {
    name: 'Шкафы',
    img: item2,
    link: '/offers/cupboard',
  },
  {
    name: 'Стулья',
    img: item3,
    link: '/offers/chair',
  },
  {
    name: 'Столы',
    img: item4,
    link: '/offers/table',
  },
  {
    name: 'Кровати',
    img: item5,
    link: '/offers/bed',
  },
];

export const PopCategory = () => {
  return (
    <div className='content__pop-category'>
      <h4 className='title'>Популярные категорий</h4>
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
        className='swiper'>
        {typeOfProducts.map((item) => {
          return (
            <SwiperSlide key={item.id}>
              <div className='pop-card__item'>
                <img src={item.img} alt='' />
                <Link to={item.link}>{item.name}</Link>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};
