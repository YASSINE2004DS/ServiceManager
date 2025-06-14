import { useState, useCallback } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import { FORM_CONTENT, FORM_LABELS } from './ContactForm.constants';
import { validateContactForm, createEmailBody } from './ContactForm.util';
import type { ContactFormProps, ContactFormData, FormErrors } from './ContactForm.types';

/**
 * @hook useContactForm
 * @description Custom hook that contains all logic for the ContactForm component
 *
 * @param {ContactFormProps} props - Props passed to the ContactForm component
 * @returns {Object} All data and functions needed by the ContactForm component
 *
 * @author Ayyoub El Kouri
 * @date 14/06/2025
 * @lastUpdate 14/06/2025
 */
export const useContactForm = (props: ContactFormProps) => {
    // Form state
    const [formData, setFormData] = useState<ContactFormData>({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
    });

    const [errors, setErrors] = useState<FormErrors>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    /**
     * @function handleInputChange
     * @description Handle input changes in the contact form
     */
    const handleInputChange = useCallback(
        (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
            const { name, value } = event.target;

            setFormData((prev) => ({
                ...prev,
                [name]: value,
            }));

            // Clear error for this field when user starts typing
            if (errors[name as keyof FormErrors]) {
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
            const validationErrors = validateContactForm(formData);
            if (Object.keys(validationErrors).length > 0) {
                setErrors(validationErrors);
                return;
            }

            setIsSubmitting(true);
            setErrors({});

            try {
                // Create email body
                const emailBody = createEmailBody(formData);

                // Create mailto link
                const subject = encodeURIComponent(`Contact depuis Safarelec: ${formData.subject}`);
                const body = encodeURIComponent(emailBody);
                const mailtoLink = `mailto:${FORM_CONTENT.targetEmail}?subject=${subject}&body=${body}`;

                // Open email client
                window.location.href = mailtoLink;

                // Show success message
                setIsSuccess(true);

                // Reset form after successful submission
                setTimeout(() => {
                    setFormData({
                        name: '',
                        email: '',
                        phone: '',
                        subject: '',
                        message: '',
                    });
                    setIsSuccess(false);
                }, 3000);
            } catch (error) {
                console.error('Error sending email:', error);
                setErrors({
                    submit: "Une erreur est survenue lors de l'envoi du message. Veuillez réessayer.",
                });
            } finally {
                setIsSubmitting(false);
            }
        },
        [formData],
    );

    return {
        // Form content
        formTitle: FORM_CONTENT.formTitle,
        successMessage: FORM_CONTENT.successMessage,
        submitButtonText: FORM_CONTENT.submitButtonText,
        submittingText: FORM_CONTENT.submittingText,
        formLabels: FORM_LABELS,

        // Form data
        formData,
        errors,
        isSubmitting,
        isSuccess,

        // Actions
        handleInputChange,
        handleSubmit,
    };
};
