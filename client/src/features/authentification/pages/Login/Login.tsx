import React from 'react';
import { useLogin } from './Login.hook';
import { LOGIN_STYLES } from './Login.styles';
import type { LoginProps } from './Login.types';

// Import atomic components
import LoginHeader from '../../components/login-page/LoginHeader';
import LoginForm from '../../components/login-page/LoginForm';
import LoginFooter from '../../components/login-page/LoginFooter';

/**
 * @component Login
 * @description Login page component for user authentication, decomposed into atomic components
 *
 * @dependencies useLogin hook, LOGIN_STYLES, atomic components
 *
 * @author Ayyoub El Kouri
 * @date 14/06/2025
 * @lastUpdate 14/06/2025
 */
const Login = ({ className }: LoginProps) => {
    const {
        formData,
        errors,
        isSubmitting,
        isSuccess,
        handleInputChange,
        handleSubmit,
        handleRegisterClick,
    } = useLogin({ className });

    return (
        <div className={`${LOGIN_STYLES.container} ${className || ''}`}>
            <div className={LOGIN_STYLES.formWrapper}>
                <LoginHeader />

                <LoginForm
                    formData={formData}
                    errors={errors}
                    isSubmitting={isSubmitting}
                    isSuccess={isSuccess}
                    handleInputChange={handleInputChange}
                    handleSubmit={handleSubmit}
                />

                <LoginFooter handleRegisterClick={handleRegisterClick} />
            </div>
        </div>
    );
};

export default Login;
