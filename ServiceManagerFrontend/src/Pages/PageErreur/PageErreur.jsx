import React from 'react';
import './PageErreur.css';
import logo from '../../Shared/Assets/safarelec-logo.png'; // remplace avec ton logo réel

const PageErreur = () => {
  return (
    <div className='container'>
      <div className="home-container">
        <img src={logo} alt="SAFARELEC Logo" className="logo" />
        <div className="welcome-sectione2">
            <h1>404 - Page Not Found</h1>
            <div className="Message">
                  Sorry, the page you're looking for doesn't exist.
            </div>
         </div>
      </div>
    </div>
  );
};

export default PageErreur;