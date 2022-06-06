import React, { useState } from 'react';
import { Nav, NavDropdown } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import classnames from 'classnames';
import useAuth from '../hooks/useAuth';
import ModalView from './Modal';
import { useDispatch } from 'react-redux';
import { logOut } from '../store/reducers/auth';

export const BurgerMenu = () => {
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();
  const { isAuth, email,role } = useAuth();
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();


  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const onVisible = () => {
    setIsVisible(!isVisible);
    if (!isVisible) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  };
  const onSetVisible = () => {
    setIsVisible(!isVisible);
  };

  const onLogOut = () => {
    dispatch(logOut());
    handleClose();
  };
  return (
    <>
      <div className='burger'>
        <input id='menu__toggle' type='checkbox' />
        <label className='menu__btn' htmlFor='menu__toggle' onClick={onVisible}>
          <span></span>
        </label>
      </div>
      <Nav className={classnames('burger-menu', { showed: isVisible })}>
        <Nav.Link onClick={() => navigate('/')}>Главная</Nav.Link>

        <NavDropdown title='Товары'>
          <NavDropdown.Item
            className='sub-menu'
            onClick={() => {
              navigate('/offers');
              onSetVisible();
            }}>
            Все
          </NavDropdown.Item>
          <NavDropdown.Item
            className='sub-menu'
            onClick={() => {
              navigate('/offers/cupboard');
              onSetVisible();
            }}>
            Шкафы
          </NavDropdown.Item>
          <NavDropdown.Item
            className='sub-menu'
            onClick={() => {
              navigate('/offers/bed');
              onSetVisible();
            }}>
            Кровати
          </NavDropdown.Item>
          <NavDropdown.Item
            className='sub-menu'
            onClick={() => {
              navigate('/offers/couch');
              onSetVisible();
            }}>
            Диваны
          </NavDropdown.Item>
          <NavDropdown.Item
            className='sub-menu'
            onClick={() => {
              navigate('/offers/chair');
              onSetVisible();
            }}>
            Стулья
          </NavDropdown.Item>
          <NavDropdown.Item
            className='sub-menu'
            onClick={() => {
              navigate('/offers/chest');
              onSetVisible();
            }}>
            Комоды
          </NavDropdown.Item>
          <NavDropdown.Item
            className='sub-menu'
            onClick={() => {
              navigate('/offers/rack');
              onSetVisible();
            }}>
            Стеллажи
          </NavDropdown.Item>
          <NavDropdown.Item
            className='sub-menu'
            onClick={() => {
              navigate('/offers/armchair');
              onSetVisible();
            }}>
            Кресла
          </NavDropdown.Item>
          <NavDropdown.Item
            className='sub-menu'
            onClick={() => {
              navigate('/offers/table');
              onSetVisible();
            }}>
            Столы
          </NavDropdown.Item>
          <NavDropdown.Item
            className='sub-menu'
            onClick={() => {
              navigate('/offers/kid');
              onSetVisible();
            }}>
            Детская мебель
          </NavDropdown.Item>
        </NavDropdown>

        <Nav.Link onClick={() => navigate('/about-us')}>О нас</Nav.Link>
        <Nav.Link>
          <Link to='/likes' onClick={onSetVisible} className='link'>
            Избранные
          </Link>
        </Nav.Link>
        <Nav.Link>
          {' '}
          <Link to='/cart' onClick={onSetVisible} className='link'>
            Корзина
          </Link>
        </Nav.Link>
        <div className='burger-menu__account'>
          <hr />
          {isAuth ? (
            <>
              <Nav.Link>Имя:{email}</Nav.Link>
              {role=="ADMIN"&&<Nav.Link
                onClick={() => {
                  navigate('/admin');
                  onSetVisible();
                }}>
                Панель админа
              </Nav.Link>
              }
              <Nav.Link onClick={handleShow}>Выйти</Nav.Link>
            </>
          ) : (
            <Link to='/login'>Войти в акканут</Link>
          )}
        </div>
      </Nav>
      <ModalView
        show={show}
        handleClose={handleClose}
        onClick={onLogOut}
        text={'Вы уверены что хотите выйти?'}
      />
    </>
  );
};
