import { FILTER_LABELS } from './ServicesFilters.constants';
import type { ServicesFiltersProps } from './ServicesFilters.types';

/**
 * @hook useServicesFilters
 * @description Custom hook that contains all logic for the ServicesFilters component
 *
 * @param {ServicesFiltersProps} props - Props passed to the ServicesFilters component
 * @returns {Object} All data and functions needed by the ServicesFilters component
 *
 * @author Ayyoub El Kouri
 * @date 14/06/2025
 * @lastUpdate 14/06/2025
 */
export const useServicesFilters = (props: ServicesFiltersProps) => {
    const {
        searchTerm,
        selectedCategory,
        categories,
        categoryCounts,
        onSearchChange,
        onCategoryChange,
    } = props;

    return {
        searchTerm,
        selectedCategory,
        categories,
        categoryCounts,
        ...FILTER_LABELS,
        onSearchChange,
        onCategoryChange,
    };
};
