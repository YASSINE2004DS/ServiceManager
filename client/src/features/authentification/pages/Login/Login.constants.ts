/**
 * @constant API_ENDPOINTS
 * @description API endpoints for authentication
 */
export const API_ENDPOINTS = {
    LOGIN: 'http://localhost:8000/api/user/login',
} as const;

/**
 * @constant FORM_LABELS
 * @description Labels for form fields
 */
export const FORM_LABELS = {
    email: 'Email',
    password: 'Mot de passe',
    firstName: 'Prénom',
    lastName: 'Nom',
} as const;

/**
 * @constant FORM_PLACEHOLDERS
 * @description Placeholders for form fields
 */
export const FORM_PLACEHOLDERS = {
    email: 'Entrez votre email',
    password: 'Entrez votre mot de passe',
    firstName: 'Entrez votre prénom',
    lastName: 'Entrez votre nom',
} as const;

/**
 * @constant FORM_CONTENT
 * @description Content for the login form
 */
export const FORM_CONTENT = {
    title: 'Connexion',
    subtitle: 'Connectez-vous à votre compte',
    submitButton: 'Se connecter',
    submittingText: 'Connexion en cours...',
    registerLink: "Vous n'avez pas de compte ? Inscrivez-vous",
    successMessage: 'Connexion réussie !',
} as const;

/**
 * @constant VALIDATION_MESSAGES
 * @description Validation error messages
 */
export const VALIDATION_MESSAGES = {
    email: {
        required: "L'email est requis",
        invalid: "Format d'email invalide",
    },
    password: {
        required: 'Le mot de passe est requis',
        minLength: 'Le mot de passe doit contenir au moins 6 caractères',
    },
    firstName: {
        required: 'Le prénom est requis',
        minLength: 'Le prénom doit contenir au moins 2 caractères',
    },
    lastName: {
        required: 'Le nom est requis',
        minLength: 'Le nom doit contenir au moins 2 caractères',
    },
    submit: {
        networkError: 'Erreur de connexion. Vérifiez votre connexion internet.',
        invalidCredentials: 'Email ou mot de passe incorrect',
        serverError: 'Erreur serveur. Veuillez réessayer plus tard.',
    },
} as const;
