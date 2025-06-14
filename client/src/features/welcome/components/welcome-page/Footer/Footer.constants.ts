import type { NavigationItem, ContactInfo } from '../../../pages/Welcome/Welcome.types';

/**
 * @constant COMPANY_INFO
 * @description Company information for footer
 */
export const COMPANY_INFO = {
    name: 'Safarelec',
    description: 'Leader en solutions électriques et énergétiques au Maroc',
    logoPath: '/src/assets/safarelec-logo.png',
} as const;

/**
 * @constant NAVIGATION_ITEMS
 * @description Navigation items for footer
 */
export const NAVIGATION_ITEMS: NavigationItem[] = [
    { label: 'Accueil', href: '/' },
    { label: 'Services', href: '/services' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
];

/**
 * @constant CONTACT_INFO
 * @description Company contact information
 */
export const CONTACT_INFO: ContactInfo = {
    email: 'contact@safarelec.ma',
    phone: '+212 5 22 00 00 00',
    address: 'Casablanca, Maroc',
    website: 'www.safarelec.ma',
};
