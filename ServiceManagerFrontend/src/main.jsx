import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router';

import PageAccueil from './Pages/PageAccueil/PageAccueil';
import PageAdmin from './Pages/PageAdmin/PageAdmin';
import PageContenuEmail from './Pages/PageContenuEmail/PageContenuEmail';
import PageEmail from './Pages/PageEmail/PageEmail';
import PageEmployee from './Pages/PageEmployee/PageEmployee';
import PageIntervention from './Pages/PageIntervention/PageIntervention';
import PageErreur from './Pages/PageErreur/PageErreur';
import PageInscription from './Pages/PageInscription/PageInscription';
import PageConnexion from './Pages/PageConnextion/PageConnexion';
import PageDemandeEnvoyer from './Pages/PageDemandeEnvoyer/PageDemandeEnvoyer';
import PageBoiteEmails from './Pages/PageBoiteEmails/PageBoiteEmails';
import PageProfile from './Pages/PageProfile/PageProfile';

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
        path: '/connexion',
        element: <PageConnexion />,
    },
    {
        path: '/contenu',
        element: <PageContenuEmail />,
    },
    {
        path: '/demandeenvoyer',
        element: <PageDemandeEnvoyer />
    },
    {
        path: '/boite',
        element: <PageBoiteEmails />
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
        path: '/inscription',
        element: <PageInscription />
    },
    {
        path: '/intervention',
        element: <PageIntervention />,
    },
    {
        path: '/profile',
        element: <PageProfile />
    }
]);

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <RouterProvider router={router} />
    </StrictMode>,
);
