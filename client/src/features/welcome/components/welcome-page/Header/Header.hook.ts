import { COMPANY_INFO, NAVIGATION_ITEMS } from './Header.constants';
import type { HeaderProps } from './Header.types';

/**
 * @hook useHeader
 * @description Custom hook that contains all logic for the Header component
 *
 * @param {HeaderProps} props - Props passed to the Header component
 * @returns {Object} All data and functions needed by the Header component
 *
 * @author Ayyoub El Kouri
 * @date 14/06/2025
 * @lastUpdate 14/06/2025
 */
export const useHeader = (props: HeaderProps) => {
    const { onLogin, onRegister, onNavigation } = props;

    return {
        companyName: COMPANY_INFO.name,
        logoPath: COMPANY_INFO.logoPath,
        navigationItems: NAVIGATION_ITEMS,
        onLogin,
        onRegister,
        onNavigation,
    };
};
