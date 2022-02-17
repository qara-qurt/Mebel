import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import back from '../../assets/img/back.png';
import backblack from '../../assets/img/backblack.png';
import LoginButton from '../../components/LoginButton';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { fetchRegister } from '../../store/reducers/auth';
import Input from '../../components/Input';
import { useSelector } from 'react-redux';
import { Spinner } from 'react-bootstrap';

const Register = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const {status} = useSelector(state=>state.auth)
    const {loading} = useSelector(state=>state.auth)
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [confirmPassword,setConfirmPassword] = useState('')
    const [error,setError] = useState(null)


    const emailHandler = (e) =>{
        setEmail(e.target.value)
    }

    const passswordHandler = (e) =>{
        setPassword(e.target.value)
    }

    const confirmPassswordHandler = (e) =>{
        setConfirmPassword(e.target.value)
    }

    const goBack = () => {
        navigate(-1)
    }

    const onSubmit = () =>{
        if(password===confirmPassword && (password.length>5 && confirmPassword.length>5)){
            dispatch(fetchRegister({email,password}));
        }else if(password!==confirmPassword){
            setError('Пароли не совпадают')
        }
    }
    useEffect(()=>{
        if(status==='200'){
            alert("Вы успешно зарегистрировались!")
            setEmail('')
            setPassword('')
            setConfirmPassword('')
        }else if(status=='error'){
            setError('Пользователь с такой почтой уже существует')
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
                    Создать профиль<br/> <span>MEBEL</span>
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
                        <h4 className='login__sign'>Создать акканут</h4>
                        {error&& <p style={{fontSize:12,margin:0,color:'#f34336'}}>{error}</p>}
                        <Input name='email'  type='text' placeholder='Электорнная почта' value={email} setValue={emailHandler} /> 
                        <Input name='register_password' type='password' placeholder='Пароль' value={password}  setValue={passswordHandler} />
                        <Input name='confirm_password' type='password' placeholder=' Повторите пароль' value={confirmPassword}  setValue={confirmPassswordHandler} />
                        <p>У вас уже есть аккаунт?</p>
                        <Link to='/login'>Войти в аккаунт</Link>
                        {loading
                            ?<div style={{textAlign:'center'}}><Spinner animation="border" variant="primary" /></div>
                            :<LoginButton title={'Создать'} color={'#0058A3'} textColor={'white'} onClick={onSubmit}/>}
                    </div>
                </div>
            </div>
        </div>
  );
};

export default Register;
