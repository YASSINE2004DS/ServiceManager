import React from 'react';
import './PageAccueil.css';
import logo from '../../Shared/Assets/safarelec-logo.png';
import { useNavigate } from 'react-router-dom';
// import img1 from './Assets/img1.jpg';
// import img2 from './Assets/img2.jpg';
// import img3 from './Assets/img3.jpg'; // tu peux en ajouter autant que tu veux

const PageAccueil = () => {
    const navigate = useNavigate();

    return (
        <div className="container">
            <div className="home-container">
                {/* <div className="slide-track">
                    <img src={img1} alt="slide1" className="slide" />
                    <img src={img2} alt="slide2" className="slide" />
                    <img src={img3} alt="slide3" className="slide" />
                    <img src={img1} alt="slide1-copy" className="slide" />
                    <img src={img2} alt="slide2-copy" className="slide" />
                    <img src={img3} alt="slide3-copy" className="slide" />
                </div> */}

                <img src={logo} alt="SAFARELEC Logo" className="logo" />

                {/* <div className="description">
                    <h2>SAFARELEC est une entreprise marocaine qui a acquis d’importantes références durant plus de 16 ans dans les métiers :</h2>
                    <ul>
                        <li>Electricité Industrielle HT/MT/BT</li>
                        <li>Automatisme, Instrumentation, Tableaux BT/MCC</li>
                        <li>Électrification, Éclairage</li>
                        <li>Énergies Renouvelables</li>
                        <li>Viabilisation</li>
                        <li>Négoce, Formation</li>
                    </ul>
                </div> */}

                <div className="welcome-sectione">
                    <h1>Welcome to Service Intervention Manager</h1>
                    <div className="button-groupe">
                        <button className="btn login" onClick={() => navigate('/login')}>
                            Login
                        </button>
                        <button className="btn signup" onClick={() => navigate('/sign_up')}>
                            Sign Up
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PageAccueil;
