import { useAboutOverview } from './AboutOverview.hook';
import { ABOUT_OVERVIEW_STYLES } from './AboutOverview.styles';
import type { AboutOverviewProps } from './AboutOverview.types';

/**
 * @component AboutOverview
 * @description Company overview section component for the About page
 *
 * @dependencies useAboutOverview hook, AboutOverview.styles
 *
 * @author Ayyoub El Kouri
 * @date 14/06/2025
 * @lastUpdate 14/06/2025
 */
const AboutOverview = (props: AboutOverviewProps) => {
    const {
        title,
        description,
        employees,
        projectsCompleted,
        imageUrl,
        imageAlt,
    } = useAboutOverview(props);

    return (
        <section className={ABOUT_OVERVIEW_STYLES.container}>
            <div className={ABOUT_OVERVIEW_STYLES.grid}>
                <div className={ABOUT_OVERVIEW_STYLES.textContent}>
                    <h2 className={ABOUT_OVERVIEW_STYLES.title}>{title}</h2>
                    <p className={ABOUT_OVERVIEW_STYLES.description}>
                        {description}
                    </p>
                    <div className={ABOUT_OVERVIEW_STYLES.stats}>
                        <div className={ABOUT_OVERVIEW_STYLES.stat.container}>
                            <div className={ABOUT_OVERVIEW_STYLES.stat.number}>{employees}</div>
                            <div className={ABOUT_OVERVIEW_STYLES.stat.label}>Employés</div>
                        </div>
                        <div className={ABOUT_OVERVIEW_STYLES.stat.container}>
                            <div className={ABOUT_OVERVIEW_STYLES.stat.number}>{projectsCompleted}</div>
                            <div className={ABOUT_OVERVIEW_STYLES.stat.label}>Projets Réalisés</div>
                        </div>
                    </div>
                </div>
                <div className={ABOUT_OVERVIEW_STYLES.imageContainer}>
                    <img
                        src={imageUrl}
                        alt={imageAlt}
                        className={ABOUT_OVERVIEW_STYLES.image}
                        onError={(e) => {
                            e.currentTarget.style.display = 'none';
                        }}
                    />
                </div>
            </div>
        </section>
    );
};

export default AboutOverview;
