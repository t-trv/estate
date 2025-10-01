import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.scss';
import { AuthContextProvider } from './context/AuthContext.jsx';
import { Toaster } from 'react-hot-toast';

ReactDOM.createRoot(document.getElementById('root')).render(
    <AuthContextProvider>
        <App />
        <Toaster position="bottom-right" reverseOrder={false} />
    </AuthContextProvider>
);
