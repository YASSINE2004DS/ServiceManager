/**
 * @interface ContactFormData
 * @description Interface for contact form data
 */
export interface ContactFormData {
    name: string;
    email: string;
    phone: string;
    subject: string;
    message: string;
}

/**
 * @interface FormErrors
 * @description Interface for form validation errors
 */
export interface FormErrors {
    name?: string;
    email?: string;
    phone?: string;
    subject?: string;
    message?: string;
    submit?: string;
}

/**
 * @interface ContactFormProps
 * @description Props interface for the ContactForm component
 */
export interface ContactFormProps {
    // No props needed - component manages its own data
}
