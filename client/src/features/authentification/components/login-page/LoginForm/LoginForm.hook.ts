import { FORM_CONTENT, FORM_LABELS, FORM_PLACEHOLDERS } from './LoginForm.constants';
import type { LoginFormProps } from './LoginForm.types';

/**
 * @hook useLoginForm
 * @description Custom hook that contains all logic for the LoginForm component
 *
 * @param {LoginFormProps} props - Props passed to the LoginForm component
 * @returns {Object} All data and functions needed by the LoginForm component
 *
 * @author Ayyoub El Kouri
 * @date 14/06/2025
 * @lastUpdate 14/06/2025
 */
export const useLoginForm = (props: LoginFormProps) => {
    const { formData, errors, isSubmitting, isSuccess, handleInputChange, handleSubmit } = props;

    return {
        // Form content
        ...FORM_CONTENT,
        formLabels: FORM_LABELS,
        formPlaceholders: FORM_PLACEHOLDERS,

        // Form data and handlers
        formData,
        errors,
        isSubmitting,
        isSuccess,
        handleInputChange,
        handleSubmit,
    };
};
