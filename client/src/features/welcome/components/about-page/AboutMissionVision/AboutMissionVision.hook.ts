import { MISSION_VISION_CONTENT } from './AboutMissionVision.constants';
import type { AboutMissionVisionProps } from './AboutMissionVision.types';

/**
 * @hook useAboutMissionVision
 * @description Custom hook that contains all logic for the AboutMissionVision component
 *
 * @param {AboutMissionVisionProps} props - Props passed to the AboutMissionVision component
 * @returns {Object} All data and functions needed by the AboutMissionVision component
 *
 * @author Ayyoub El Kouri
 * @date 14/06/2025
 * @lastUpdate 14/06/2025
 */
export const useAboutMissionVision = (props: AboutMissionVisionProps) => {
    return {
        ...MISSION_VISION_CONTENT,
    };
};
