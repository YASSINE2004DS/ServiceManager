import { useContactForm } from './ContactForm.hook';
import { CONTACT_FORM_STYLES } from './ContactForm.styles';
import type { ContactFormProps } from './ContactForm.types';

/**
 * @component ContactForm
 * @description Contact form component for the Contact page
 *
 * @dependencies useContactForm hook, ContactForm.styles
 *
 * @author Ayyoub El Kouri
 * @date 14/06/2025
 * @lastUpdate 14/06/2025
 */
const ContactForm = (props: ContactFormProps) => {
    const {
        formTitle,
        successMessage,
        submitButtonText,
        submittingText,
        formLabels,
        formData,
        errors,
        isSubmitting,
        isSuccess,
        handleInputChange,
        handleSubmit,
    } = useContactForm(props);

    return (
        <div className={CONTACT_FORM_STYLES.container}>
            <div className={CONTACT_FORM_STYLES.card}>
                <h2 className={CONTACT_FORM_STYLES.title}>{formTitle}</h2>

                {isSuccess && (
                    <div className={CONTACT_FORM_STYLES.successMessage}>{successMessage}</div>
                )}

                <form onSubmit={handleSubmit} className={CONTACT_FORM_STYLES.form}>
                    {/* Name Field */}
                    <div className={CONTACT_FORM_STYLES.formGroup}>
                        <label htmlFor="name" className={CONTACT_FORM_STYLES.label}>
                            {formLabels.name.label}
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            className={`${CONTACT_FORM_STYLES.input} ${
                                errors.name ? CONTACT_FORM_STYLES.inputError : ''
                            }`}
                            placeholder={formLabels.name.placeholder}
                            disabled={isSubmitting}
                        />
                        {errors.name && (
                            <span className={CONTACT_FORM_STYLES.errorText}>{errors.name}</span>
                        )}
                    </div>

                    {/* Email Field */}
                    <div className={CONTACT_FORM_STYLES.formGroup}>
                        <label htmlFor="email" className={CONTACT_FORM_STYLES.label}>
                            {formLabels.email.label}
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className={`${CONTACT_FORM_STYLES.input} ${
                                errors.email ? CONTACT_FORM_STYLES.inputError : ''
                            }`}
                            placeholder={formLabels.email.placeholder}
                            disabled={isSubmitting}
                        />
                        {errors.email && (
                            <span className={CONTACT_FORM_STYLES.errorText}>{errors.email}</span>
                        )}
                    </div>

                    {/* Phone Field */}
                    <div className={CONTACT_FORM_STYLES.formGroup}>
                        <label htmlFor="phone" className={CONTACT_FORM_STYLES.label}>
                            {formLabels.phone.label}
                        </label>
                        <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            className={CONTACT_FORM_STYLES.input}
                            placeholder={formLabels.phone.placeholder}
                            disabled={isSubmitting}
                        />
                    </div>

                    {/* Subject Field */}
                    <div className={CONTACT_FORM_STYLES.formGroup}>
                        <label htmlFor="subject" className={CONTACT_FORM_STYLES.label}>
                            {formLabels.subject.label}
                        </label>
                        <input
                            type="text"
                            id="subject"
                            name="subject"
                            value={formData.subject}
                            onChange={handleInputChange}
                            className={`${CONTACT_FORM_STYLES.input} ${
                                errors.subject ? CONTACT_FORM_STYLES.inputError : ''
                            }`}
                            placeholder={formLabels.subject.placeholder}
                            disabled={isSubmitting}
                        />
                        {errors.subject && (
                            <span className={CONTACT_FORM_STYLES.errorText}>{errors.subject}</span>
                        )}
                    </div>

                    {/* Message Field */}
                    <div className={CONTACT_FORM_STYLES.formGroup}>
                        <label htmlFor="message" className={CONTACT_FORM_STYLES.label}>
                            {formLabels.message.label}
                        </label>
                        <textarea
                            id="message"
                            name="message"
                            value={formData.message}
                            onChange={handleInputChange}
                            rows={6}
                            className={`${CONTACT_FORM_STYLES.textarea} ${
                                errors.message ? CONTACT_FORM_STYLES.inputError : ''
                            }`}
                            placeholder={formLabels.message.placeholder}
                            disabled={isSubmitting}
                        />
                        {errors.message && (
                            <span className={CONTACT_FORM_STYLES.errorText}>{errors.message}</span>
                        )}
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`${CONTACT_FORM_STYLES.submitButton} ${
                            isSubmitting ? CONTACT_FORM_STYLES.submitButtonDisabled : ''
                        }`}
                    >
                        {isSubmitting ? submittingText : submitButtonText}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ContactForm;
