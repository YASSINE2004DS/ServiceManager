import { VALUES_CONTENT } from './AboutValues.constants';
import type { AboutValuesProps } from './AboutValues.types';

/**
 * @hook useAboutValues
 * @description Custom hook that contains all logic for the AboutValues component
 *
 * @param {AboutValuesProps} props - Props passed to the AboutValues component
 * @returns {Object} All data and functions needed by the AboutValues component
 *
 * @author Ayyoub El Kouri
 * @date 14/06/2025
 * @lastUpdate 14/06/2025
 */
export const useAboutValues = (props: AboutValuesProps) => {
    return {
        ...VALUES_CONTENT,
    };
};
