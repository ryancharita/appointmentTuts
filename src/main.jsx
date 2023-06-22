import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './pages/app.jsx';
import Dashboard from './pages/dashboard.jsx';
import 'antd/dist/reset.css';
import './index.css';
import { ConfigProvider } from 'antd';
import theme from '../theme.json';
import ErrorPage from './pages/error.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Dashboard />,
  },
  {
    path: '/appointments',
    title: 'appointments',
    element: <App />,
  },
  {
    path: '*',
    element: <ErrorPage />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ConfigProvider theme={theme}>
      <RouterProvider router={router} />
    </ConfigProvider>
  </React.StrictMode>,
);
