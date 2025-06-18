import { useContact } from './Contact.hook';
import { CONTACT_STYLES } from './Contact.styles';
import type { ContactProps } from './Contact.types';

// Import atomic components
import ContactHeader from '../../components/contact-page/ContactHeader';
import ContactForm from '../../components/contact-page/ContactForm';
import ContactInfo from '../../components/contact-page/ContactInfo';
import ContactHours from '../../components/contact-page/ContactHours';

/**
 * @component Contact
 * @description Contact page component with contact form to send emails, decomposed into atomic components
 *
 * @dependencies useContact hook, Contact.styles, atomic components
 *
 * @author Ayyoub El Kouri
 * @date 14/06/2025
 * @lastUpdate 14/06/2025
 */
const Contact = (props: ContactProps) => {
    const { handleGoBack } = useContact(props);

    return (
        <div className={`${CONTACT_STYLES.container} ${props.className || ''}`}>
            <ContactHeader onGoBack={handleGoBack} />

            <div className={CONTACT_STYLES.content}>
                <div className={CONTACT_STYLES.grid}>
                    {/* Contact Form */}
                    <div className={CONTACT_STYLES.formSection}>
                        <ContactForm />
                    </div>

                    {/* Contact Info */}
                    <div className={CONTACT_STYLES.infoSection}>
                        <ContactInfo />
                        <ContactHours />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
