import { Col, Row } from "react-bootstrap"
import CardBasket from "../../components/CardBasket"

const Cart = ({cart,allPrice,onDeleCartItem,onPlusCart,onMinusCart}) => {
    return(
        <Row>
            <h3 style={{fontWeight:600,marginTop:20}}>Корзина</h3>
            <Col lg={8}>
                {cart.map(item=>{
                    return(
                        <CardBasket 
                        key={item.id}
                        item={item}
                        onDeletItem={onDeleCartItem} 
                        plusCart={onPlusCart} 
                        minusCart={onMinusCart}/>
                    )
                })}
            </Col>
            <Col lg={4}>
                <div className="all-price">
                    <h5 className='all-price__title'>Сумма заказа</h5>
                    <div className='all-price__price'>
                        <h5>Общая суммка заказа:</h5><h5>{allPrice}</h5>
                    </div>
                    <div className='all-price__button'>Купть/Заказать</div>
                    </div>
            </Col>
        </Row>
    )
}

export default Cart