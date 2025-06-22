import { useContactInfo } from './ContactInfo.hook';
import { CONTACT_INFO_STYLES } from './ContactInfo.styles';
import type { ContactInfoProps } from './ContactInfo.types';

/**
 * @component ContactInfo
 * @description Contact information component for the Contact page
 *
 * @dependencies useContactInfo hook, ContactInfo.styles
 *
 * @author Ayyoub El Kouri
 * @date 14/06/2025
 * @lastUpdate 14/06/2025
 */
const ContactInfo = (props: ContactInfoProps) => {
    const { title, contactItems } = useContactInfo(props);

    return (
        <div className={CONTACT_INFO_STYLES.card}>
            <h3 className={CONTACT_INFO_STYLES.title}>{title}</h3>

            {contactItems.map((item, index) => (
                <div key={index} className={CONTACT_INFO_STYLES.item}>
                    <div className={CONTACT_INFO_STYLES.icon}>{item.icon}</div>
                    <div className={CONTACT_INFO_STYLES.content}>
                        <h4 className={CONTACT_INFO_STYLES.label}>{item.label}</h4>
                        <p className={CONTACT_INFO_STYLES.value}>{item.value}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ContactInfo;
