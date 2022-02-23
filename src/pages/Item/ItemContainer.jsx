import React, { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import { data } from '../../data'
import { useDispatch } from 'react-redux'
import { setCart } from '../../store/reducers/cart'
import Item from './Item'
import Layout from '../../layout/Layout'
import axios from 'axios'
import { useAlert } from 'react-alert'

const ItemContainer = ({}) => {
    const {productId} = useParams()
    const dispatch = useDispatch()
    const [currentProduct,setCurrentProduct] = useState(null)
    const alert = useAlert()

    const onSetToCart = () =>{
        alert.show("Добавлено в корзину!")
        dispatch(setCart(currentProduct))
    }

    useEffect(async() => {
        const url = `https://mebel-f0c71-default-rtdb.europe-west1.firebasedatabase.app/products/${productId}.json`
        try{
           const response = await axios.get(url)
           if(response.status == '200'){
                setCurrentProduct(response.data)
           }
        }catch(error){
            throw Error(error);
        }
    }, [])

    return (
        <Layout>
            <div className="item">
                <Container>
                {currentProduct!=null&&<Item currentProduct={currentProduct} onSetToCart={onSetToCart}/>}
                </Container>
            </div>
        </Layout>
    )
}

export default ItemContainer;