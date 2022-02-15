import React, { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import { useLocation } from 'react-router-dom'
import Card from '../../components/Card';
import { data } from '../../data';
import Layout from '../../layout/Layout';

const OffersContainer = () => {
    const {pathname} = useLocation();
    const [title, setTitle] = useState('Все товары')
    const [items,setItems] = useState([])

    const getTitleFromUrl = (url) =>{
        switch(url){
            case 'cupboards':
                setTitle("Шкафы")
                break
            case 'beds':
                setTitle("Кровати")
                break
        }
    }

    useEffect(()=>{
        let url = pathname.split('/')[2]
        if(url){
            getTitleFromUrl(url)
            //Запрос к бд -->
            // let res = await axios.get("")
        }
        setItems(data)
        return ()=>{
            setTitle("Все товары")
        }
    },[pathname])

    return (
        <Layout>
            <div className="wrapper">
                <div className="content">
                    <Container>
                        <div className="offers">
                            {title}
                            {items.map((item)=>{
                                return <Card key={item.id} title={item.title} description={item.description} price={item.price} img={item.img} id={item.id}/>
                            })}
                        </div>   
                    </Container>
                </div>
            </div>
        </Layout>
    )
}

export default OffersContainer;