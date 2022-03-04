import React from 'react';
import Layout from '../../layout/Layout';
import iconWhite from '../../assets/img/IconWhite.png';
import Author from '../../assets/img/Author.jpg';
import { Container } from 'react-bootstrap';

const AboutUs = () => {
  return (
    <Layout>
      <div className='about-us'>
        <div className='about-us__banner'>
          <h1>THE STORY OF MEBEL</h1>
          <img src={iconWhite} alt='' />
        </div>
        <Container>
          <div className='about-us__carts'>
            <div className='about-us__cart'>
              <h5>О нас</h5>
              <p>
                Наша компания <span>Mebel</span> занимается продажей мебели по всему Казакстану. Мы
                дорожим каждым нашим клиентом, поэтому высокое качество сервиса - приоритет для нас.
                Хотите купить или обновить свою мебель, значит вы пришли по адресу. Удачной покупки!
              </p>
            </div>
            <div className='about-us__cart'>
              <h5>Наши цели</h5>
              <p>
                Наша цель обеспечить клиента качественным товаром и хорошое впечетление. Наша миссия
                - постоянно развиваться и повышать качество нашей продукци. Делать жизнь - уютнее, а
                людей счасливее!.
              </p>
            </div>
            <div className='about-us__cart'>
              <h5>Контакты</h5>
              <p>
                При каких то вопросов или чего либо еще вы можете обраться к нам <br />
                +7 702 126 31 73 <br /> +7 727 379 52 77 <br />
                serikov.2002.12@gmail.com
              </p>
            </div>
          </div>
          <div className='about-us__author'>
            <img src={Author} alt='' />
            <div className='author__info'>
              <h5>Сериков Диас Ерсаинұлы</h5>
              <p>
                Студен “Инновационный технический колледж”,
                <br />
                разработчик <span>Mebel</span>{' '}
              </p>
            </div>
          </div>
        </Container>
      </div>
    </Layout>
  );
};

export default AboutUs;
