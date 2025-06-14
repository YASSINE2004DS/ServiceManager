import { HEADER_CONTENT } from './ServicesHeader.constants';
import type { ServicesHeaderProps } from './ServicesHeader.types';

/**
 * @hook useServicesHeader
 * @description Custom hook that contains all logic for the ServicesHeader component
 *
 * @param {ServicesHeaderProps} props - Props passed to the ServicesHeader component
 * @returns {Object} All data and functions needed by the ServicesHeader component
 *
 * @author Ayyoub El Kouri
 * @date 14/06/2025
 * @lastUpdate 14/06/2025
 */
export const useServicesHeader = (props: ServicesHeaderProps) => {
    const { onGoBack } = props;

    return {
        ...HEADER_CONTENT,
        onGoBack,
    };
};
