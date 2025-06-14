import { useContactHours } from './ContactHours.hook';
import { CONTACT_HOURS_STYLES } from './ContactHours.styles';
import type { ContactHoursProps } from './ContactHours.types';

/**
 * @component ContactHours
 * @description Contact hours component for the Contact page
 *
 * @dependencies useContactHours hook, ContactHours.styles
 *
 * @author Ayyoub El Kouri
 * @date 14/06/2025
 * @lastUpdate 14/06/2025
 */
const ContactHours = (props: ContactHoursProps) => {
    const { title, schedule } = useContactHours(props);

    return (
        <div className={CONTACT_HOURS_STYLES.card}>
            <h3 className={CONTACT_HOURS_STYLES.title}>{title}</h3>
            <div className={CONTACT_HOURS_STYLES.list}>
                {schedule.map((item, index) => (
                    <div key={index} className={CONTACT_HOURS_STYLES.item}>
                        <span className={CONTACT_HOURS_STYLES.days}>{item.days}</span>
                        <span className={CONTACT_HOURS_STYLES.hours}>{item.hours}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ContactHours;
