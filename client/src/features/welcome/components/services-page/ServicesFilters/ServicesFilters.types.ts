import type { ServiceCategory } from '../../../pages/Services/Services.types';

/**
 * @interface ServicesFiltersProps
 * @description Props interface for the ServicesFilters component
 */
export interface ServicesFiltersProps {
    searchTerm: string;
    selectedCategory: string;
    categories: ServiceCategory[];
    categoryCounts: Record<string, number>;
    onSearchChange: (term: string) => void;
    onCategoryChange: (category: string) => void;
}
