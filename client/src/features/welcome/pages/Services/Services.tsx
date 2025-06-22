import { useServices } from './Services.hook';
import { SERVICES_PAGE_STYLES } from './Services.styles';
import type { ServicesPageProps } from './Services.types';

// Import atomic components
import ServicesHeader from '../../components/services-page/ServicesHeader';
import ServicesFilters from '../../components/services-page/ServicesFilters';
import ServicesStats from '../../components/services-page/ServicesStats';
import ServicesList from '../../components/services-page/ServicesList';

/**
 * @component Services
 * @description Services page component for internal employee use, decomposed into atomic components
 *
 * @dependencies useServices hook, Services.styles, atomic components
 *
 * @author Ayyoub El Kouri
 * @date 14/06/2025
 * @lastUpdate 14/06/2025
 */
const Services = ({ className }: ServicesPageProps) => {
    const {
        services,
        categories,
        selectedCategory,
        searchTerm,
        totalServices,
        filteredCount,
        categoryCounts,
        handleCategoryChange,
        handleSearchChange,
        handleGoBack,
    } = useServices();

    return (
        <div className={`${SERVICES_PAGE_STYLES.container} ${className || ''}`}>
            <ServicesHeader onGoBack={handleGoBack} />

            <ServicesFilters
                searchTerm={searchTerm}
                selectedCategory={selectedCategory}
                categories={categories}
                categoryCounts={categoryCounts}
                onSearchChange={handleSearchChange}
                onCategoryChange={handleCategoryChange}
            />

            <ServicesStats filteredCount={filteredCount} totalServices={totalServices} />

            <ServicesList services={services} categories={categories} />
        </div>
    );
};

export default Services;
