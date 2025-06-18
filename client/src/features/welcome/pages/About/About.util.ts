/**
 * @function formatFoundedYear
 * @description Format the founded year to show years of experience
 *
 * @param {number} year - The year the company was founded
 * @returns {string} Formatted string showing years of experience
 *
 * @author Ayyoub El Kouri
 * @date 14/06/2025
 * @lastUpdate 14/06/2025
 */
export const formatFoundedYear = (year: number): string => {
    const currentYear = new Date().getFullYear();
    const yearsOfExperience = currentYear - year;
    return `${yearsOfExperience} ans d'expérience`;
};

/**
 * @function formatTimelineYear
 * @description Format year for timeline display
 *
 * @param {number} year - The year to format
 * @returns {string} Formatted year string
 *
 * @author Ayyoub El Kouri
 * @date 14/06/2025
 * @lastUpdate 14/06/2025
 */
export const formatTimelineYear = (year: number): string => {
    return year.toString();
};

/**
 * @function getInitials
 * @description Get initials from a person's name for avatar placeholder
 *
 * @param {string} name - The person's full name
 * @returns {string} Initials (first letters of first and last name)
 *
 * @author Ayyoub El Kouri
 * @date 14/06/2025
 * @lastUpdate 14/06/2025
 */
export const getInitials = (name: string): string => {
    const names = name.split(' ');
    const initials = names.map((n) => n.charAt(0)).join('');
    return initials.slice(0, 2).toUpperCase();
};
