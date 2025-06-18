import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import './index.css';

// Welcome page.
import Welcome from './features/welcome/Welcome';

// Authentication pages.
import Login from './features/authentification/pages/Login';
import Register from './features/authentification/pages/Register';
import Inactive from './features/authentification/pages/Inactive';

const router = createBrowserRouter([
    // Welcome page.
    {
        path: '/',
        element: <Welcome />,
    },

    // Authentication pages.
    {
        path: '/login',
        element: <Login />,
    },
    {
        path: '/register',
        element: <Register />,
    },
    {
        path: '/inactive',
        element: <Inactive />,
    },
]);

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <RouterProvider router={router} />
    </StrictMode>,
);
