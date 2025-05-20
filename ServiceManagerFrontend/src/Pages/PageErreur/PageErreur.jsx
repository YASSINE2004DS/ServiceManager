import React                      from 'react';
import './PageErreur.css';
import logo                       from '../../Shared/Assets/safarelec-logo.png';

const PageErreur = () => {
  return (
    <div className='container'>

          <div className="home-container">
              <img src={logo} alt="SAFARELEC Logo" className="logo" />

              <div className="welcome-sectione2">
                
                  <h1>404 - Page non trouvée</h1>

                  <div className="Message">
                      Désolé, la page que vous recherchez n'existe pas.
                  </div>

                </div>
            </div>
      </div>
  );
};

export default PageErreur;