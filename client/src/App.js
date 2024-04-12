import { BrowserRouter } from 'react-router-dom';
import './App.css';
import React, { useContext, useEffect, useState } from 'react';
import AppRouter from './components/AppRouter';
import NavBar from './components/NavBar';
import { Context } from "./index";
import { observer } from 'mobx-react-lite';
import {Check} from './http/userAPI';

const App = observer(() => {
  const [error, setError] = useState(null);
  const handleApiError = (error) => {
    console.error("Ошибка при обращении к серверу API:", error);
    setError("Ошибка при обращении к серверу. Пожалуйста, попробуйте еще раз позже.");
  }
  const {user} = useContext(Context)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Check().then( data => {
      user.setUser(true)
      user.setIsAuth(true)
    }).finally(() => setLoading(false))
  }, [])

  return (
    <BrowserRouter>
      <NavBar />
      {error && <div className="error">{error}</div>}
      <AppRouter onError={handleApiError} />
    </BrowserRouter>
  );
});

export default App;
