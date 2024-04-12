import { Container, Nav, Navbar, Button } from 'react-bootstrap';
import React, { useContext } from "react";
import { Context } from "../index";
import { NavLink } from 'react-router-dom';
import { ADMIN_ROUTE, LOGIN_ROUTE, SHOP_ROUTE } from '../utils/consts';
import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';

const NavBar = observer(() => {
    const { user } = useContext(Context)
    const navigate = useNavigate() 

    const logOut = () => {
        user.setUser({})
        user.setIsAuth(false)
    }
    return (
        <Navbar bg="dark" data-bs-theme="dark">
        <Container>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
            <NavLink style={{ color: 'white' }} to={SHOP_ROUTE}>Ритуальное бюро</NavLink>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <Nav style={{ color: 'white' }}>
                {user.isAuth ? (
                <div>
                    <Button variant={"outline-light"} style={{ marginLeft: '10px'}} 
                            onClick={() => navigate(ADMIN_ROUTE)}>
                            Панель Администратора</Button>
                    <Button variant={"outline-light"} style={{ marginLeft: '10px'}} 
                            onClick={() => logOut()}>
                            Выйти</Button>
                </div>
                ) : (
                <div>
                    <Button variant={"outline-light"} onClick={() => navigate(LOGIN_ROUTE)}>Авторизация</Button>
                </div>
                )}
                <Button variant={"outline-light"} style={{ marginLeft: '10px' }} onClick={() => navigate(SHOP_ROUTE)}>Предоставляемые услуги</Button>
                </Nav>
            </div>
        </div>
        </Container>
        </Navbar>
    )
})

export default NavBar;
