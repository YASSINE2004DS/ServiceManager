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
