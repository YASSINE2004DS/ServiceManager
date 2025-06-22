import type { ContactInfo } from '../../../pages/Welcome/Welcome.types';

/**
 * @constant CONTACT_INFO_CONTENT
 * @description Content for the contact info component
 */
export const CONTACT_INFO_CONTENT = {
    title: 'Informations de Contact',
} as const;

/**
 * @constant CONTACT_INFO
 * @description Company contact information
 */
export const CONTACT_INFO: ContactInfo = {
    email: 'contact@safarelec.ma',
    phone: '+212 5 22 00 00 00',
    address: 'EL JADIDA, Maroc',
    website: 'https://www.safarelec.ma',
};

/**
 * @constant CONTACT_ITEMS
 * @description Contact information items with icons and labels
 */
export const CONTACT_ITEMS = [
    {
        icon: '📧',
        label: 'Email',
        value: CONTACT_INFO.email,
        type: 'email' as const,
    },
    {
        icon: '📞',
        label: 'Téléphone',
        value: CONTACT_INFO.phone,
        type: 'phone' as const,
    },
    {
        icon: '📍',
        label: 'Adresse',
        value: CONTACT_INFO.address,
        type: 'address' as const,
    },
    {
        icon: '🌐',
        label: 'Site Web',
        value: CONTACT_INFO.website,
        type: 'website' as const,
    },
] as const;
