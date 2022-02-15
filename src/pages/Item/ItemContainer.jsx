import React, { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import { data } from '../../data'
import { useDispatch } from 'react-redux'
import { setCart } from '../../store/reducers/cart'
import Item from './Item'
import Layout from '../../layout/Layout'


const ItemContainer = ({}) => {
    const {productId} = useParams()
    const dispatch = useDispatch()
    const [currentProduct,setCurrentProduct] = useState({})

    const onSetToCart = () =>{
        dispatch(setCart(currentProduct))
    }

    useEffect(() => {
        data.forEach(val=>{
            if(val.id===parseInt(productId)){
                setCurrentProduct(prev=>prev=val)
            }
        })
    }, [currentProduct,productId])

    return (
        <Layout>
            <div className="item">
                <Container>
                <Item currentProduct={currentProduct} onSetToCart={onSetToCart}/>
                </Container>
            </div>
        </Layout>
    )
}

export default ItemContainer;