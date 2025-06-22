import type { NavigationItem, ContactInfo } from '../../../pages/Welcome/Welcome.types';

/**
 * @interface FooterProps
 * @description Props interface for the Footer component
 */
export interface FooterProps {
    onNavigation: (href: string) => void;
    onContactClick: (type: 'email' | 'phone') => void;
}
