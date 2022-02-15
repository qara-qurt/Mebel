import React, { useState } from 'react'
import { Nav,  NavDropdown} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import classnames from 'classnames'

export const BurgerMenu = () => {
    const [isVisible,setIsVisible] = useState(false)
    const onVisible = () =>{
        setIsVisible(!isVisible)
        if(!isVisible){
            document.body.style.overflow = "hidden"
        }
        else{
            document.body.style.overflow = ""
        }
    }
    const onSetVisible = () => {
        setIsVisible(!isVisible)
    }
    return (
        <>
            <div className='burger'>
                <input id="menu__toggle" type="checkbox" />
                <label className="menu__btn" htmlFor="menu__toggle" onClick={onVisible}>
                    <span></span>
                </label>
            </div>
            <Nav className={classnames('burger-menu',{'showed':isVisible})}>
                <NavDropdown title='Товары'>
                   <NavDropdown.Item><Link to='/offers' className='sub-menu'onClick={onSetVisible} >Все</Link></NavDropdown.Item> 
                   <NavDropdown.Item><Link to='/cupboards' className='sub-menu' onClick={onSetVisible}>Шкафы</Link></NavDropdown.Item> 
                   <NavDropdown.Item><Link to='/beds' className='sub-menu' onClick={onSetVisible}>Кровати</Link></NavDropdown.Item> 
                   <NavDropdown.Item><Link to='/offers' className='sub-menu' onClick={onSetVisible}>Стулья</Link></NavDropdown.Item> 
                   <NavDropdown.Item><Link to='/offers' className='sub-menu' onClick={onSetVisible}>Кухня</Link></NavDropdown.Item> 
                </NavDropdown>
                <NavDropdown title='Комнаты'>
                   <NavDropdown.Item onClick={onSetVisible}>Гостинная</NavDropdown.Item> 
                   <NavDropdown.Item onClick={onSetVisible}>Спальня</NavDropdown.Item> 
                   <NavDropdown.Item onClick={onSetVisible}>Кухня</NavDropdown.Item> 
                   <NavDropdown.Item onClick={onSetVisible}>Детская</NavDropdown.Item> 
                   <NavDropdown.Item onClick={onSetVisible}>Рабочий кабинет</NavDropdown.Item> 
                   <NavDropdown.Item onClick={onSetVisible}>Прихожая</NavDropdown.Item> 
                </NavDropdown>
                <Nav.Link>Услуги</Nav.Link>
                <Nav.Link>Вдохновление</Nav.Link>
                <Nav.Link ><Link to='/likes' onClick={onSetVisible} className='link'>Избранные</Link></Nav.Link>
                <Nav.Link> <Link to='/cart' onClick={onSetVisible} className='link'>Корзина</Link></Nav.Link>
                <div className='burger-menu__account'>
                <hr/>
                    <Nav.Link to='/cart'>Имя:Name</Nav.Link>
                    <Nav.Link to='/cart'>На счету: 10 000тг</Nav.Link>
                    <Nav.Link to='/cart'>Выйти</Nav.Link>
                </div>
            </Nav>
        </>
    )
}