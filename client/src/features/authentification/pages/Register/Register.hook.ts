import { useState, useCallback, type ChangeEvent, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from './Register.services';
import { validateRegisterForm, createRegisterPayload } from './Register.utils';
import {
    FORM_CONTENT,
    FORM_LABELS,
    FORM_PLACEHOLDERS,
    VALIDATION_MESSAGES,
} from './Register.constants';
import type { RegisterProps, RegisterFormData, RegisterFormErrors } from './Register.types';

/**
 * @hook useRegister
 * @description Custom hook that contains all logic for the Register component
 *
 * @param {RegisterProps} props - Props passed to the Register component
 * @returns {Object} All data and functions needed by the Register component
 *
 * @author Ayyoub El Kouri
 * @date 14/06/2025
 * @lastUpdate 14/06/2025
 */
export const useRegister = (props: RegisterProps) => {
    const navigate = useNavigate();

    // Form state
    const [formData, setFormData] = useState<RegisterFormData>({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
    });

    const [errors, setErrors] = useState<RegisterFormErrors>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    /**
     * @function handleInputChange
     * @description Handle input changes in the register form
     */
    const handleInputChange = useCallback(
        (event: ChangeEvent<HTMLInputElement>) => {
            const { name, value } = event.target;

            setFormData((prev) => ({
                ...prev,
                [name]: value,
            }));

            // Clear error for this field when user starts typing
            if (errors[name as keyof RegisterFormErrors]) {
                setErrors((prev) => ({
                    ...prev,
                    [name]: undefined,
                }));
            }
        },
        [errors],
    );

    /**
     * @function handleSubmit
     * @description Handle form submission
     */
    const handleSubmit = useCallback(
        async (event: FormEvent<HTMLFormElement>) => {
            event.preventDefault();

            // Validate form
            const validationErrors = validateRegisterForm(formData);
            if (Object.keys(validationErrors).length > 0) {
                setErrors(validationErrors);
                return;
            }

            setIsSubmitting(true);
            setErrors({});

            try {
                // Create API payload
                const payload = createRegisterPayload(formData);

                // Send register request
                const response = await registerUser(payload);

                if (response.success) {
                    setIsSuccess(true);

                    // Redirect to login page after successful registration
                    setTimeout(() => {
                        navigate('/login');
                    }, 1500);
                } else {
                    setErrors({
                        submit: response.message || VALIDATION_MESSAGES.submit.serverError,
                    });
                }
            } catch (error) {
                console.error('Register error:', error);
                setErrors({
                    submit: VALIDATION_MESSAGES.submit.networkError,
                });
            } finally {
                setIsSubmitting(false);
            }
        },
        [formData, navigate],
    );

    /**
     * @function handleLoginClick
     * @description Navigate to login page
     */
    const handleLoginClick = useCallback(() => {
        navigate('/login');
    }, [navigate]);

    return {
        // Form content
        formTitle: FORM_CONTENT.title,
        formSubtitle: FORM_CONTENT.subtitle,
        submitButtonText: FORM_CONTENT.submitButton,
        submittingText: FORM_CONTENT.submittingText,
        loginLinkText: FORM_CONTENT.loginLink,
        successMessage: FORM_CONTENT.successMessage,
        formLabels: FORM_LABELS,
        formPlaceholders: FORM_PLACEHOLDERS,

        // Form data
        formData,
        errors,
        isSubmitting,
        isSuccess,

        // Actions
        handleInputChange,
        handleSubmit,
        handleLoginClick,
    };
};
