import { useAboutHeader } from './AboutHeader.hook';
import { ABOUT_HEADER_STYLES } from './AboutHeader.styles';
import type { AboutHeaderProps } from './AboutHeader.types';

/**
 * @component AboutHeader
 * @description Header component for the About page
 *
 * @dependencies useAboutHeader hook, AboutHeader.styles
 *
 * @author Ayyoub El Kouri
 * @date 14/06/2025
 * @lastUpdate 14/06/2025
 */
const AboutHeader = (props: AboutHeaderProps) => {
    const { companyName, description, experienceText, onGoBack } = useAboutHeader(props);

    return (
        <section className={ABOUT_HEADER_STYLES.container}>
            <div className={ABOUT_HEADER_STYLES.content}>
                <button onClick={onGoBack} className={ABOUT_HEADER_STYLES.backButton}>
                    ← Retour à l'accueil
                </button>
                <h1 className={ABOUT_HEADER_STYLES.title}>À propos de {companyName}</h1>
                <p className={ABOUT_HEADER_STYLES.subtitle}>
                    {description} - {experienceText}
                </p>
            </div>
        </section>
    );
};

export default AboutHeader;
