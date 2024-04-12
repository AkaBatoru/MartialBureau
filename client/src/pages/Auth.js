import React, { useContext, useState } from 'react';
import { Button, Card, Form, Row } from 'react-bootstrap';
import { Context } from "../index";
import { observer } from 'mobx-react-lite';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE } from '../utils/consts';
import { Registration, Login as loginUser } from '../http/userAPI';

const Auth = observer(() => {
  const {user} = useContext(Context)
    const location = useLocation()
    const navigate = useNavigate()
    const isLogin = location.pathname === LOGIN_ROUTE
    const [userLogin, setLogin] = useState('') 
    const [password, setPassword] = useState('')

    const click = async () => {
      try {
        console.log("User login:", userLogin);
      console.log("Password:", password);
      let datauser;
      if (isLogin) {
        datauser = await loginUser(userLogin, password);
        console.log(datauser)
      } else {
        datauser = await Registration(userLogin, password);
      }
      user.setUser(datauser)
      user.setIsAuth(true)
      navigate(SHOP_ROUTE);
      } catch (e) {
        alert(e.response.datauser.message)
      }
    }

    return (
        <div 
          className='d-flex justify-content-center align-items-center'
          style={{height: window.innerHeight}}>
          <Card style={{width: 600}} className='p-5'>
            <h2 className='m-auto'>{isLogin ? "Авторизация" : "Регистрация"}</h2>
          <Form className='d-flex flex-column'>
          <Form.Control className='mt-4' placeholder='Введите логин' value={userLogin} onChange={e => setLogin(e.target.value)}/>
          <Form.Control className='mt-4' placeholder='Введите пароль' value={password} onChange={e => setPassword(e.target.value)} type='password '/>
            <Row className='d-flex justify-content-between mt-3'>
              
            <Button
              variant={"outline-success"}
              style={{color: 'black', width: 'fit-content'}}
              onClick={click}
            >
            {isLogin ? <div>Войти</div>
                    :  <div>Зарегистрироваться</div>}
            </Button>
            <Button variant={"outline-dark"}  style={{color: 'black'}}>
              {isLogin ?<div>Нет аккаунта? <NavLink to={REGISTRATION_ROUTE}>Зарегистрироваться</NavLink></div>
                    :   <div>Есть аккаунт? <NavLink to={LOGIN_ROUTE}>Войти</NavLink></div>}
            </Button>
            </Row>
          </Form>
          </Card>
        </div>
      );
});

export default Auth;
