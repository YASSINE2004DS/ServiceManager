import type { ServiceInfo, ServiceCategory } from './Services.types';

/**
 * @constant SERVICE_CATEGORIES
 * @description Available service categories
 */
export const SERVICE_CATEGORIES: ServiceCategory[] = [
    {
        id: 'installation',
        name: 'Installation',
        color: 'blue',
    },
    {
        id: 'maintenance',
        name: 'Maintenance',
        color: 'green',
    },
    {
        id: 'consulting',
        name: 'Conseil',
        color: 'purple',
    },
    {
        id: 'renewable',
        name: 'Énergies Renouvelables',
        color: 'yellow',
    },
];

/**
 * @constant SERVICES_LIST
 * @description List of all company services for internal reference
 */
export const SERVICES_LIST: ServiceInfo[] = [
    {
        id: 'elec-residentiel',
        name: 'Installation Électrique Résidentielle',
        description: 'Installation complète de systèmes électriques pour habitations',
        category: 'installation',
        status: 'active',
        lastUpdated: '2025-01-10',
        responsibleEmployee: 'Ahmed Benali',
    },
    {
        id: 'elec-industriel',
        name: 'Installation Électrique Industrielle',
        description: 'Solutions électriques pour entreprises et usines',
        category: 'installation',
        status: 'active',
        lastUpdated: '2025-01-08',
        responsibleEmployee: 'Fatima Zahra',
    },
    {
        id: 'maintenance-preventive',
        name: 'Maintenance Préventive',
        description: 'Maintenance régulière pour éviter les pannes',
        category: 'maintenance',
        status: 'active',
        lastUpdated: '2025-01-12',
        responsibleEmployee: 'Omar Kadiri',
    },
    {
        id: 'maintenance-corrective',
        name: 'Maintenance Corrective',
        description: "Réparations d'urgence et dépannage",
        category: 'maintenance',
        status: 'active',
        lastUpdated: '2025-01-11',
        responsibleEmployee: 'Youssef Alami',
    },
    {
        id: 'audit-energetique',
        name: 'Audit Énergétique',
        description: 'Analyse de la consommation énergétique',
        category: 'consulting',
        status: 'active',
        lastUpdated: '2025-01-09',
        responsibleEmployee: 'Aicha Bennani',
    },
    {
        id: 'conseil-efficacite',
        name: 'Conseil en Efficacité Énergétique',
        description: 'Accompagnement pour réduire la consommation',
        category: 'consulting',
        status: 'active',
        lastUpdated: '2025-01-07',
        responsibleEmployee: 'Hassan Tazi',
    },
    {
        id: 'panneaux-solaires',
        name: 'Installation Photovoltaïque',
        description: 'Installation de panneaux solaires',
        category: 'renewable',
        status: 'active',
        lastUpdated: '2025-01-06',
        responsibleEmployee: 'Laila Chraibi',
    },
    {
        id: 'stockage-batteries',
        name: 'Stockage par Batteries',
        description: "Solutions de stockage d'énergie",
        category: 'renewable',
        status: 'maintenance',
        lastUpdated: '2025-01-05',
        responsibleEmployee: 'Karim Benjelloun',
    },
];

/**
 * @constant PAGE_CONTENT
 * @description Static content for the Services page
 */
export const PAGE_CONTENT = {
    title: 'Liste des Services',
    subtitle: "Vue d'ensemble des services offerts par l'entreprise",
    searchPlaceholder: 'Rechercher un service...',
    noServicesMessage: 'Aucun service trouvé.',
    filterAllLabel: 'Tous',
    totalServicesLabel: 'Total des services',
};
