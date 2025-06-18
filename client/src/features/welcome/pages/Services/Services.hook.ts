import { useState, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { SERVICES_LIST, SERVICE_CATEGORIES, PAGE_CONTENT } from './Services.constants';
import { filterServices } from './Services.util';

/**
 * @hook useServices
 * @description Custom hook that contains all logic for the Services page component
 *
 * @returns {Object} All data and functions needed by the Services component
 *
 * @author Ayyoub El Kouri
 * @date 14/06/2025
 * @lastUpdate 14/06/2025
 */
export const useServices = () => {
    const navigate = useNavigate();

    // State for filters
    const [selectedCategory, setSelectedCategory] = useState<string>('all');
    const [searchTerm, setSearchTerm] = useState<string>('');

    /**
     * @function handleCategoryChange
     * @description Handle category filter change
     *
     * @param {string} category - Selected category
     */
    const handleCategoryChange = useCallback((category: string) => {
        setSelectedCategory(category);
    }, []);

    /**
     * @function handleSearchChange
     * @description Handle search term change
     *
     * @param {string} term - Search term entered by user
     */
    const handleSearchChange = useCallback((term: string) => {
        setSearchTerm(term);
    }, []);

    /**
     * @function handleGoBack
     * @description Navigate back to home page
     */
    const handleGoBack = useCallback(() => {
        navigate('/');
    }, [navigate]);

    // Memoized filtered services
    const filteredServices = useMemo(() => {
        return filterServices(SERVICES_LIST, selectedCategory, searchTerm);
    }, [selectedCategory, searchTerm]);

    // Get category counts
    const categoryCounts = useMemo(() => {
        const counts = SERVICE_CATEGORIES.reduce((acc, category) => {
            acc[category.id] = SERVICES_LIST.filter(
                (service) => service.category === category.id,
            ).length;
            return acc;
        }, {} as Record<string, number>);
        counts['all'] = SERVICES_LIST.length;
        return counts;
    }, []);

    return {
        // Data
        services: filteredServices,
        categories: SERVICE_CATEGORIES,
        selectedCategory,
        searchTerm,
        pageContent: PAGE_CONTENT,
        totalServices: SERVICES_LIST.length,
        filteredCount: filteredServices.length,
        categoryCounts,

        // Actions
        handleCategoryChange,
        handleSearchChange,
        handleGoBack,
    };
};
