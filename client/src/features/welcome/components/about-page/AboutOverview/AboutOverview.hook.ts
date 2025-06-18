import { OVERVIEW_CONTENT } from './AboutOverview.constants';
import type { AboutOverviewProps } from './AboutOverview.types';

/**
 * @hook useAboutOverview
 * @description Custom hook that contains all logic for the AboutOverview component
 *
 * @param {AboutOverviewProps} props - Props passed to the AboutOverview component
 * @returns {Object} All data and functions needed by the AboutOverview component
 *
 * @author Ayyoub El Kouri
 * @date 14/06/2025
 * @lastUpdate 14/06/2025
 */
export const useAboutOverview = (props: AboutOverviewProps) => {
    return {
        ...OVERVIEW_CONTENT,
    };
};
