import React, { useEffect, useState } from 'react';
import { Container, Pagination, Spinner } from 'react-bootstrap';
import Search from '../components/Search';
import Layout from '../layout/Layout';
import AdminProductCart from '../components/AdminProducCard';
import Input from '../components/Input';
import LoginButton from '../components/LoginButton';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { fetchCreateProduct } from '../store/reducers/products';
import { useSelector } from 'react-redux';

const Admin = () => {
  const dispatch = useDispatch();
  const {loading} = useSelector(state=>state.products)

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  //Sizes input value
  const [width, setWidth] = useState('');
  const [height, setHeight] = useState('');
  const [depth, setDepth] = useState('');
  //Colors
  const [colors, setColors] = useState('');
  //Material
  const [material, setMaterial] = useState('');
  //photos
  const [photos, setPhotos] = useState([]);
  const [photoUrls,setPhotoUrls] = useState([]);

  const [disabled,setDisabled] = useState(true)

  const nameHandler = (e) =>{
    setName(e.target.value)
  }
  const descriptionHandler = (e) =>{
    setDescription(e.target.value)
  }
  const priceHandler = (e) =>{
    setPrice(e.target.value)
  }
  const widthHandler = (e) =>{
    setWidth(e.target.value)
  }
  const heightHandler = (e) =>{
    setHeight(e.target.value)
  }
  const depthHandler = (e) =>{
    setDepth(e.target.value)
  }
  const colorsHandler = (e) =>{
    setColors(e.target.value)
  }
  const materialHandler = (e) =>{
    setMaterial(e.target.value)
  }

  useEffect(()=>{
    if(name!='' && description!='' && price!='' && width!='' && height!='' && depth!='' && colors!='' && material!='' && photos.length==4 ){
        setDisabled(false)
    }else{
      setDisabled(true)
    }
  },[name,description,price,width,height,depth,colors,material,photos])
  
  const uploadData = async() =>{
    if(photos.length==4){
        photos.forEach(async(photo)=>{
            const formData = new FormData()
            formData.append('file',photo)
            formData.append('upload_preset','f1vguzfd')
            let responseImg = await axios.post('https://api.cloudinary.com/v1_1/mebelproject/image/upload',formData)
            let url = responseImg.data.secure_url
            setPhotoUrls(prev=>[...prev,url])
        })
    }
 ///ОШИБКА СРАЗУ НЕ ОТПАРВЛЯЕТ АССИНХРОНЩИНА
   if(photoUrls.length>1){
    const data = {
        "name":name,
        "description":description,
        "price":price,
        "size":[width,height,depth],
        "colors":colors,
        "material":material,
        "photos":photoUrls
    }
    dispatch(fetchCreateProduct(data))
   }
  }
  const onSubmit = () =>{
    uploadData()
  }
  return (
    <Layout>
        <Container>
            <div className='admin'>
                <div className='admin__products'>
                    <div className='products__header'>
                        <h5>Товары: 100</h5>
                        <div className='products__search'>
                            <Search placeholder={'Поиск'} maxWidth={300}/>
                        </div>
                    </div>
                    <div className='products__carts'>
                        <AdminProductCart />
                        <AdminProductCart />
                        <AdminProductCart />
                        <AdminProductCart />
                        <AdminProductCart />
                        <AdminProductCart />
                        <AdminProductCart />
                        <AdminProductCart />
                        <AdminProductCart />
                    </div>                   
                   <Pagination />
                </div>
                <div className='admin__create'>
                    <div className="create">
                        <h5>Добаваить товар</h5>
                        <div className="create__inputs">
                            <Input name='name'  type='text' placeholder='Назваение' value={name} setValue={nameHandler} /> 
                            <Input name='description'  type='text' placeholder='Описание' value={description} setValue={descriptionHandler} /> 
                            <Input name='price'  type='text' placeholder='Цена' value={price} setValue={priceHandler} /> 
                        </div>
                        <div className="create__inputs-sizes">
                            <h6>Размер:</h6>
                            <Input name='width'  type='text' placeholder='Ширина' value={width} setValue={widthHandler} /> 
                            <Input name='height'  type='text' placeholder='Высота' value={height} setValue={heightHandler} /> 
                            <Input name='depth'  type='text' placeholder='Глубина' value={depth} setValue={depthHandler} /> 
                        </div>
                        <div className="create__inputs">
                            <h6>Цвета:</h6>
                            <Input name='colors'  type='text' placeholder='Белый, черный и т.д' value={colors} setValue={colorsHandler} /> 
                        </div>
                        <div className="create__inputs">
                            <h6>Материал и уход(полезная информация):</h6>
                            <Input name='material'  type='text' placeholder='Березове дерево, влагостойкая и т.д' value={material} setValue={materialHandler} /> 
                        </div>
                        <div className="create__photos">
                            <h6>Фоторграфии(4):</h6>
                            <input type="file" onChange={(e)=>setPhotos(prev=>[...prev,e.target.files[0]])}/>
                            <input type="file" onChange={(e)=>setPhotos(prev=>[...prev,e.target.files[0]])}/>
                            <input type="file" onChange={(e)=>setPhotos(prev=>[...prev,e.target.files[0]])}/>
                            <input type="file" onChange={(e)=>setPhotos(prev=>[...prev,e.target.files[0]])}/>
                        </div>
                        <div className="create__button">
                            {loading
                            ?<div style={{marginRight:30}}><Spinner animation="border" variant="primary" /></div>
                            :<LoginButton disabled={disabled} title={"Создать"} color={"#111111"} textColor={"#fff"} onClick={onSubmit} width={100}/>
                            }                          
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    </Layout>
  );
};

export default Admin;
