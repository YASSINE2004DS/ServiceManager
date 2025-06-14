import { VALIDATION_MESSAGES } from './Login.constants';
import type { LoginFormData, LoginFormErrors, LoginApiRequest } from './Login.types';

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
 * @function validateLoginForm
 * @description Validate the entire login form
 *
 * @param {LoginFormData} formData - Form data to validate
 * @returns {LoginFormErrors} Object containing validation errors
 *
 * @author Ayyoub El Kouri
 * @date 14/06/2025
 * @lastUpdate 14/06/2025
 */
export const validateLoginForm = (formData: LoginFormData): LoginFormErrors => {
    const errors: LoginFormErrors = {};

    // Validate email
    if (!formData.email.trim()) {
        errors.email = VALIDATION_MESSAGES.email.required;
    } else if (!validateEmail(formData.email)) {
        errors.email = VALIDATION_MESSAGES.email.invalid;
    }

    // Validate password
    if (!formData.password.trim()) {
        errors.password = VALIDATION_MESSAGES.password.required;
    } else if (formData.password.trim().length < 6) {
        errors.password = VALIDATION_MESSAGES.password.minLength;
    }

    return errors;
};

/**
 * @function createLoginPayload
 * @description Create API payload for login request
 *
 * @param {LoginFormData} formData - Form data to convert
 * @returns {LoginApiRequest} API payload object
 *
 * @author Ayyoub El Kouri
 * @date 14/06/2025
 * @lastUpdate 14/06/2025
 */
export const createLoginPayload = (formData: LoginFormData): LoginApiRequest => {
    return {
        email: formData.email.trim(),
        password: formData.password,
    };
};
