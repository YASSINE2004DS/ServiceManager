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
import PageProfil from './Pages/PageProfil/PageProfil';
import PageInterventions from './Pages/PageInterventions/PageInterventions';

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
        element: <PageDemandeEnvoyer />,
    },
    {
        path: '/boite',
        element: <PageBoiteEmails />,
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
        element: <PageInscription />,
    },
    {
        path: '/intervention',
        element: <PageIntervention />,
    },
    {
        path: '/interventions',
        element: <PageInterventions />,
    },
    {
        path: '/profil',
        element: <PageProfil />,
    },
]);

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <RouterProvider router={router} />
    </StrictMode>,
);
