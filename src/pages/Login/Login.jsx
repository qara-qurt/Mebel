import React from 'react';
import { Link } from 'react-router-dom';
import back from '../../assets/img/back.png';
import backblack from '../../assets/img/backblack.png';
import LoginButton from '../../components/LoginButton';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();
    const goBack = () => {
        navigate(-1)
    }
    return (
        <div className='login'>
            <div className='login__body'>
                <div className='login__welcom'>
                <div className='login__back'>
                    <img src={back} alt='Вернуться назад' onClick={goBack}/>
                </div>
                <div className='login__text'>
                    <h4>
                    Войдите в свой<br/>акканут <span>MEBEL</span>
                    </h4>
                    <p>
                    Хотите получать бонусы?
                    <br />
                    Войдите в свой аккаунт по адресу<br /> 
                    электронной почты и при каждой<br />
                    покупке товара получайте бонусы на<br />
                    свой аккаунт
                    <span> Mebel</span>
                    </p>
                </div>
                </div>
                <div className='login__inputs'>
                    <div className='back'>
                        <img src={backblack} alt='Вернуться назад' onClick={goBack}/>
                    </div>
                    <h4 className='login__sign'>Войдите в акканут</h4>
                    <input type='text' placeholder='Электорнная почта' />
                    <input type='text' placeholder='Пароль' />
                    <Link to='forgot'>Забыли пароль?</Link>
                    <LoginButton title={'Войти'} color={'#0058A3'} textColor={'white'} />
                    <LoginButton title={'Создать аккаунт'} color={'#E8E8E8'} textColor={'black'} />
                </div>
            </div>
        </div>
  );
};

export default Login;
