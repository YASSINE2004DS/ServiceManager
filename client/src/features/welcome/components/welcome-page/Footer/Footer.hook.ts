import { COMPANY_INFO, NAVIGATION_ITEMS, CONTACT_INFO } from './Footer.constants';
import { formatPhoneNumber } from './Footer.util';
import type { FooterProps } from './Footer.types';

/**
 * @hook useFooter
 * @description Custom hook that contains all logic for the Footer component
 *
 * @param {FooterProps} props - Props passed to the Footer component
 * @returns {Object} All data and functions needed by the Footer component
 *
 * @author Ayyoub El Kouri
 * @date 14/06/2025
 * @lastUpdate 14/06/2025
 */
export const useFooter = (props: FooterProps) => {
    const { onNavigation, onContactClick } = props;

    const currentYear = new Date().getFullYear();
    const formattedPhone = formatPhoneNumber(CONTACT_INFO.phone);

    return {
        companyName: COMPANY_INFO.name,
        companyDescription: COMPANY_INFO.description,
        logoPath: COMPANY_INFO.logoPath,
        navigationItems: NAVIGATION_ITEMS,
        contactInfo: CONTACT_INFO,
        onNavigation,
        onContactClick,
        formattedPhone,
        currentYear,
    };
};
