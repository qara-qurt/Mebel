import { Col, Row } from "react-bootstrap"
import { Link } from "react-router-dom"
import Cart from '../assets/img/Cart.jpg';

export const PopCategory = () => {
    return(
        <div className="content__pop-category">
            <h4 className='title'>Популярные категроий</h4>
                <Row className='pop-card'>
                    {Array(4).fill(0).map((item,index)=>{
                        return(
                            <Col lg={3} sm={6} key={index}>
                                <div className='pop-card__item'>
                                    <img src={Cart} alt="" />
                                    <Link to='/'>Стулья</Link>
                                </div>
                            </Col>
                        )
                    })}
                </Row>
        </div>
    )
}
