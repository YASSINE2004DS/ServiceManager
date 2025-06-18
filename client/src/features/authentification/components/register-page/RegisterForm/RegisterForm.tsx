import { useRegisterForm } from './RegisterForm.hook';
import { REGISTER_FORM_STYLES } from './RegisterForm.styles';
import type { RegisterFormProps } from './RegisterForm.types';

/**
 * @component RegisterForm
 * @description Form component for the Register page
 *
 * @dependencies useRegisterForm hook, RegisterForm.styles
 *
 * @author Ayyoub El Kouri
 * @date 14/06/2025
 * @lastUpdate 14/06/2025
 */
const RegisterForm = (props: RegisterFormProps) => {
    const {
        submitButtonText,
        submittingText,
        successMessage,
        formLabels,
        formPlaceholders,
        formData,
        errors,
        isSubmitting,
        isSuccess,
        handleInputChange,
        handleSubmit,
    } = useRegisterForm(props);

    return (
        <form className={REGISTER_FORM_STYLES.form} onSubmit={handleSubmit}>
            {isSuccess && (
                <div className={REGISTER_FORM_STYLES.successMessage}>{successMessage}</div>
            )}

            {errors.submit && (
                <div className={REGISTER_FORM_STYLES.errorMessage}>{errors.submit}</div>
            )}

            <div className={REGISTER_FORM_STYLES.inputGroup}>
                <div className={REGISTER_FORM_STYLES.inputWrapper}>
                    <label htmlFor="firstName" className={REGISTER_FORM_STYLES.label}>
                        {formLabels.firstName}
                    </label>
                    <input
                        id="firstName"
                        name="firstName"
                        type="text"
                        autoComplete="given-name"
                        required
                        className={`${REGISTER_FORM_STYLES.input} ${
                            errors.firstName ? REGISTER_FORM_STYLES.inputError : ''
                        }`}
                        placeholder={formPlaceholders.firstName}
                        value={formData.firstName}
                        onChange={handleInputChange}
                        disabled={isSubmitting}
                    />
                    {errors.firstName && (
                        <p className={REGISTER_FORM_STYLES.errorMessage}>{errors.firstName}</p>
                    )}
                </div>

                <div className={REGISTER_FORM_STYLES.inputWrapper}>
                    <label htmlFor="lastName" className={REGISTER_FORM_STYLES.label}>
                        {formLabels.lastName}
                    </label>
                    <input
                        id="lastName"
                        name="lastName"
                        type="text"
                        autoComplete="family-name"
                        required
                        className={`${REGISTER_FORM_STYLES.input} ${
                            errors.lastName ? REGISTER_FORM_STYLES.inputError : ''
                        }`}
                        placeholder={formPlaceholders.lastName}
                        value={formData.lastName}
                        onChange={handleInputChange}
                        disabled={isSubmitting}
                    />
                    {errors.lastName && (
                        <p className={REGISTER_FORM_STYLES.errorMessage}>{errors.lastName}</p>
                    )}
                </div>

                <div className={REGISTER_FORM_STYLES.inputWrapper}>
                    <label htmlFor="email" className={REGISTER_FORM_STYLES.label}>
                        {formLabels.email}
                    </label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        className={`${REGISTER_FORM_STYLES.input} ${
                            errors.email ? REGISTER_FORM_STYLES.inputError : ''
                        }`}
                        placeholder={formPlaceholders.email}
                        value={formData.email}
                        onChange={handleInputChange}
                        disabled={isSubmitting}
                    />
                    {errors.email && (
                        <p className={REGISTER_FORM_STYLES.errorMessage}>{errors.email}</p>
                    )}
                </div>

                <div className={REGISTER_FORM_STYLES.inputWrapper}>
                    <label htmlFor="password" className={REGISTER_FORM_STYLES.label}>
                        {formLabels.password}
                    </label>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        autoComplete="new-password"
                        required
                        className={`${REGISTER_FORM_STYLES.input} ${
                            errors.password ? REGISTER_FORM_STYLES.inputError : ''
                        }`}
                        placeholder={formPlaceholders.password}
                        value={formData.password}
                        onChange={handleInputChange}
                        disabled={isSubmitting}
                    />
                    {errors.password && (
                        <p className={REGISTER_FORM_STYLES.errorMessage}>{errors.password}</p>
                    )}
                </div>
            </div>

            <div>
                <button
                    type="submit"
                    disabled={isSubmitting || isSuccess}
                    className={`${REGISTER_FORM_STYLES.submitButton} ${
                        isSubmitting || isSuccess ? REGISTER_FORM_STYLES.submitButtonDisabled : ''
                    }`}
                >
                    {isSubmitting ? submittingText : submitButtonText}
                </button>
            </div>
        </form>
    );
};

export default RegisterForm;
