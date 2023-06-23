import MainLayout from '../layout/mainLayout';
import Dashboard from '../pages/dashboard';
import Error404Page from '../pages/errors/404';
import Error500Page from '../pages/errors/500';
import Appointments from '../pages/appointments';
import AppointmentDetails from '../pages/appointments/details';

const Router = [
  // Main routes
  {
    path: '/',
    element: <MainLayout />,
    errorElement: <Error500Page />,
    children: [
      // Dashboard route
      {
        path: '/',
        element: <Dashboard />,
      },
      // Appointments route
      {
        path: '/appointments',
        element: <Appointments />,
      },
      // Appointment details route
      {
        path: '/appointments/:key',
        element: <AppointmentDetails />,
      },
    ],
  },
  // Error 404 route
  {
    path: '*',
    element: <Error404Page />,
  },
];

export default Router;
