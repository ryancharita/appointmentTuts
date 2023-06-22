import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { ConfigProvider, theme } from 'antd';
import themeJson from '../theme.json';
import Router from './routes/router.jsx';

import 'antd/dist/reset.css';
import './index.css';

const { defaultAlgorithm, darkAlgorithm } = theme;
const router = createBrowserRouter(Router);
themeJson['algorithm'] = darkAlgorithm;

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ConfigProvider theme={themeJson}>
      <RouterProvider router={router} />
    </ConfigProvider>
  </React.StrictMode>,
);
