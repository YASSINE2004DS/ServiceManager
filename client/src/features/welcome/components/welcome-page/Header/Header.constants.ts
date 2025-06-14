import type { NavigationItem } from '../../../pages/Welcome/Welcome.types';

/**
 * @constant COMPANY_INFO
 * @description Company basic information for header
 */
export const COMPANY_INFO = {
    name: 'Safarelec',
    logoPath: 'src/assets/safarelec-logo.png',
} as const;

/**
 * @constant NAVIGATION_ITEMS
 * @description Navigation items for header
 */
export const NAVIGATION_ITEMS: NavigationItem[] = [
    { label: 'Accueil', href: '/' },
    { label: 'Services', href: '/services' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
];
