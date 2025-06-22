import { useContactHeader } from './ContactHeader.hook';
import { CONTACT_HEADER_STYLES } from './ContactHeader.styles';
import type { ContactHeaderProps } from './ContactHeader.types';

/**
 * @component ContactHeader
 * @description Header component for the Contact page
 *
 * @dependencies useContactHeader hook, ContactHeader.styles
 *
 * @author Ayyoub El Kouri
 * @date 14/06/2025
 * @lastUpdate 14/06/2025
 */
const ContactHeader = (props: ContactHeaderProps) => {
    const { pageTitle, pageSubtitle, backButtonText, onGoBack } = useContactHeader(props);

    return (
        <section className={CONTACT_HEADER_STYLES.container}>
            <div className={CONTACT_HEADER_STYLES.content}>
                <button onClick={onGoBack} className={CONTACT_HEADER_STYLES.backButton}>
                    {backButtonText}
                </button>
                <h1 className={CONTACT_HEADER_STYLES.title}>{pageTitle}</h1>
                <p className={CONTACT_HEADER_STYLES.subtitle}>{pageSubtitle}</p>
            </div>
        </section>
    );
};

export default ContactHeader;
