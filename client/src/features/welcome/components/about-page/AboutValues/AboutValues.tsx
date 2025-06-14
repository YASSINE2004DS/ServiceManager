import { useAboutValues } from './AboutValues.hook';
import { ABOUT_VALUES_STYLES } from './AboutValues.styles';
import type { AboutValuesProps } from './AboutValues.types';

/**
 * @component AboutValues
 * @description Company values section component for the About page
 *
 * @dependencies useAboutValues hook, AboutValues.styles
 *
 * @author Ayyoub El Kouri
 * @date 14/06/2025
 * @lastUpdate 14/06/2025
 */
const AboutValues = (props: AboutValuesProps) => {
    const { sectionTitle, sectionSubtitle, values } = useAboutValues(props);

    return (
        <section className={ABOUT_VALUES_STYLES.container}>
            <h2 className={ABOUT_VALUES_STYLES.sectionTitle}>{sectionTitle}</h2>
            <p className={ABOUT_VALUES_STYLES.sectionSubtitle}>
                {sectionSubtitle}
            </p>
            <div className={ABOUT_VALUES_STYLES.grid}>
                {values.map((value, index) => (
                    <div key={index} className={ABOUT_VALUES_STYLES.card.container}>
                        <div className={ABOUT_VALUES_STYLES.card.icon}>{value.icon}</div>
                        <h3 className={ABOUT_VALUES_STYLES.card.title}>{value.title}</h3>
                        <p className={ABOUT_VALUES_STYLES.card.description}>{value.description}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default AboutValues;
