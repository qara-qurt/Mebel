import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { productsApi } from '../api/api';

export const IdeaBlock = () => {
  const menu = ['Спальня', 'Гостинная', 'Кухня', 'Рабочий.каб', 'Детская', 'Прихожая'];
  const [currentItems, setCurrentItems] = useState([]);
  const [currentMenu, setCurrentMenu] = useState(menu[0]);
  const navigate = useNavigate();

  const filterProduct = async (type1, type2, type3, type4) => {
    const products = await productsApi.getProducts();
    setCurrentItems(
      products.filter(
        (data) =>
          data.data.type == type1 ||
          data.data.type == type2 ||
          data.data.type == type3 ||
          data.data.type == type4,
      ),
    );
  };

  useEffect(() => {
    switch (currentMenu) {
      case 'Спальня':
        filterProduct('bed', 'cupboard', 'chest', 'rack');
        break;
      case 'Гостинная':
        filterProduct('couch', 'chair', 'armchair', 'rack');
        break;
      case 'Кухня':
        filterProduct('chair', 'cupboard', 'table', 'chest');
        break;
      case 'Рабочий.каб':
        filterProduct('chest', 'cupboard', 'table', 'chair');
        break;
      case 'Детская':
        filterProduct('kid', 'cupboard', 'bed', 'rack');
        break;
      case 'Прихожая':
        filterProduct('chest', 'cupboard', 'chest', 'rack');
        break;
    }
  }, [currentMenu]);

  return (
    <div className='content__ideas'>
      <h4 className='title'>Больше идеи и вдохнавений</h4>
      <div className='ideas__category'>
        {menu.map((val, idx) => {
          return (
            <Link
              to='/'
              onClick={() => setCurrentMenu(val)}
              key={val + idx}
              className={currentMenu == val && 'active'}>
              {val}
            </Link>
          );
        })}
      </div>
      <div className='ideas__photos'>
        {currentItems.map((val, idx) => {
          return (
            <div
              className={idx == 1 ? 'grid-item img-center' : 'grid-item'}
              key={val.id}
              onClick={() => navigate(`item/${val.id}`)}>
              <img src={val.data.photos[0].photoUrl} alt='Спальня' />
            </div>
          );
        })}
      </div>
    </div>
  );
};
