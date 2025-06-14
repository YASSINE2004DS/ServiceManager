import type { ContactInfo } from '../Welcome/Welcome.types';

/**
 * @constant PAGE_CONTENT
 * @description Static content for the Contact page
 */
export const PAGE_CONTENT = {
    pageTitle: 'Contactez-Nous',
    pageSubtitle:
        'Nous sommes là pour répondre à toutes vos questions et vous accompagner dans vos projets',
    targetEmail: 'Ayyoubelkouri@gmail.com',
} as const;

/**
 * @constant CONTACT_INFO
 * @description Company contact information displayed on the page
 */
export const CONTACT_INFO: ContactInfo = {
    email: 'contact@safarelec.ma',
    phone: '+212 5 22 00 00 00',
    address: 'Casablanca, Maroc',
    website: 'www.safarelec.ma',
};

/**
 * @constant VALIDATION_MESSAGES
 * @description Error messages for form validation
 */
export const VALIDATION_MESSAGES = {
    name: {
        required: 'Le nom complet est requis',
        minLength: 'Le nom doit contenir au moins 2 caractères',
    },
    email: {
        required: "L'adresse email est requise",
        invalid: 'Veuillez entrer une adresse email valide',
    },
    subject: {
        required: 'Le sujet est requis',
        minLength: 'Le sujet doit contenir au moins 3 caractères',
    },
    message: {
        required: 'Le message est requis',
        minLength: 'Le message doit contenir au moins 10 caractères',
    },
} as const;
