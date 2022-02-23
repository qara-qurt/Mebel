import React, { useEffect, useState } from 'react';
import { Spinner } from 'react-bootstrap';
import Input from '../components/Input';
import LoginButton from '../components/LoginButton';
import backblack from '../assets/img/backblack.png';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { fetchCreateProduct, setLoading } from '../store/reducers/products';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const AdminCreateProduct = ({ rerender, setRerender,mobile }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.products);

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

  const [disabled, setDisabled] = useState(true);

  const nameHandler = (e) => {
    setName(e.target.value);
  };
  const descriptionHandler = (e) => {
    setDescription(e.target.value);
  };
  const priceHandler = (e) => {
    setPrice(e.target.value);
  };
  const widthHandler = (e) => {
    setWidth(e.target.value);
  };
  const heightHandler = (e) => {
    setHeight(e.target.value);
  };
  const depthHandler = (e) => {
    setDepth(e.target.value);
  };
  const colorsHandler = (e) => {
    setColors(e.target.value);
  };
  const materialHandler = (e) => {
    setMaterial(e.target.value);
  };

  useEffect(() => {
    if (
      name != '' &&
      description != '' &&
      price != '' &&
      width != '' &&
      height != '' &&
      depth != '' &&
      colors != '' &&
      material != '' &&
      photos.length == 4
    ) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [name, description, price, width, height, depth, colors, material, photos]);

  const uploadData = async () => {
    const formData1 = new FormData();
    formData1.append('file', photos[0]);
    formData1.append('upload_preset', 'f1vguzfd');

    const formData2 = new FormData();
    formData2.append('file', photos[1]);
    formData2.append('upload_preset', 'f1vguzfd');

    const formData3 = new FormData();
    formData3.append('file', photos[2]);
    formData3.append('upload_preset', 'f1vguzfd');

    const formData4 = new FormData();
    formData4.append('file', photos[3]);
    formData4.append('upload_preset', 'f1vguzfd');

    try {
      dispatch(setLoading(true));
      axios
        .post('https://api.cloudinary.com/v1_1/mebelproject/image/upload', formData1)
        .then((res) => {
          const photoUrl1 = res.data.secure_url;
          const publicId1 = res.data.public_id;
          axios
            .post('https://api.cloudinary.com/v1_1/mebelproject/image/upload', formData2)
            .then((res) => {
              const photoUrl2 = res.data.secure_url;
              const publicId2 = res.data.public_id;
              axios
                .post('https://api.cloudinary.com/v1_1/mebelproject/image/upload', formData3)
                .then((res) => {
                  const photoUrl3 = res.data.secure_url;
                  const publicId3 = res.data.public_id;
                  axios
                    .post('https://api.cloudinary.com/v1_1/mebelproject/image/upload', formData4)
                    .then((res) => {
                      const photoUrl4 = res.data.secure_url;
                      const publicId4 = res.data.public_id;
                      const data = {
                        name: name,
                        description: description,
                        price: Number(price.replace(" ","")),
                        size: [width, height, depth],
                        colors: colors,
                        material: material,
                        photos: [
                          { photoUrl: photoUrl1, publicId: publicId1 },
                          { photoUrl: photoUrl2, publicId: publicId2 },
                          { photoUrl: photoUrl3, publicId: publicId3 },
                          { photoUrl: photoUrl4, publicId: publicId4 },
                        ],
                      };
                      dispatch(fetchCreateProduct(data));
                      dispatch(setLoading(false));
                      alert('Товар создан!');
                      setName('');
                      setDescription('');
                      setPrice('');
                      setWidth('');
                      setHeight('');
                      setDepth('');
                      setColors('');
                      setMaterial('');
                      setPhotos([])
                      setRerender(!rerender);
                    });
                });
            });
        });
    } catch (e) {
      throw Error(e);
    }
  };

  const onSubmit = () => {
    uploadData();
  };

  const goBack = () =>{
    navigate(-1)
  }

  return (
    <>
      <div className={mobile?'admin__create-mobile':'admin__create'}>
      {mobile&&<img src={backblack} className='admin__goBack' alt='Вернуться назад' onClick={goBack} />}
      <div className='create'>
        <h5>Добаваить товар</h5>
        <div className='create__inputs'>
          <Input
            name='name'
            type='text'
            placeholder='Назваение'
            value={name}
            setValue={nameHandler}
          />
          <Input
            name='description'
            type='text'
            placeholder='Описание'
            value={description}
            setValue={descriptionHandler}
          />
          <Input
            name='price'
            type='text'
            placeholder='Цена(тг)'
            value={price}
            setValue={priceHandler}
          />
        </div>
        <div className='create__inputs-sizes'>
          <h6>Размер(см):</h6>
          <Input
            name='width'
            type='text'
            placeholder='Ширина'
            value={width}
            setValue={widthHandler}
          />
          <Input
            name='height'
            type='text'
            placeholder='Высота'
            value={height}
            setValue={heightHandler}
          />
          <Input
            name='depth'
            type='text'
            placeholder='Глубина'
            value={depth}
            setValue={depthHandler}
          />
        </div>
        <div className='create__inputs'>
          <h6>Цвета:</h6>
          <Input
            name='colors'
            type='text'
            placeholder='Белый, черный и т.д'
            value={colors}
            setValue={colorsHandler}
          />
        </div>
        <div className='create__inputs'>
          <h6>Материал и уход(полезная информация):</h6>
          <Input
            name='material'
            type='text'
            placeholder='Березове дерево, влагостойкая и т.д'
            value={material}
            setValue={materialHandler}
          />
        </div>
        <div className='create__photos'>
          <h6>Фоторграфии(4):</h6>
          <input type='file'  onChange={(e) => setPhotos((prev) => [...prev, e.target.files[0]])} />
          <input type='file'  onChange={(e) => setPhotos((prev) => [...prev, e.target.files[0]])} />
          <input type='file'  onChange={(e) => setPhotos((prev) => [...prev, e.target.files[0]])} />
          <input type='file'  onChange={(e) => setPhotos((prev) => [...prev, e.target.files[0]])} />
        </div>
        <div className='create__button'>
          {loading ? (
            <div style={{ marginRight: 30 }}>
              <Spinner animation='border' variant='primary' />
            </div>
          ) : (
            <LoginButton
              disabled={disabled}
              title={'Создать'}
              color={'#111111'}
              textColor={'#fff'}
              onClick={onSubmit}
              width={100}
            />
          )}
        </div>
      </div>
    </div>
    </>
  );
};

export default AdminCreateProduct;
