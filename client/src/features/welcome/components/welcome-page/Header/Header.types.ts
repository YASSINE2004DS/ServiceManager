import type { NavigationItem } from '../../../pages/Welcome/Welcome.types';

/**
 * @interface HeaderProps
 * @description Props interface for the Header component
 */
export interface HeaderProps {
    onLogin: () => void;
    onRegister: () => void;
    onNavigation: (href: string) => void;
}
