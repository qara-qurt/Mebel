import { Button, Container, Dropdown, Form,  Modal,  Nav, Navbar, NavDropdown } from 'react-bootstrap';
import user from '../assets/img/user.png';
import like from '../assets/img/heart.png';
import basket from '../assets/img/shopping-basket.png';
import Icon from '../assets/img/Icon.png';
import { Link } from 'react-router-dom';
import { BurgerMenu } from '../components/BurgerMenu';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { logOut } from '../store/reducers/auth';
import useAuth from '../hooks/useAuth';
import { useState } from 'react';
import Search from '../components/Search';

export const Header = () => {
    const {count} = useSelector(state => state.cart)
    const dispatch = useDispatch()
    const {isAuth,email} = useAuth()

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const onLogOut = () =>{
      dispatch(logOut())
      handleClose()
    }
    
    return (
      <>
        <header>
        <Navbar>
          <Container className='header'>
            <Navbar.Brand><Link to='/'><img className='header__icon' src={Icon} alt="" /></Link></Navbar.Brand>
              <Nav className='menu'>
                <NavDropdown title='Товары'>
                   <NavDropdown.Item><Link to='/offers' className='sub-menu' >Все</Link></NavDropdown.Item> 
                   <NavDropdown.Item><Link to='/offers/cupboards' className='sub-menu'>Шкафы</Link></NavDropdown.Item> 
                   <NavDropdown.Item><Link to='/offers/beds' className='sub-menu'>Кровати</Link></NavDropdown.Item> 
                </NavDropdown>
                <NavDropdown title='Комнаты'>
                   <NavDropdown.Item>Гостинная</NavDropdown.Item> 
                   <NavDropdown.Item>Спальня</NavDropdown.Item> 
                   <NavDropdown.Item>Кухня</NavDropdown.Item> 
                   <NavDropdown.Item>Детская</NavDropdown.Item> 
                   <NavDropdown.Item>Рабочий кабинет</NavDropdown.Item> 
                   <NavDropdown.Item>Прихожая</NavDropdown.Item> 
                </NavDropdown>
                <Nav.Link>Услуги</Nav.Link>
                <Nav.Link>Вдохновление</Nav.Link>
              </Nav>
                <Form className="d-flex">
                  <Search placeholder={"Что вы ищите?"}/>
                </Form>
                <div className='menu-adapt'>
                  <div className="icons">
                  <NavDropdown title={<img className='icon' src={user} alt="" />} style={{width:80,marginLeft:-10}}>
                      {isAuth
                        ?<>
                          <Dropdown.ItemText>{email}</Dropdown.ItemText>
                          <Dropdown.ItemText>Money: 10 000$</Dropdown.ItemText>
                          <NavDropdown.Item><div onClick={handleShow}>Выйти</div></NavDropdown.Item>
                         </>
                        :<>
                          <NavDropdown.Item><Link to={"/login"}>Войти в аккаунт</Link></NavDropdown.Item>
                        </>
                      }
                  </NavDropdown>
                    <Link to='/likes'><img className='icon' src={like} alt="" /></Link>
                    <Link to='/cart'><img className='icon' src={basket} alt="" />
                    {count>0&&<span className='cart-count'>{count}</span>}
                    </Link>
                  </div>
                  <BurgerMenu />
                </div>
          </Container>
        </Navbar>
      </header>
      <Modal show={show} onHide={handleClose} size="sm">
      <Modal.Header closeButton style={{alignItems:'flex-start'}}>
        <p>Вы уверены что хотите выйти?</p>
      </Modal.Header>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Отмена
        </Button>
        <Button variant="primary" onClick={onLogOut}>
          Да
        </Button>
      </Modal.Footer>
    </Modal>
    </>
    );
};
