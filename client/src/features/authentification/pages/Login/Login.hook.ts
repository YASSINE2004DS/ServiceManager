import { useState, useCallback, type ChangeEvent, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import secureStorage from '../../../../shared/secureStorage';
import { loginUser } from './Login.services';
import { validateLoginForm, createLoginPayload } from './Login.utils';
import {
    FORM_CONTENT,
    FORM_LABELS,
    FORM_PLACEHOLDERS,
    VALIDATION_MESSAGES,
} from './Login.constants';
import type { LoginProps, LoginFormData, LoginFormErrors } from './Login.types';

/**
 * @hook useLogin
 * @description Custom hook that contains all logic for the Login component
 *
 * @param {LoginProps} props - Props passed to the Login component
 * @returns {Object} All data and functions needed by the Login component
 *
 * @author Ayyoub El Kouri
 * @date 14/06/2025
 * @lastUpdate 14/06/2025
 */
export const useLogin = (props: LoginProps) => {
    const navigate = useNavigate();

    // Form state
    const [formData, setFormData] = useState<LoginFormData>({
        email: '',
        password: '',
    });

    const [errors, setErrors] = useState<LoginFormErrors>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    /**
     * @function handleInputChange
     * @description Handle input changes in the login form
     */
    const handleInputChange = useCallback(
        (event: ChangeEvent<HTMLInputElement>) => {
            const { name, value } = event.target;

            setFormData((prev) => ({
                ...prev,
                [name]: value,
            }));

            // Clear error for this field when user starts typing
            if (errors[name as keyof LoginFormErrors]) {
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
            const validationErrors = validateLoginForm(formData);
            if (Object.keys(validationErrors).length > 0) {
                setErrors(validationErrors);
                return;
            }

            setIsSubmitting(true);
            setErrors({});

            try {
                // Create API payload
                const payload = createLoginPayload(formData);

                // Send login request
                const response = await loginUser(payload);

                if (response.success && response.data) {
                    setIsSuccess(true);

                    // Store user data using secureStorage
                    const storageSuccess = secureStorage.setData('authToken', response.data.token);
                    if (storageSuccess) {
                        secureStorage.setData('user', response.data.user);
                    } else {
                        console.warn('Failed to store authentication data');
                    }

                    // Handle redirection based on user status and role
                    setTimeout(() => {
                        const user = response.data?.user;
                        if (!user) {
                            console.error('User data is undefined');
                            return;
                        }

                        // Check if user account is active
                        if (!user.active) {
                            navigate('/inactive');
                            return;
                        }

                        // Redirect based on user role
                        if (user.role === 'user') {
                            navigate('/user-dashboard');
                        } else {
                            navigate('/admin-dashboard');
                        }
                    }, 1500);
                } else {
                    setErrors({
                        submit: response.message || VALIDATION_MESSAGES.submit.invalidCredentials,
                    });
                }
            } catch (error) {
                console.error('Login error:', error);
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
     * @function handleRegisterClick
     * @description Navigate to register page
     */
    const handleRegisterClick = useCallback(() => {
        navigate('/register');
    }, [navigate]);

    return {
        // Form content
        formTitle: FORM_CONTENT.title,
        formSubtitle: FORM_CONTENT.subtitle,
        submitButtonText: FORM_CONTENT.submitButton,
        submittingText: FORM_CONTENT.submittingText,
        registerLinkText: FORM_CONTENT.registerLink,
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
        handleRegisterClick,
    };
};
