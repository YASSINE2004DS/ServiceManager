import { VALIDATION_MESSAGES } from './Register.constants';
import type { RegisterFormData, RegisterFormErrors, RegisterApiRequest } from './Register.types';

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
 * @function validateRegisterForm
 * @description Validate the entire register form
 *
 * @param {RegisterFormData} formData - Form data to validate
 * @returns {RegisterFormErrors} Object containing validation errors
 *
 * @author Ayyoub El Kouri
 * @date 14/06/2025
 * @lastUpdate 14/06/2025
 */
export const validateRegisterForm = (formData: RegisterFormData): RegisterFormErrors => {
    const errors: RegisterFormErrors = {};

    // Validate first name
    if (!formData.firstName.trim()) {
        errors.firstName = VALIDATION_MESSAGES.firstName.required;
    } else if (formData.firstName.trim().length < 2) {
        errors.firstName = VALIDATION_MESSAGES.firstName.minLength;
    }

    // Validate last name
    if (!formData.lastName.trim()) {
        errors.lastName = VALIDATION_MESSAGES.lastName.required;
    } else if (formData.lastName.trim().length < 2) {
        errors.lastName = VALIDATION_MESSAGES.lastName.minLength;
    }

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
 * @function createRegisterPayload
 * @description Create API payload for register request
 *
 * @param {RegisterFormData} formData - Form data to convert
 * @returns {RegisterApiRequest} API payload object
 *
 * @author Ayyoub El Kouri
 * @date 14/06/2025
 * @lastUpdate 14/06/2025
 */
export const createRegisterPayload = (formData: RegisterFormData): RegisterApiRequest => {
    return {
        first_name: formData.firstName.trim(),
        last_name: formData.lastName.trim(),
        email: formData.email.trim(),
        password: formData.password,
    };
};
