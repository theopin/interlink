import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.css';


import { RouterProvider } from 'react-router-dom';
import { AppRouter } from './features/router/AppRouter';
import ToastContainer from './components/toast/ToastContainer';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ToastContainer/>
    <RouterProvider router={AppRouter} />
  </React.StrictMode>
);

