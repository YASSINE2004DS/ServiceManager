import { useServicesHeader } from './ServicesHeader.hook';
import { SERVICES_HEADER_STYLES } from './ServicesHeader.styles';
import type { ServicesHeaderProps } from './ServicesHeader.types';

/**
 * @component ServicesHeader
 * @description Header component for the Services page
 *
 * @dependencies useServicesHeader hook, ServicesHeader.styles
 *
 * @author Ayyoub El Kouri
 * @date 14/06/2025
 * @lastUpdate 14/06/2025
 */
const ServicesHeader = (props: ServicesHeaderProps) => {
    const { title, subtitle, onGoBack } = useServicesHeader(props);

    return (
        <section className={SERVICES_HEADER_STYLES.container}>
            <div className={SERVICES_HEADER_STYLES.content}>
                <button onClick={onGoBack} className={SERVICES_HEADER_STYLES.backButton}>
                    ← Retour à l'accueil
                </button>
                <h1 className={SERVICES_HEADER_STYLES.title}>{title}</h1>
                <p className={SERVICES_HEADER_STYLES.subtitle}>{subtitle}</p>
            </div>
        </section>
    );
};

export default ServicesHeader;
