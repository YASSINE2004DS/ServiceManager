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

/**
 * @function formatPhoneNumber
 * @description Format phone number for better display
 *
 * @param {string} phone - Raw phone number
 * @returns {string} Formatted phone number
 *
 * @author Ayyoub El Kouri
 * @date 14/06/2025
 * @lastUpdate 14/06/2025
 */
export const formatPhoneNumber = (phone: string): string => {
    // Remove any existing formatting
    const cleanPhone = phone.replace(/\D/g, '');

    // Format as +212 5 22 00 00 00
    if (cleanPhone.length >= 12) {
        return cleanPhone.replace(
            /(\d{3})(\d{1})(\d{2})(\d{2})(\d{2})(\d{2})/,
            '+$1 $2 $3 $4 $5 $6',
        );
    }

    return phone; // Return original if not matching expected format
};

/**
 * @function truncateText
 * @description Truncate text to specified length with ellipsis
 *
 * @param {string} text - Text to truncate
 * @param {number} maxLength - Maximum length before truncation
 * @returns {string} Truncated text with ellipsis if needed
 *
 * @author Ayyoub El Kouri
 * @date 14/06/2025
 * @lastUpdate 14/06/2025
 */
export const truncateText = (text: string, maxLength: number): string => {
    if (text.length <= maxLength) {
        return text;
    }

    return text.substring(0, maxLength).trim() + '...';
};

/**
 * @function isExternalLink
 * @description Check if a link is external (starts with http/https)
 *
 * @param {string} url - URL to check
 * @returns {boolean} True if external link, false otherwise
 *
 * @author Ayyoub El Kouri
 * @date 14/06/2025
 * @lastUpdate 14/06/2025
 */
export const isExternalLink = (url: string): boolean => {
    return url.startsWith('http://') || url.startsWith('https://');
};
