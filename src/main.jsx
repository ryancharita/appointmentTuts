import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { ConfigProvider, theme } from 'antd';
import themeJson from '../theme.json';
import Router from './routes/router.jsx';

import 'antd/dist/reset.css';
import './index.css';

const { darkAlgorithm } = theme;

// Create a browser router
const router = createBrowserRouter(Router);

// Set the algorithm for the theme
themeJson['algorithm'] = darkAlgorithm;

// Render the app
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* Configure the Ant Design ConfigProvider with the theme */}
    <ConfigProvider theme={themeJson}>
      {/* Provide the router to the RouterProvider */}
      <RouterProvider router={router} />
    </ConfigProvider>
  </React.StrictMode>,
);
