import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router';

import PageAccueil from './Pages/PageAccueil/PageAccueil';
import PageAdmin from './Pages/PageAdmin/PageAdmin';
import PageAuthentification from './Pages/PageAuthentification/PageAuthentification';
import PageDemande from './Pages/PageDemande/PageDemande';
import PageEmail from './Pages/PageEmail/PageEmail';
import PageEmployee from './Pages/PageEmployee/PageEmployee';
import PageIntervention from './Pages/PageIntervention/PageIntervention';
import PageErreur from './Pages/PageErreur/PageErreur';

const router = createBrowserRouter([
    {
        path: '/',
        element: <PageAccueil />,
        errorElement: <PageErreur />,
    },
    {
        path: '/admin',
        element: <PageAdmin />,
    },
    {
        path: '/authentification',
        element: <PageAuthentification />,
    },
    {
        path: '/demande',
        element: <PageDemande />,
    },
    {
        path: '/email',
        element: <PageEmail />,
    },
    {
        path: '/employee',
        element: <PageEmployee />,
    },
    {
        path: '/intervention',
        element: <PageIntervention />,
    },
]);

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <RouterProvider router={router} />
    </StrictMode>,
);
