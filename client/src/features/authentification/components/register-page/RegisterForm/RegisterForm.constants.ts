/**
 * @constant FORM_CONTENT
 * @description Content for the register form
 */
export const FORM_CONTENT = {
    submitButtonText: "S'inscrire",
    submittingText: 'Inscription en cours...',
    successMessage: '✅ Inscription réussie ! Redirection en cours...',
} as const;

/**
 * @constant FORM_LABELS
 * @description Form field labels
 */
export const FORM_LABELS = {
    firstName: 'Prénom',
    lastName: 'Nom',
    email: 'Adresse email',
    password: 'Mot de passe',
} as const;

/**
 * @constant FORM_PLACEHOLDERS
 * @description Form field placeholders
 */
export const FORM_PLACEHOLDERS = {
    firstName: 'Votre prénom',
    lastName: 'Votre nom',
    email: 'votre.email@exemple.com',
    password: 'Votre mot de passe',
} as const;
