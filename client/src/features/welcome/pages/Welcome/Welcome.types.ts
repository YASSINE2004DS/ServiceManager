/**
 * @interface CompanyInfo
 * @description Interface for company information displayed on the welcome page
 */
export interface CompanyInfo {
    name: string;
    description: string;
    mission: string;
    vision: string;
    foundedYear: number;
}

/**
 * @interface ServiceInfo
 * @description Interface for services offered by the company
 */
export interface ServiceInfo {
    id: string;
    title: string;
    description: string;
    icon: string;
}

/**
 * @interface NavigationItem
 * @description Interface for navigation items in header and footer
 */
export interface NavigationItem {
    label: string;
    href: string;
    isExternal?: boolean;
}

/**
 * @interface WelcomePageProps
 * @description Props interface for the Welcome component
 */
export interface WelcomePageProps {
    className?: string;
}

/**
 * @interface ContactInfo
 * @description Interface for company contact information
 */
export interface ContactInfo {
    email: string;
    phone: string;
    address: string;
    website: string;
}
