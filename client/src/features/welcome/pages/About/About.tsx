import { useAbout } from './About.hook';
import { ABOUT_STYLES } from './About.styles';
import type { AboutPageProps } from './About.types';

// Import atomic components
import AboutHeader from '../../components/about-page/AboutHeader';
import AboutOverview from '../../components/about-page/AboutOverview';
import AboutMissionVision from '../../components/about-page/AboutMissionVision';
import AboutValues from '../../components/about-page/AboutValues';
import AboutHistory from '../../components/about-page/AboutHistory';
import AboutTeam from '../../components/about-page/AboutTeam';
import AboutCTA from '../../components/about-page/AboutCTA';

/**
 * @component About
 * @description About page component displaying comprehensive information about Safarelec company, decomposed into atomic components
 *
 * @dependencies useAbout hook, About.styles, atomic components
 *
 * @author Ayyoub El Kouri
 * @date 14/06/2025
 * @lastUpdate 14/06/2025
 */
const About = ({ className }: AboutPageProps) => {
    const { companyName, handleGoBack, handleContactClick, handleServicesClick } = useAbout();

    return (
        <div className={`${ABOUT_STYLES.container} ${className || ''}`}>
            <AboutHeader onGoBack={handleGoBack} />

            <div className={ABOUT_STYLES.content}>
                <AboutOverview />

                <AboutMissionVision />

                <AboutValues />

                <AboutHistory companyName={companyName} />

                <AboutTeam />

                <AboutCTA
                    companyName={companyName}
                    onContactClick={handleContactClick}
                    onServicesClick={handleServicesClick}
                />
            </div>
        </div>
    );
};

export default About;
