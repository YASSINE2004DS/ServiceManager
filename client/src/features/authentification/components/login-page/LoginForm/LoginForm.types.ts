import type { ChangeEvent, FormEvent } from 'react';
import type { LoginFormData, LoginFormErrors } from '../../../pages/Login/Login.types';

/**
 * @interface LoginFormProps
 * @description Props interface for the LoginForm component
 */
export interface LoginFormProps {
    formData: LoginFormData;
    errors: LoginFormErrors;
    isSubmitting: boolean;
    isSuccess: boolean;
    handleInputChange: (event: ChangeEvent<HTMLInputElement>) => void;
    handleSubmit: (event: FormEvent<HTMLFormElement>) => void;
}
