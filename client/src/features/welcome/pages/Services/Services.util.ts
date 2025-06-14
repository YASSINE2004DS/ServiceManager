import type { ServiceInfo } from './Services.types';

/**
 * @function filterServices
 * @description Filter services based on category and search term
 *
 * @param {ServiceInfo[]} services - Array of services to filter
 * @param {string} category - Selected category ('all' for all categories)
 * @param {string} searchTerm - Search term
 * @returns {ServiceInfo[]} Filtered array of services
 *
 * @author Ayyoub El Kouri
 * @date 14/06/2025
 * @lastUpdate 14/06/2025
 */
export const filterServices = (
    services: ServiceInfo[],
    category: string,
    searchTerm: string,
): ServiceInfo[] => {
    return services.filter((service) => {
        // Category filter
        const categoryMatch = category === 'all' || service.category === category;

        // Search term filter
        const searchMatch =
            !searchTerm ||
            service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            service.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (service.responsibleEmployee &&
                service.responsibleEmployee.toLowerCase().includes(searchTerm.toLowerCase()));

        return categoryMatch && searchMatch;
    });
};

/**
 * @function formatDate
 * @description Format date for display
 *
 * @param {string} dateString - Date string in YYYY-MM-DD format
 * @returns {string} Formatted date string
 *
 * @author Ayyoub El Kouri
 * @date 14/06/2025
 * @lastUpdate 14/06/2025
 */
export const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
};

/**
 * @function getStatusLabel
 * @description Get status label in French
 *
 * @param {string} status - Service status
 * @returns {string} Status label in French
 *
 * @author Ayyoub El Kouri
 * @date 14/06/2025
 * @lastUpdate 14/06/2025
 */
export const getStatusLabel = (status: string): string => {
    switch (status) {
        case 'active':
            return 'Actif';
        case 'inactive':
            return 'Inactif';
        case 'maintenance':
            return 'Maintenance';
        default:
            return 'Inconnu';
    }
};

/**
 * @function getCategoryName
 * @description Get category name from categories array
 *
 * @param {string} categoryId - Category ID
 * @param {Array} categories - Array of categories
 * @returns {string} Category name
 *
 * @author Ayyoub El Kouri
 * @date 14/06/2025
 * @lastUpdate 14/06/2025
 */
export const getCategoryName = (categoryId: string, categories: any[]): string => {
    const category = categories.find((cat) => cat.id === categoryId);
    return category ? category.name : 'Catégorie inconnue';
};
