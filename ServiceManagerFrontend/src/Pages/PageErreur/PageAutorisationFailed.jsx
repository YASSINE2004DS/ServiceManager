import React                          from 'react';
import './PageErreur.css';
import logo                           from '../../Shared/Assets/safarelec-logo.png';
import { useNavigate }                from 'react-router-dom';


// compannent pour les page non existe
const PageErreur = () => {
    const navigate = useNavigate();
  return (
    <div className='container'>
        <div className="home-container">

            <img src={logo} alt="SAFARELEC Logo" className="logo" />

            <div className="welcome-sectione2">

                <h1>Accès refusé</h1>

                <div className="Message">
                 Vous n'êtes pas autorisé à accéder à cette page.
                </div>

                 <button 
                    className='btn-event'
                    onClick={() => navigate(-1)}>
                        Retour
                </button> 

            </div>

        </div>
    </div>
  );
};

export default PageErreur;