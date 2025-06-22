import type { ServiceInfo } from '../../../pages/Welcome/Welcome.types';

/**
 * @constant SERVICES_DATA
 * @description List of services offered by Safarelec for the welcome page
 */
export const SERVICES_DATA: ServiceInfo[] = [
    {
        id: 'installation',
        title: 'Installation Électrique',
        description: 'Installation complète de systèmes électriques résidentiels et industriels',
        icon: '⚡',
    },
    {
        id: 'maintenance',
        title: 'Maintenance',
        description: 'Services de maintenance préventive et corrective pour tous vos équipements',
        icon: '🔧',
    },
    {
        id: 'consulting',
        title: 'Conseil Énergétique',
        description: 'Expertise et conseil pour optimiser votre consommation énergétique',
        icon: '💡',
    },
    {
        id: 'solar',
        title: 'Énergie Solaire',
        description: 'Installation et maintenance de systèmes photovoltaïques',
        icon: '☀️',
    },
];
