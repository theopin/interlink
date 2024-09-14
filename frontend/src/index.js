import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.css';


import { RouterProvider } from 'react-router-dom';
import { router } from './features/router/Router';
import ToastContainer from './components/ToastContainer';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ToastContainer/>
    <RouterProvider router={router} />
  </React.StrictMode>
);

