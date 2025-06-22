import { VALIDATION_MESSAGES } from './ContactForm.constants';
import type { ContactFormData, FormErrors } from './ContactForm.types';

/**
 * @function validateEmail
 * @description Validate email address format
 *
 * @param {string} email - Email address to validate
 * @returns {boolean} True if email is valid, false otherwise
 *
 * @author Ayyoub El Kouri
 * @date 14/06/2025
 * @lastUpdate 14/06/2025
 */
export const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

/**
 * @function validateContactForm
 * @description Validate the entire contact form
 *
 * @param {ContactFormData} formData - Form data to validate
 * @returns {FormErrors} Object containing validation errors
 *
 * @author Ayyoub El Kouri
 * @date 14/06/2025
 * @lastUpdate 14/06/2025
 */
export const validateContactForm = (formData: ContactFormData): FormErrors => {
    const errors: FormErrors = {};

    // Validate name
    if (!formData.name.trim()) {
        errors.name = VALIDATION_MESSAGES.name.required;
    } else if (formData.name.trim().length < 2) {
        errors.name = VALIDATION_MESSAGES.name.minLength;
    }

    // Validate email
    if (!formData.email.trim()) {
        errors.email = VALIDATION_MESSAGES.email.required;
    } else if (!validateEmail(formData.email)) {
        errors.email = VALIDATION_MESSAGES.email.invalid;
    }

    // Validate subject
    if (!formData.subject.trim()) {
        errors.subject = VALIDATION_MESSAGES.subject.required;
    } else if (formData.subject.trim().length < 3) {
        errors.subject = VALIDATION_MESSAGES.subject.minLength;
    }

    // Validate message
    if (!formData.message.trim()) {
        errors.message = VALIDATION_MESSAGES.message.required;
    } else if (formData.message.trim().length < 10) {
        errors.message = VALIDATION_MESSAGES.message.minLength;
    }

    return errors;
};

/**
 * @function createEmailBody
 * @description Create formatted email body from form data
 *
 * @param {ContactFormData} formData - Form data to format
 * @returns {string} Formatted email body
 *
 * @author Ayyoub El Kouri
 * @date 14/06/2025
 * @lastUpdate 14/06/2025
 */
export const createEmailBody = (formData: ContactFormData): string => {
    const { name, email, phone, subject, message } = formData;

    let emailBody = `Nouveau message de contact depuis le site Safarelec\n\n`;
    emailBody += `Nom: ${name}\n`;
    emailBody += `Email: ${email}\n`;

    if (phone) {
        emailBody += `Téléphone: ${phone}\n`;
    }

    emailBody += `Sujet: ${subject}\n\n`;
    emailBody += `Message:\n${message}\n\n`;
    emailBody += `---\n`;
    emailBody += `Ce message a été envoyé depuis le formulaire de contact du site web Safarelec.`;

    return emailBody;
};
