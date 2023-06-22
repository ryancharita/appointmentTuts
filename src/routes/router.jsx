import MainLayout from '../layout/mainLayout';
import Dashboard from '../pages/dashboard';
import Error404Page from '../pages/errors/404';
import Error500Page from '../pages/errors/500';
import Appointments from '../pages/appointments';
import AppointmentDetails from '../pages/appointments/details';

const Router = [
  {
    path: '/',
    element: <MainLayout />,
    errorElement: <Error500Page />,
    children: [
      {
        path: '/',
        element: <Dashboard />,
      },
      {
        path: '/appointments',
        element: <Appointments />,
      },
      {
        path: '/appointments/:key',
        element: <AppointmentDetails />,
      },
    ],
  },
  {
    path: '*',
    element: <Error404Page />,
  },
];

export default Router;
