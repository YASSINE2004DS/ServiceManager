import type { ChangeEvent, FormEvent } from 'react';
import type { RegisterFormData, RegisterFormErrors } from '../../../pages/Register/Register.types';

/**
 * @interface RegisterFormProps
 * @description Props interface for the RegisterForm component
 */
export interface RegisterFormProps {
    formData: RegisterFormData;
    errors: RegisterFormErrors;
    isSubmitting: boolean;
    isSuccess: boolean;
    handleInputChange: (event: ChangeEvent<HTMLInputElement>) => void;
    handleSubmit: (event: FormEvent<HTMLFormElement>) => void;
}
