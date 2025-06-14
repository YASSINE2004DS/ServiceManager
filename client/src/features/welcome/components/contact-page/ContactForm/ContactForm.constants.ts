/**
 * @constant FORM_CONTENT
 * @description Content for the contact form component
 */
export const FORM_CONTENT = {
    formTitle: 'Envoyez-nous un Message',
    successMessage: '✅ Votre message a été envoyé avec succès !',
    submitButtonText: 'Envoyer le Message',
    submittingText: 'Envoi en cours...',
    targetEmail: 'Ayyoubelkouri@gmail.com',
} as const;

/**
 * @constant FORM_LABELS
 * @description Form field labels and placeholders
 */
export const FORM_LABELS = {
    name: {
        label: 'Nom Complet *',
        placeholder: 'Votre nom complet',
    },
    email: {
        label: 'Email *',
        placeholder: 'votre.email@exemple.com',
    },
    phone: {
        label: 'Téléphone',
        placeholder: '+212 6 00 00 00 00',
    },
    subject: {
        label: 'Sujet *',
        placeholder: 'Sujet de votre message',
    },
    message: {
        label: 'Message *',
        placeholder: 'Décrivez votre demande en détail...',
    },
} as const;

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
