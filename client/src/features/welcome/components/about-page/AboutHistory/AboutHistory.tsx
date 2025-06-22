import { useAboutHistory } from './AboutHistory.hook';
import { ABOUT_HISTORY_STYLES } from './AboutHistory.styles';
import { formatTimelineYear } from './AboutHistory.util';
import type { AboutHistoryProps } from './AboutHistory.types';

/**
 * @component AboutHistory
 * @description Company history timeline component for the About page
 *
 * @dependencies useAboutHistory hook, AboutHistory.styles, AboutHistory.util
 *
 * @author Ayyoub El Kouri
 * @date 14/06/2025
 * @lastUpdate 14/06/2025
 */
const AboutHistory = (props: AboutHistoryProps) => {
    const { sectionTitle, sectionSubtitle, timeline } = useAboutHistory(props);

    return (
        <section className={ABOUT_HISTORY_STYLES.container}>
            <h2 className={ABOUT_HISTORY_STYLES.sectionTitle}>{sectionTitle}</h2>
            <p className={ABOUT_HISTORY_STYLES.sectionSubtitle}>
                {sectionSubtitle}
            </p>
            <div className={ABOUT_HISTORY_STYLES.timeline}>
                {timeline.map((event, index) => (
                    <div key={index} className={ABOUT_HISTORY_STYLES.timelineItem.container}>
                        <div className={ABOUT_HISTORY_STYLES.timelineItem.dot}></div>
                        {index < timeline.length - 1 && (
                            <div className={ABOUT_HISTORY_STYLES.timelineItem.line}></div>
                        )}
                        <div className={ABOUT_HISTORY_STYLES.timelineItem.content}>
                            <div className={ABOUT_HISTORY_STYLES.timelineItem.year}>
                                {formatTimelineYear(event.year)}
                            </div>
                            <h3 className={ABOUT_HISTORY_STYLES.timelineItem.title}>
                                {event.title}
                            </h3>
                            <p className={ABOUT_HISTORY_STYLES.timelineItem.description}>
                                {event.description}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default AboutHistory;
