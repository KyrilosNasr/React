import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import { action as manipulateEventAction } from './components/EventForm';
import AuthenticationPage, { authAction } from './pages/Authentication';
import EditEventPage from './pages/EditEvent';
import ErrorPage from './pages/Error';
import EventDetailPage, {
  action as deleteEventAction,
  loader as eventDetailLoader,
} from './pages/EventDetail';
import EventsPage, { loader as eventsLoader } from './pages/Events';
import EventsRootLayout from './pages/EventsRoot';
import HomePage from './pages/Home';
import { logoutAction } from './pages/Logout';
import NewEventPage from './pages/NewEvent';
import NewsletterPage, { action as newsletterAction } from './pages/Newsletter';
import RootLayout from './pages/Root';
import { checkAuthLoader, loaderFn } from './util/Auth';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    id:'root',
    loader: loaderFn,
    children: [
      { index: true, element: <HomePage /> },
      { path:'auth' , element: <AuthenticationPage />,action:authAction },
      {
        path: 'events',
        element: <EventsRootLayout />,
        children: [
          {
            index: true,
            element: <EventsPage />,
            loader: eventsLoader,
          },
          {
            path: ':eventId',
            id: 'event-detail',
            loader: eventDetailLoader,
            children: [
              {
                index: true,
                element: <EventDetailPage />,
                action: deleteEventAction,
              },
              {
                path: 'edit',
                element: <EditEventPage />,
                loader:checkAuthLoader,
                action: manipulateEventAction,
              },
            ],
          },
          {
            path: 'new',
            element: <NewEventPage />,
            action: manipulateEventAction,
            loader:checkAuthLoader,
          },
        ],
      },
      {
        path: 'newsletter',
        element: <NewsletterPage />,
        action: newsletterAction,
      },
      {
        path: 'logout',
        action: logoutAction,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
