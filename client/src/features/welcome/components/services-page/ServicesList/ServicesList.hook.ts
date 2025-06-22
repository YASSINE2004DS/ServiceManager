import { LIST_CONTENT } from './ServicesList.constants';
import type { ServicesListProps } from './ServicesList.types';

/**
 * @hook useServicesList
 * @description Custom hook that contains all logic for the ServicesList component
 *
 * @param {ServicesListProps} props - Props passed to the ServicesList component
 * @returns {Object} All data and functions needed by the ServicesList component
 *
 * @author Ayyoub El Kouri
 * @date 14/06/2025
 * @lastUpdate 14/06/2025
 */
export const useServicesList = (props: ServicesListProps) => {
    const { services, categories } = props;

    return {
        services,
        categories,
        ...LIST_CONTENT,
    };
};
