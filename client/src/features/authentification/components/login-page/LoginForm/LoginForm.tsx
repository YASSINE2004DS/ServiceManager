import { useLoginForm } from './LoginForm.hook';
import { LOGIN_FORM_STYLES } from './LoginForm.styles';
import type { LoginFormProps } from './LoginForm.types';

/**
 * @component LoginForm
 * @description Form component for the Login page
 *
 * @dependencies useLoginForm hook, LoginForm.styles
 *
 * @author Ayyoub El Kouri
 * @date 14/06/2025
 * @lastUpdate 14/06/2025
 */
const LoginForm = (props: LoginFormProps) => {
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
    } = useLoginForm(props);

    return (
        <form className={LOGIN_FORM_STYLES.form} onSubmit={handleSubmit}>
            {isSuccess && <div className={LOGIN_FORM_STYLES.successMessage}>{successMessage}</div>}

            {errors.submit && <div className={LOGIN_FORM_STYLES.errorMessage}>{errors.submit}</div>}

            <div className={LOGIN_FORM_STYLES.inputGroup}>
                <div className={LOGIN_FORM_STYLES.inputWrapper}>
                    <label htmlFor="email" className={LOGIN_FORM_STYLES.label}>
                        {formLabels.email}
                    </label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        className={`${LOGIN_FORM_STYLES.input} ${
                            errors.email ? LOGIN_FORM_STYLES.inputError : ''
                        }`}
                        placeholder={formPlaceholders.email}
                        value={formData.email}
                        onChange={handleInputChange}
                        disabled={isSubmitting}
                    />
                    {errors.email && (
                        <p className={LOGIN_FORM_STYLES.errorMessage}>{errors.email}</p>
                    )}
                </div>

                <div className={LOGIN_FORM_STYLES.inputWrapper}>
                    <label htmlFor="password" className={LOGIN_FORM_STYLES.label}>
                        {formLabels.password}
                    </label>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        autoComplete="current-password"
                        required
                        className={`${LOGIN_FORM_STYLES.input} ${
                            errors.password ? LOGIN_FORM_STYLES.inputError : ''
                        }`}
                        placeholder={formPlaceholders.password}
                        value={formData.password}
                        onChange={handleInputChange}
                        disabled={isSubmitting}
                    />
                    {errors.password && (
                        <p className={LOGIN_FORM_STYLES.errorMessage}>{errors.password}</p>
                    )}
                </div>
            </div>

            <div>
                <button
                    type="submit"
                    disabled={isSubmitting || isSuccess}
                    className={`${LOGIN_FORM_STYLES.submitButton} ${
                        isSubmitting || isSuccess ? LOGIN_FORM_STYLES.submitButtonDisabled : ''
                    }`}
                >
                    {isSubmitting ? submittingText : submitButtonText}
                </button>
            </div>
        </form>
    );
};

export default LoginForm;
