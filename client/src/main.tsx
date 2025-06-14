import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Welcome from './features/welcome/pages/Welcome';
import About from './features/welcome/pages/About';
import Services from './features/welcome/pages/Services';
import Contact from './features/welcome/pages/Contact';
import Login from './features/authentification/pages/Login';
import Register from './features/authentification/pages/Register';

const router = createBrowserRouter([
    // Welcome pages
    {
        path: '/',
        element: <Welcome />,
    },
    {
        path: '/about',
        element: <About />,
    },
    {
        path: '/services',
        element: <Services />,
    },
    {
        path: '/contact',
        element: <Contact />,
    },

    // Authentication pages
    {
        path: '/login',
        element: <Login />,
    },
    {
        path: '/register',
        element: <Register />,
    }
]);

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <RouterProvider router={router} />
    </StrictMode>,
);
