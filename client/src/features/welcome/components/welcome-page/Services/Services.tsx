import { useServices } from './Services.hook';
import { SERVICES_STYLES } from './Services.styles';
import type { ServicesProps } from './Services.types';

/**
 * @component Services
 * @description Services section component for the Welcome page
 *
 * @dependencies useServices hook, Services.styles
 *
 * @author Ayyoub El Kouri
 * @date 14/06/2025
 * @lastUpdate 14/06/2025
 */
const Services = (props: ServicesProps) => {
    const { services, onServiceClick } = useServices(props);

    return (
        <section className={SERVICES_STYLES.container}>
            <div className={SERVICES_STYLES.content}>
                <h2 className={SERVICES_STYLES.title}>Nos Services</h2>
                <div className={SERVICES_STYLES.grid}>
                    {services.map((service) => (
                        <div
                            key={service.id}
                            className={SERVICES_STYLES.card.container}
                            onClick={() => onServiceClick(service.id)}
                            role="button"
                            tabIndex={0}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' || e.key === ' ') {
                                    onServiceClick(service.id);
                                }
                            }}
                        >
                            <div className={SERVICES_STYLES.card.icon}>{service.icon}</div>
                            <h3 className={SERVICES_STYLES.card.title}>{service.title}</h3>
                            <p className={SERVICES_STYLES.card.description}>
                                {service.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Services;
