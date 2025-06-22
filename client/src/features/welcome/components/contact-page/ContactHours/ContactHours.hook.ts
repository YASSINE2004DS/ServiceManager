import { HOURS_CONTENT } from './ContactHours.constants';
import type { ContactHoursProps } from './ContactHours.types';

/**
 * @hook useContactHours
 * @description Custom hook that contains all logic for the ContactHours component
 *
 * @param {ContactHoursProps} props - Props passed to the ContactHours component
 * @returns {Object} All data and functions needed by the ContactHours component
 *
 * @author Ayyoub El Kouri
 * @date 14/06/2025
 * @lastUpdate 14/06/2025
 */
export const useContactHours = (props: ContactHoursProps) => {
    return {
        title: HOURS_CONTENT.title,
        schedule: HOURS_CONTENT.schedule,
    };
};
