/**
 * @function formatFoundedYear
 * @description Format the founded year for display
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
