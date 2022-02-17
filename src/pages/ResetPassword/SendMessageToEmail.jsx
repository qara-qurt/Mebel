import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import back from '../../assets/img/back.png';
import backblack from '../../assets/img/backblack.png';
import LoginButton from '../../components/LoginButton';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Input from '../../components/Input';
import { useSelector } from 'react-redux';
import { Spinner } from 'react-bootstrap';
import { fetchSendForgotPasswordToEmail } from '../../store/reducers/auth';

const SendMessageToEmail = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const {status} = useSelector(state=>state.auth)
    const {loading} = useSelector(state=>state.auth)
    const [email,setEmail] = useState('')


    const emailHandler = (e) =>{
        setEmail(e.target.value)
    }

    const goBack = () => {
        navigate(-1)
    }

    const onSubmit = () =>{
        dispatch(fetchSendForgotPasswordToEmail({email}))
    }
    useEffect(()=>{
        if(status==='200'){
            alert("Сообщение отправлено")
            setEmail('')
        }
    },[status])

        
    return (
        <div className='login'>
            <div className='login__body'>
                <div className='login__welcom'>
                <div className='login__back'>
                    <img src={back} alt='Вернуться назад' onClick={goBack}/>
                </div>
                <div className='login__text'>
                    <h4>
                    Восстановить профиль<br/> <span>MEBEL</span>
                    </h4>
                    <p>
                    Хотите получать бонусы?<br/>
                    Создайте свой профиль и при каждой<br/> 
                    покупке товара получайте бонусы на<br/> 
                    свой аккаунт
                    <span> Mebel</span>
                    </p>
                </div>
                </div>
                <div className='login__inputs'>
                    <div className='back'>
                        <img src={backblack} alt='Вернуться назад' onClick={goBack}/>
                    </div>
                    <div className="inputs">
                        <h4 className='login__sign'>Введите электорнную почту</h4>
                        <Input name='email'  type='text' placeholder='Электорнная почта' value={email} setValue={emailHandler} /> 
                        <p>У вас уже есть аккаунт?</p>
                        <Link to='/login'>Войти в аккаунт</Link>
                        {loading
                            ?<div style={{textAlign:'center'}}><Spinner animation="border" variant="primary" /></div>
                            :<LoginButton title={'Отправить'} color={'#0058A3'} textColor={'white'} onClick={onSubmit}/>}
                    </div>
                </div>
            </div>
        </div>
  );
};

export default SendMessageToEmail;
