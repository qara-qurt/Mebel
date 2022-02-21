import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import back from '../../assets/img/back.png';
import backblack from '../../assets/img/backblack.png';
import LoginButton from '../../components/LoginButton';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { fetchLogin } from '../../store/reducers/auth';
import useAuth from '../../hooks/useAuth';
import Input from '../../components/Input';
import { useSelector } from 'react-redux';
import { Spinner } from 'react-bootstrap';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { status } = useSelector((state) => state.auth);
  const { loading } = useSelector((state) => state.auth);
  const { isAuth } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const goBack = () => {
    navigate('/');
  };

  const emailHandler = (e) => {
    setEmail(e.target.value);
  };

  const passswordHandler = (e) => {
    setPassword(e.target.value);
  };

  const onSubmit = () => {
    dispatch(fetchLogin({ email, password }));
  };
  const pushToRegister = () => {
    navigate('/register');
  };
  useEffect(() => {
    if (isAuth) {
      goBack();
    }
  }, [isAuth]);

  useEffect(() => {
    if (status === 'error') {
      setError('Некорректный email или пароль');
    }
  }, [status]);

  return (
    <div className='login'>
      <div className='login__body'>
        <div className='login__welcom'>
          <div className='login__back'>
            <img src={back} alt='Вернуться назад' onClick={goBack} />
          </div>
          <div className='login__text'>
            <h4>
              Войдите в свой
              <br />
              акканут <span>MEBEL</span>
            </h4>
            <p>
              Хотите получать бонусы?
              <br />
              Войдите в свой аккаунт по адресу
              <br />
              электронной почты и при каждой
              <br />
              покупке товара получайте бонусы на
              <br />
              свой аккаунт
              <span> Mebel</span>
            </p>
          </div>
        </div>
        <div className='login__inputs'>
          <div className='back'>
            <img src={backblack} alt='Вернуться назад' onClick={goBack} />
          </div>
          <div className='inputs'>
            <h4 className='login__sign'>Войдите в акканут</h4>
            {error && <p style={{ fontSize: 12, margin: 0, color: '#f34336' }}>{error}</p>}
            <Input
              name='email'
              type='text'
              placeholder='Электорнная почта'
              value={email}
              setValue={emailHandler}
            />
            <Input
              name='password'
              type='password'
              placeholder='Пароль'
              value={password}
              setValue={passswordHandler}
            />
            <Link to='/forgotPassword'>Забыли пароль?</Link>
            {loading ? (
              <div style={{ textAlign: 'center' }}>
                <Spinner animation='border' variant='primary' />
              </div>
            ) : (
              <LoginButton
                title={'Войти'}
                color={'#0058A3'}
                textColor={'white'}
                onClick={onSubmit}
              />
            )}
            <LoginButton
              title={'Создать аккаунт'}
              color={'#E8E8E8'}
              textColor={'black'}
              onClick={pushToRegister}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
