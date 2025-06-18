import { useAboutCTA } from './AboutCTA.hook';
import { ABOUT_CTA_STYLES } from './AboutCTA.styles';
import type { AboutCTAProps } from './AboutCTA.types';

/**
 * @component AboutCTA
 * @description Call-to-action section component for the About page
 *
 * @dependencies useAboutCTA hook, AboutCTA.styles
 *
 * @author Ayyoub El Kouri
 * @date 14/06/2025
 * @lastUpdate 14/06/2025
 */
const AboutCTA = (props: AboutCTAProps) => {
    const {
        title,
        description,
        primaryButtonText,
        secondaryButtonText,
        onContactClick,
        onServicesClick,
    } = useAboutCTA(props);

    return (
        <section className={ABOUT_CTA_STYLES.container}>
            <div className={ABOUT_CTA_STYLES.ctaCard}>
                <h2 className={ABOUT_CTA_STYLES.title}>{title}</h2>
                <p className={ABOUT_CTA_STYLES.description}>{description}</p>
                <div className={ABOUT_CTA_STYLES.buttons}>
                    <button onClick={onContactClick} className={ABOUT_CTA_STYLES.primaryButton}>
                        {primaryButtonText}
                    </button>
                    <button onClick={onServicesClick} className={ABOUT_CTA_STYLES.secondaryButton}>
                        {secondaryButtonText}
                    </button>
                </div>
            </div>
        </section>
    );
};

export default AboutCTA;
