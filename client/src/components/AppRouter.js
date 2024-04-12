import React, { useContext } from 'react';
import {Route, Routes} from 'react-router-dom';
import { authRouters, publicRouters } from '../routers';
import { Context } from '../index';

const AppRouter = () => {
    const {user} = useContext(Context)

    console.log(user)
    return (
        <Routes>
            <Route path="*" element={
            <div className="container">
                <Routes>
                { authRouters.map(({path, Component}) =>
                <Route key={path} path={path} element={<Component/>} exact/>
                )}
                {publicRouters.map(({path, Component}) =>
                <Route key={path} path={path} element={<Component/>} exact/>
                )}
                </Routes>
            </div>
            }
            />
        </Routes>
      );
};

export default AppRouter;