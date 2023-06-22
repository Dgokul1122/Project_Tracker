import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import User from './user';
import{createBrowserRouter,RouterProvider,Route} from 'react-router-dom';


import 'bootstrap/dist/css/bootstrap.min.css';

const router =createBrowserRouter([
  {
    path:'/',
    element:<App/>,
  },
  {
    path:'/user',
    element:<User/>,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <RouterProvider router={router} />
)


reportWebVitals();