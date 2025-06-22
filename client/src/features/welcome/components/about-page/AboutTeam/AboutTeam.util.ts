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
    const initials = names.map(n => n.charAt(0)).join('');
    return initials.slice(0, 2).toUpperCase();
};
