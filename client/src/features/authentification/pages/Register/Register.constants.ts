/**
 * @constant API_ENDPOINTS
 * @description API endpoints for authentication
 */
export const API_ENDPOINTS = {
    REGISTER: 'http://localhost:8000/api/user/',
} as const;

/**
 * @constant FORM_LABELS
 * @description Labels for form fields
 */
export const FORM_LABELS = {
    firstName: 'Prénom',
    lastName: 'Nom',
    email: 'Email',
    password: 'Mot de passe',
} as const;

/**
 * @constant FORM_PLACEHOLDERS
 * @description Placeholders for form fields
 */
export const FORM_PLACEHOLDERS = {
    firstName: 'Entrez votre prénom',
    lastName: 'Entrez votre nom',
    email: 'Entrez votre email',
    password: 'Entrez votre mot de passe',
} as const;

/**
 * @constant FORM_CONTENT
 * @description Content for the register form
 */
export const FORM_CONTENT = {
    title: 'Inscription',
    subtitle: 'Créez votre compte',
    submitButton: "S'inscrire",
    submittingText: 'Inscription en cours...',
    loginLink: 'Vous avez déjà un compte ? Connectez-vous',
    successMessage: 'Inscription réussie !',
} as const;

/**
 * @constant VALIDATION_MESSAGES
 * @description Validation error messages
 */
export const VALIDATION_MESSAGES = {
    firstName: {
        required: 'Le prénom est requis',
        minLength: 'Le prénom doit contenir au moins 2 caractères',
    },
    lastName: {
        required: 'Le nom est requis',
        minLength: 'Le nom doit contenir au moins 2 caractères',
    },
    email: {
        required: "L'email est requis",
        invalid: "Format d'email invalide",
    },
    password: {
        required: 'Le mot de passe est requis',
        minLength: 'Le mot de passe doit contenir au moins 6 caractères',
    },
    submit: {
        networkError: 'Erreur de connexion. Vérifiez votre connexion internet.',
        emailExists: 'Cet email est déjà utilisé',
        serverError: 'Erreur serveur. Veuillez réessayer plus tard.',
    },
} as const;
