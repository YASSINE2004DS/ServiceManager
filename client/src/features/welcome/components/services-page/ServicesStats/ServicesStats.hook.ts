import type { ServicesStatsProps } from './ServicesStats.types';

/**
 * @hook useServicesStats
 * @description Custom hook that contains all logic for the ServicesStats component
 *
 * @param {ServicesStatsProps} props - Props passed to the ServicesStats component
 * @returns {Object} All data and functions needed by the ServicesStats component
 *
 * @author Ayyoub El Kouri
 * @date 14/06/2025
 * @lastUpdate 14/06/2025
 */
export const useServicesStats = (props: ServicesStatsProps) => {
    const { filteredCount, totalServices } = props;

    return {
        filteredCount,
        totalServices,
    };
};
