import { useAboutMissionVision } from './AboutMissionVision.hook';
import { ABOUT_MISSION_VISION_STYLES } from './AboutMissionVision.styles';
import type { AboutMissionVisionProps } from './AboutMissionVision.types';

/**
 * @component AboutMissionVision
 * @description Mission and vision section component for the About page
 *
 * @dependencies useAboutMissionVision hook, AboutMissionVision.styles
 *
 * @author Ayyoub El Kouri
 * @date 14/06/2025
 * @lastUpdate 14/06/2025
 */
const AboutMissionVision = (props: AboutMissionVisionProps) => {
    const { sectionTitle, mission, vision } = useAboutMissionVision(props);

    return (
        <section className={ABOUT_MISSION_VISION_STYLES.container}>
            <h2 className={ABOUT_MISSION_VISION_STYLES.sectionTitle}>{sectionTitle}</h2>
            <div className={ABOUT_MISSION_VISION_STYLES.grid}>
                <div className={ABOUT_MISSION_VISION_STYLES.card.container}>
                    <h3 className={ABOUT_MISSION_VISION_STYLES.card.title}>
                        {mission.icon} {mission.title}
                    </h3>
                    <p className={ABOUT_MISSION_VISION_STYLES.card.text}>
                        {mission.text}
                    </p>
                </div>
                <div className={ABOUT_MISSION_VISION_STYLES.card.container}>
                    <h3 className={ABOUT_MISSION_VISION_STYLES.card.title}>
                        {vision.icon} {vision.title}
                    </h3>
                    <p className={ABOUT_MISSION_VISION_STYLES.card.text}>
                        {vision.text}
                    </p>
                </div>
            </div>
        </section>
    );
};

export default AboutMissionVision;
