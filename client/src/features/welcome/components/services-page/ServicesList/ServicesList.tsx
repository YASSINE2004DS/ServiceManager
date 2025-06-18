import { useServicesList } from './ServicesList.hook';
import { SERVICES_LIST_STYLES } from './ServicesList.styles';
import { formatDate, getStatusLabel, getCategoryName } from '../../../pages/Services/Services.util';
import type { ServicesListProps } from './ServicesList.types';

/**
 * @component ServicesList
 * @description List component for displaying services on the Services page
 *
 * @dependencies useServicesList hook, ServicesList.styles, Services.util
 *
 * @author Ayyoub El Kouri
 * @date 14/06/2025
 * @lastUpdate 14/06/2025
 */
const ServicesList = (props: ServicesListProps) => {
    const { services, categories, noServicesMessage } = useServicesList(props);

    return (
        <section className={SERVICES_LIST_STYLES.container}>
            <div className={SERVICES_LIST_STYLES.content}>
                {services.length > 0 ? (
                    <div className={SERVICES_LIST_STYLES.grid}>
                        {services.map((service) => (
                            <div key={service.id} className={SERVICES_LIST_STYLES.card.container}>
                                <div className={SERVICES_LIST_STYLES.card.header}>
                                    <div>
                                        <h3 className={SERVICES_LIST_STYLES.card.title}>
                                            {service.name}
                                        </h3>
                                        <span
                                            className={
                                                SERVICES_LIST_STYLES.card.category[
                                                    categories.find(
                                                        (cat) => cat.id === service.category,
                                                    )
                                                        ?.color as keyof typeof SERVICES_LIST_STYLES.card.category
                                                ] || SERVICES_LIST_STYLES.card.category.blue
                                            }
                                        >
                                            {getCategoryName(service.category, categories)}
                                        </span>
                                    </div>
                                    <span
                                        className={
                                            SERVICES_LIST_STYLES.card.status[
                                                service.status as keyof typeof SERVICES_LIST_STYLES.card.status
                                            ]
                                        }
                                    >
                                        {getStatusLabel(service.status)}
                                    </span>
                                </div>

                                <p className={SERVICES_LIST_STYLES.card.description}>
                                    {service.description}
                                </p>

                                <div className={SERVICES_LIST_STYLES.card.info}>
                                    <div className={SERVICES_LIST_STYLES.card.infoItem}>
                                        <span className={SERVICES_LIST_STYLES.card.infoLabel}>
                                            Dernière mise à jour:
                                        </span>
                                        <span className={SERVICES_LIST_STYLES.card.infoValue}>
                                            {formatDate(service.lastUpdated)}
                                        </span>
                                    </div>
                                    {service.responsibleEmployee && (
                                        <div className={SERVICES_LIST_STYLES.card.infoItem}>
                                            <span className={SERVICES_LIST_STYLES.card.infoLabel}>
                                                Responsable:
                                            </span>
                                            <span className={SERVICES_LIST_STYLES.card.infoValue}>
                                                {service.responsibleEmployee}
                                            </span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    /* Empty State */
                    <div className={SERVICES_LIST_STYLES.empty.container}>
                        <div className={SERVICES_LIST_STYLES.empty.icon}>📋</div>
                        <h3 className={SERVICES_LIST_STYLES.empty.title}>Aucun service trouvé</h3>
                        <p className={SERVICES_LIST_STYLES.empty.message}>{noServicesMessage}</p>
                    </div>
                )}
            </div>
        </section>
    );
};

export default ServicesList;
