import { HISTORY_CONTENT } from './AboutHistory.constants';
import type { AboutHistoryProps } from './AboutHistory.types';

/**
 * @hook useAboutHistory
 * @description Custom hook that contains all logic for the AboutHistory component
 *
 * @param {AboutHistoryProps} props - Props passed to the AboutHistory component
 * @returns {Object} All data and functions needed by the AboutHistory component
 *
 * @author Ayyoub El Kouri
 * @date 14/06/2025
 * @lastUpdate 14/06/2025
 */
export const useAboutHistory = (props: AboutHistoryProps) => {
    const { companyName } = props;

    return {
        sectionTitle: HISTORY_CONTENT.sectionTitle,
        sectionSubtitle: `${HISTORY_CONTENT.sectionSubtitle} ${companyName}`,
        timeline: HISTORY_CONTENT.timeline,
    };
};
