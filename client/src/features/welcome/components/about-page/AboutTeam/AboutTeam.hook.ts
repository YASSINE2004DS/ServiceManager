import { TEAM_CONTENT } from './AboutTeam.constants';
import type { AboutTeamProps } from './AboutTeam.types';

/**
 * @hook useAboutTeam
 * @description Custom hook that contains all logic for the AboutTeam component
 *
 * @param {AboutTeamProps} props - Props passed to the AboutTeam component
 * @returns {Object} All data and functions needed by the AboutTeam component
 *
 * @author Ayyoub El Kouri
 * @date 14/06/2025
 * @lastUpdate 14/06/2025
 */
export const useAboutTeam = (props: AboutTeamProps) => {
    return {
        ...TEAM_CONTENT,
    };
};
