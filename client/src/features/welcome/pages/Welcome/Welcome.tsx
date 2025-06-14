/***********************************************************************************************************************
 * @file Welcome.tsx
 * @description This file contains the Welcome component which is displayed when the user first accesses the application.
 *
 * @license Copyright (c) 2024-2025, Apache License 2.0.
 *
 * @author Ayyoub EL KOURI
 * @date 2025-06-14
 * @lastModified 2025-06-14
 *
 * @version 1.0.0
 **********************************************************************************************************************/

import { useWelcome } from './Welcome.hook';
import { WELCOME_STYLES } from './Welcome.styles';
import type { WelcomePageProps } from './Welcome.types';

// Import atomic components
import Header from '../../components/welcome-page/Header';
import Hero from '../../components/welcome-page/Hero';
import CompanyInfo from '../../components/welcome-page/CompanyInfo';
import Services from '../../components/welcome-page/Services';
import Footer from '../../components/welcome-page/Footer';

/**
 * @component Welcome
 * @description Professional welcome page component for Safarelec company
 *
 * @dependencies useWelcome hook, Welcome.styles, atomic components
 *
 * @author Ayyoub El Kouri
 * @date 14/06/2025
 * @lastUpdate 14/06/2025
 */
const Welcome = ({ className }: WelcomePageProps) => {
    const {
        handleLogin,
        handleRegister,
        handleNavigation,
        handleServiceExplore,
        handleServiceClick,
        handleContactClick,
    } = useWelcome();

    return (
        <div className={`${WELCOME_STYLES.container} ${className || ''}`}>
            <Header
                onLogin={handleLogin}
                onRegister={handleRegister}
                onNavigation={handleNavigation}
            />

            <Hero onCtaClick={handleServiceExplore} />

            <CompanyInfo />

            <Services onServiceClick={handleServiceClick} />

            <Footer onNavigation={handleNavigation} onContactClick={handleContactClick} />
        </div>
    );
};

export default Welcome;
