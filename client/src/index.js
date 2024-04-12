import React, { createContext } from 'react';
import {createRoot} from 'react-dom/client';
import './index.css';
import App from './App';
import UserStore from './store/UserStore';
import ServiceStore from './store/ServiceStore';

export const Context = createContext(null)

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);
root.render(
    <Context.Provider value ={{
        user: new UserStore(),
        service: new ServiceStore()
    }}>
        <App />
    </Context.Provider>
);

