import type { ServiceInfo, ServiceCategory } from '../../../pages/Services/Services.types';

/**
 * @interface ServicesListProps
 * @description Props interface for the ServicesList component
 */
export interface ServicesListProps {
    services: ServiceInfo[];
    categories: ServiceCategory[];
}
