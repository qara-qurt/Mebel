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
                   <NavDropdown.Item><Link to='/offers' className='sub-menu' >Все</Link></NavDropdown.Item> 
                   <NavDropdown.Item><Link to='/cupboards' className='sub-menu'>Шкафы</Link></NavDropdown.Item> 
                   <NavDropdown.Item><Link to='/beds' className='sub-menu'>Кровати</Link></NavDropdown.Item> 
                   <NavDropdown.Item><Link to='/offers' className='sub-menu'>Стулья</Link></NavDropdown.Item> 
                   <NavDropdown.Item><Link to='/offers' className='sub-menu'>Кухня</Link></NavDropdown.Item> 
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
        </>
    )
}