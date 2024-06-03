import React from 'react';
import ReactDOM from 'react-dom/client';
import { ToastContainer } from "react-toastify";
import { Provider } from 'react-redux';
import "react-toastify/dist/ReactToastify.css";
import './styles/globals.css';

import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Login } from './pages/Login';
import { Home } from './pages/Home';
import { store } from './redux/store';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/login',
    element: <Login />,
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <ToastContainer />
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
)