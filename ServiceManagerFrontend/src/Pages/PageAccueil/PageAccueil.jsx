import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBolt, faWrench, faSolarPanel, faShieldAlt, faUsers, faSignInAlt, faUserPlus, faArrowRight } from '@fortawesome/free-solid-svg-icons';

import styles from './PageAccueil.module.css'; // Import the CSS module
import companyLogo from '../../Shared/Assets/safarelec-logo.png'; // Ensure your logo path is correct

// Example service images (replace with your actual images)
import serviceImg1 from './Shared/electro3.jpeg'; // e.g., an image of wiring or fuse box
import serviceImg2 from './Shared/electro2.jpeg'; // e.g., a technician working on equipment
import serviceImg3 from './Shared/EnergieRen.jpeg'; // e.g., solar panels on a roof
import serviceImg4 from './Shared/securite.jpeg'; // e.g., CCTV cameras or alarm panel

const HomePage = () => {
    const navigate = useNavigate();

    const handleRegisterClick = () => {
        navigate('/register'); // Assuming your registration page route is '/register'
    };

    const handleLoginClick = () => {
        navigate('/login'); // Assuming your login page route is '/login'
    };

    const services = [
        {
            icon: faBolt,
            title: "Installations Électriques",
            description: "Conception et réalisation d'installations électriques résidentielles, commerciales et industrielles, conformes aux normes de sécurité les plus strictes.",
            image: serviceImg1
        },
        {
            icon: faWrench,
            title: "Maintenance Préventive",
            description: "Des programmes de maintenance réguliers pour assurer la fiabilité et la longévité de vos équipements électriques, minimisant les pannes et les coûts.",
            image: serviceImg2
        },
        {
            icon: faSolarPanel,
            title: "Solutions Énergies Renouvelables",
            description: "Intégration de systèmes photovoltaïques et autres solutions d'énergie verte pour une consommation électrique durable et économique.",
            image: serviceImg3
        },
        {
            icon: faShieldAlt,
            title: "Systèmes de Sécurité",
            description: "Installation et maintenance de systèmes de sécurité avancés : alarmes, vidéosurveillance, contrôle d'accès pour protéger vos biens.",
            image: serviceImg4
        },
    ];

    return (
        <div className={styles.homePage}>
            {/* Header Section */}
            <header className={styles.header}>
                <div className={styles.logoContainer}>
                    <img src={companyLogo} alt="Safarelec Logo" className={styles.companyLogo} />
                    <span className={styles.companyName}>SAFARELEC</span>
                </div>
                <nav className={styles.mainNav}>
                    <ul>
                        <li><a href="#about" className={styles.navLink}>À Propos</a></li>
                        <li><a href="#services" className={styles.navLink}>Services</a></li>
                        <li><a href="#contact" className={styles.navLink}>Contact</a></li>
                    </ul>
                </nav>
                <div className={styles.authButtonsHeader}>
                    <button onClick={handleLoginClick} className={styles.loginButtonHeader}>
                        <FontAwesomeIcon icon={faSignInAlt} /> Connexion
                    </button>
                    <button onClick={handleRegisterClick} className={styles.registerButtonHeader}>
                        <FontAwesomeIcon icon={faUserPlus} /> Inscription
                    </button>
                </div>
            </header>

            {/* Hero Section */}
            <section className={styles.heroSection}>
                <div className={styles.heroContent}>
                    <h1 className={styles.heroTitle}>SAFARELEC: Votre Partenaire en Solutions Électriques Innovantes</h1>
                    <p className={styles.heroSubtitle}>
                        Expertise, Sécurité et Durabilité pour tous vos projets électriques.
                    </p>
                    <div className={styles.heroButtons}>
                        <button onClick={handleRegisterClick} className={styles.heroButtonPrimary}>
                            S'inscrire <FontAwesomeIcon icon={faArrowRight} />
                        </button>
                        <button onClick={handleLoginClick} className={styles.heroButtonSecondary}>
                            Se Connecter
                        </button>
                    </div>
                </div>
            </section>

            {/* About Us Section */}
            <section id="about" className={styles.aboutSection}>
                <div className={styles.aboutContent}>
                    <h2 className={styles.sectionTitle}><FontAwesomeIcon icon={faUsers} /> À Propos de Safarelec</h2>
                    <p className={styles.sectionDescription}>
                        Depuis sa fondation, Safarelec s'est imposée comme un leader dans le domaine des solutions électriques. Notre mission est de fournir des services de haute qualité, sécurisés et innovants, répondant aux besoins évolutifs de nos clients. Nous nous engageons à l'excellence, à la fiabilité et à la durabilité dans chacun de nos projets, qu'il s'agisse d'installations complexes, de maintenance préventive ou d'intégration de technologies vertes.
                    </p>
                    <p className={styles.sectionDescription}>
                        Notre équipe d'experts qualifiés est dédiée à la satisfaction client, offrant des conseils personnalisés et des interventions rapides et efficaces. Chez Safarelec, votre sécurité et votre performance énergétique sont notre priorité.
                    </p>
                </div>
            </section>

            {/* Services Section */}
            <section id="services" className={styles.servicesSection}>
                <h2 className={styles.sectionTitle}>Nos Services d'Excellence</h2>
                <p className={styles.sectionDescription}>
                    Découvrez l'étendue de notre expertise et comment nous pouvons illuminer vos projets.
                </p>
                <div className={styles.servicesGrid}>
                    {services.map((service, index) => (
                        <div key={index} className={styles.serviceCard}>
                            <div className={styles.serviceImageWrapper}>
                                <img src={service.image} alt={service.title} className={styles.serviceImage} />
                                <div className={styles.serviceIconOverlay}>
                                    <FontAwesomeIcon icon={service.icon} className={styles.serviceIcon} />
                                </div>
                            </div>
                            <h3 className={styles.serviceTitle}>{service.title}</h3>
                            <p className={styles.serviceDescription}>{service.description}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Call to Action Section (Bottom) */}
            <section className={styles.ctaSection}>
                <h2 className={styles.ctaTitle}>Prêt à Commencer Votre Projet Électrique?</h2>
                <p className={styles.ctaSubtitle}>
                    Rejoignez notre plateforme pour gérer vos interventions et accéder à des services exclusifs.
                </p>
                <div className={styles.ctaButtons}>
                    <button onClick={handleRegisterClick} className={styles.ctaButtonPrimary}>
                        Créer un Compte <FontAwesomeIcon icon={faUserPlus} />
                    </button>
                    <button onClick={handleLoginClick} className={styles.ctaButtonSecondary}>
                        Déjà un Compte? Se Connecter <FontAwesomeIcon icon={faSignInAlt} />
                    </button>
                </div>
            </section>

            {/* Footer Section */}
            <footer id="contact" className={styles.footer}>
                <div className={styles.footerContent}>
                    <div className={styles.footerBrand}>
                        <img src={companyLogo} alt="Safarelec Logo" className={styles.footerLogo} />
                        <p className={styles.footerTagline}>Votre partenaire de confiance en électricité.</p>
                    </div>
                    <div className={styles.footerLinks}>
                        <h4>Liens Rapides</h4>
                        <ul>
                            <li><a href="#about">À Propos</a></li>
                            <li><a href="#services">Services</a></li>
                            <li><a href="/privacy-policy">Politique de Confidentialité</a></li>
                        </ul>
                    </div>
                    <div className={styles.footerContact}>
                        <h4>Contactez-nous</h4>
                        <p>123 Rue de l'Électricité, Casablanca, Maroc</p>
                        <p>Email: contact@safarelec.ma</p>
                        <p>Téléphone: +212 5 XX XX XX XX</p>
                    </div>
                </div>
                <div className={styles.footerBottom}>
                    <p>&copy; {new Date().getFullYear()} SAFARELEC. Tous droits réservés.</p>
                </div>
            </footer>
        </div>
    );
};

export default HomePage;