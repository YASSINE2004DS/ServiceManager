import type { ServiceInfo } from '../../../pages/Welcome/Welcome.types';

/**
 * @interface ServicesProps
 * @description Props interface for the Services component
 */
export interface ServicesProps {
    onServiceClick: (serviceId: string) => void;
}
