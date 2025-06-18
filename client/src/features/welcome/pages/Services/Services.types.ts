/**
 * @interface ServicesPageProps
 * @description Props interface for the Services page component
 */
export interface ServicesPageProps {
    className?: string;
}

/**
 * @interface ServiceInfo
 * @description Simple service information for internal use
 */
export interface ServiceInfo {
    id: string;
    name: string;
    description: string;
    category: string;
    status: 'active' | 'inactive' | 'maintenance';
    lastUpdated: string;
    responsibleEmployee?: string;
}

/**
 * @interface ServiceCategory
 * @description Service category for organization
 */
export interface ServiceCategory {
    id: string;
    name: string;
    color: string;
}
