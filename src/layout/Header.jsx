import { Container, Dropdown, Form, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import user from '../assets/img/user.png';
import like from '../assets/img/heart.png';
import basket from '../assets/img/shopping-basket.png';
import Icon from '../assets/img/Icon.png';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { BurgerMenu } from '../components/BurgerMenu';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { logOut } from '../store/reducers/auth';
import useAuth from '../hooks/useAuth';
import { useState } from 'react';
import Search from '../components/Search';
import ModalView from '../components/Modal';

export const Header = () => {
  const { count } = useSelector((state) => state.cart);
  const { likesCount } = useSelector((state) => state.like);
  const dispatch = useDispatch();
  const { isAuth, email } = useAuth();
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const onLogOut = () => {
    dispatch(logOut());
    handleClose();
  };

  const onSearch = async (e) => {
    e.preventDefault();
    navigate(`/offers/?search=${search}`);
  };

  return (
    <>
      <header>
        <Navbar>
          <Container className='header'>
            <Navbar.Brand>
              <Link to='/'>
                <img className='header__icon' src={Icon} alt='' />
              </Link>
            </Navbar.Brand>
            <Nav className='menu'>
              <Nav.Link onClick={() => navigate('/')}>Главная</Nav.Link>
              <NavDropdown title='Товары'>
                <NavDropdown.Item onClick={() => navigate('/offers')}>Все</NavDropdown.Item>
                <NavDropdown.Item onClick={() => navigate('/offers/cupboard')}>
                  Шкафы
                </NavDropdown.Item>
                <NavDropdown.Item onClick={() => navigate('/offers/bed')}>Кровати</NavDropdown.Item>
                <NavDropdown.Item onClick={() => navigate('/offers/couch')}>
                  Диваны
                </NavDropdown.Item>
                <NavDropdown.Item onClick={() => navigate('/offers/chair')}>
                  Стулья
                </NavDropdown.Item>
                <NavDropdown.Item onClick={() => navigate('/offers/chest')}>
                  Комоды
                </NavDropdown.Item>
                <NavDropdown.Item onClick={() => navigate('/offers/rack')}>
                  Стеллажи
                </NavDropdown.Item>
                <NavDropdown.Item onClick={() => navigate('/offers/armchair')}>
                  Кресла
                </NavDropdown.Item>
                <NavDropdown.Item onClick={() => navigate('/offers/table')}>Стол</NavDropdown.Item>
                <NavDropdown.Item onClick={() => navigate('/offers/kid')}>
                  Детская мебель
                </NavDropdown.Item>
              </NavDropdown>
              <Nav.Link>О нас</Nav.Link>
              <Nav.Link>Контакты</Nav.Link>
            </Nav>
            <Form className='d-flex'>
              <Search
                placeholder={'Что вы ищите?'}
                value={search}
                setValue={setSearch}
                onSearch={onSearch}
              />
            </Form>
            <div className='menu-adapt'>
              <div className='icons'>
                <NavDropdown
                  title={<img className='icon' src={user} alt='' />}
                  style={{ width: 80, marginLeft: -10 }}>
                  {isAuth ? (
                    <>
                      <Dropdown.ItemText>{email}</Dropdown.ItemText>
                      <Dropdown.ItemText>Money: 10 000$</Dropdown.ItemText>
                      <NavDropdown.Item>
                        <div onClick={() => navigate('/admin')}>Панель админа</div>
                      </NavDropdown.Item>
                      <NavDropdown.Item>
                        <div onClick={handleShow}>Выйти</div>
                      </NavDropdown.Item>
                    </>
                  ) : (
                    <>
                      <NavDropdown.Item>
                        <Link to={'/login'}>Войти в аккаунт</Link>
                      </NavDropdown.Item>
                    </>
                  )}
                </NavDropdown>
                <Link to='/likes'>
                  <img className='icon' src={like} alt='' />
                  {likesCount > 0 && <span className='cart-count'>{likesCount}</span>}
                </Link>
                <Link to='/cart'>
                  <img className='icon' src={basket} alt='' />
                  {count > 0 && <span className='cart-count'>{count}</span>}
                </Link>
              </div>
              <BurgerMenu />
            </div>
          </Container>
        </Navbar>
      </header>
      <ModalView
        show={show}
        handleClose={handleClose}
        onClick={onLogOut}
        text={'Вы уверены что хотите выйти?'}
      />
    </>
  );
};
