import type { CompanyInfo, ServiceInfo, NavigationItem } from './Welcome.types';

/**
 * @constant COMPANY_INFO
 * @description Company information for Safarelec
 */
export const COMPANY_INFO: CompanyInfo = {
    name: 'Safarelec',
    description: 'Leader en solutions électriques et énergétiques au Maroc',
    mission:
        'Fournir des solutions électriques innovantes et durables pour accompagner le développement énergétique du Maroc',
    vision: 'Être le partenaire de référence en matière de solutions électriques et énergétiques',
    foundedYear: 2010,
};

/**
 * @constant SERVICES
 * @description List of services offered by Safarelec
 */
export const SERVICES: ServiceInfo[] = [
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

/**
 * @constant NAVIGATION_ITEMS
 * @description Navigation items for header and footer
 */
export const NAVIGATION_ITEMS: NavigationItem[] = [
    { label: 'Accueil', href: '/' },
    { label: 'Services', href: '/services' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
];

/**
 * @constant CONTACT_INFO
 * @description Company contact information (kept here as it's used by the page logic)
 */
export const CONTACT_INFO: ContactInfo = {
    email: 'contact@safarelec.ma',
    phone: '+212 5 22 00 00 00',
    address: 'Casablanca, Maroc',
    website: 'www.safarelec.ma',
};

/**
 * @constant LOGO_PATH
 * @description Path to the company logo
 */
export const LOGO_PATH = '/src/assets/safarelec-logo.png';

/**
 * @constant HERO_SECTION
 * @description Hero section content
 */
export const HERO_SECTION = {
    title: 'Bienvenue chez Safarelec',
    subtitle: 'Votre partenaire de confiance en solutions électriques',
    ctaText: 'Découvrir nos services',
};
