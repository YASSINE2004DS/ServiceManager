import { useServicesStats } from './ServicesStats.hook';
import { SERVICES_STATS_STYLES } from './ServicesStats.styles';
import type { ServicesStatsProps } from './ServicesStats.types';

/**
 * @component ServicesStats
 * @description Stats component for the Services page
 *
 * @dependencies useServicesStats hook, ServicesStats.styles
 *
 * @author Ayyoub El Kouri
 * @date 14/06/2025
 * @lastUpdate 14/06/2025
 */
const ServicesStats = (props: ServicesStatsProps) => {
    const { filteredCount, totalServices } = useServicesStats(props);

    return (
        <section className={SERVICES_STATS_STYLES.container}>
            <div className={SERVICES_STATS_STYLES.content}>
                <p className={SERVICES_STATS_STYLES.text}>
                    Affichage de {filteredCount} service{filteredCount !== 1 ? 's' : ''} sur{' '}
                    {totalServices}
                </p>
            </div>
        </section>
    );
};

export default ServicesStats;
