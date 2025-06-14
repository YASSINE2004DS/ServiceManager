import React from 'react';
import { useRegister } from './Register.hook';
import { REGISTER_STYLES } from './Register.styles';
import type { RegisterProps } from './Register.types';

// Import atomic components
import RegisterHeader from '../../components/register-page/RegisterHeader';
import RegisterForm from '../../components/register-page/RegisterForm';
import RegisterFooter from '../../components/register-page/RegisterFooter';

/**
 * @component Register
 * @description Register page component for user registration, decomposed into atomic components
 *
 * @dependencies useRegister hook, REGISTER_STYLES, atomic components
 *
 * @author Ayyoub El Kouri
 * @date 14/06/2025
 * @lastUpdate 14/06/2025
 */
const Register = ({ className }: RegisterProps) => {
    const {
        formData,
        errors,
        isSubmitting,
        isSuccess,
        handleInputChange,
        handleSubmit,
        handleLoginClick,
    } = useRegister({ className });

    return (
        <div className={`${REGISTER_STYLES.container} ${className || ''}`}>
            <div className={REGISTER_STYLES.formWrapper}>
                <RegisterHeader />

                <RegisterForm
                    formData={formData}
                    errors={errors}
                    isSubmitting={isSubmitting}
                    isSuccess={isSuccess}
                    handleInputChange={handleInputChange}
                    handleSubmit={handleSubmit}
                />

                <RegisterFooter handleLoginClick={handleLoginClick} />
            </div>
        </div>
    );
};

export default Register;
