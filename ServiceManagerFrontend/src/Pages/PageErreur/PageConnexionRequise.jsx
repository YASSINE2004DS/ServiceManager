import React                            from 'react';
import './PageErreur.css';
import logo                             from '../../Shared/Assets/safarelec-logo.png';
import { useNavigate }                  from 'react-router-dom';                         // pour le navigation entre les pages

const PageErreur = () => {

    const navigate = useNavigate(); // fonction pour le navigation
  return (

    <div className='container-error-management'>

        <div className="home-container">
              <img src={logo} alt="SAFARELEC Logo" className="logo" />

              <div className="welcome-sectione2">
                      {/* titre */}
                   <h1>Connexion requise</h1>

                      {/* Message */}
                   <div className="Message"> 
                            Votre session a expiré . 
                           Veuillez vous reconnecter pour continuer à utiliser la plateforme.
                    </div>
                      
                       {/* button pour le navigation vers page login */}
                    <button className='btn-event' 
                          onClick={() => navigate('/login')}>
                            Se reconnecter
                    </button> 

               </div>

         </div>

      </div>
  );
};

export default PageErreur;