import { FORM_CONTENT, FORM_LABELS, FORM_PLACEHOLDERS } from './RegisterForm.constants';
import type { RegisterFormProps } from './RegisterForm.types';

/**
 * @hook useRegisterForm
 * @description Custom hook that contains all logic for the RegisterForm component
 *
 * @param {RegisterFormProps} props - Props passed to the RegisterForm component
 * @returns {Object} All data and functions needed by the RegisterForm component
 *
 * @author Ayyoub El Kouri
 * @date 14/06/2025
 * @lastUpdate 14/06/2025
 */
export const useRegisterForm = (props: RegisterFormProps) => {
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
