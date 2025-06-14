import { SERVICES_DATA } from './Services.constants';
import type { ServicesProps } from './Services.types';

/**
 * @hook useServices
 * @description Custom hook that contains all logic for the Services component
 *
 * @param {ServicesProps} props - Props passed to the Services component
 * @returns {Object} All data and functions needed by the Services component
 *
 * @author Ayyoub El Kouri
 * @date 14/06/2025
 * @lastUpdate 14/06/2025
 */
export const useServices = (props: ServicesProps) => {
    const { onServiceClick } = props;

    return {
        services: SERVICES_DATA,
        onServiceClick,
    };
};
