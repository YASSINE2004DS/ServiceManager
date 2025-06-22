import { useServicesFilters } from './ServicesFilters.hook';
import { SERVICES_FILTERS_STYLES } from './ServicesFilters.styles';
import type { ServicesFiltersProps } from './ServicesFilters.types';

/**
 * @component ServicesFilters
 * @description Filters component for the Services page
 *
 * @dependencies useServicesFilters hook, ServicesFilters.styles
 *
 * @author Ayyoub El Kouri
 * @date 14/06/2025
 * @lastUpdate 14/06/2025
 */
const ServicesFilters = (props: ServicesFiltersProps) => {
    const {
        searchTerm,
        selectedCategory,
        categories,
        categoryCounts,
        searchPlaceholder,
        filterAllLabel,
        onSearchChange,
        onCategoryChange,
    } = useServicesFilters(props);

    return (
        <section className={SERVICES_FILTERS_STYLES.container}>
            <div className={SERVICES_FILTERS_STYLES.content}>
                <div className={SERVICES_FILTERS_STYLES.grid}>
                    {/* Search */}
                    <div className={SERVICES_FILTERS_STYLES.searchContainer}>
                        <input
                            type="text"
                            placeholder={searchPlaceholder}
                            value={searchTerm}
                            onChange={(e) => onSearchChange(e.target.value)}
                            className={SERVICES_FILTERS_STYLES.searchInput}
                        />
                    </div>

                    {/* Category filters */}
                    <div className={SERVICES_FILTERS_STYLES.categoriesContainer}>
                        <button
                            onClick={() => onCategoryChange('all')}
                            className={`${SERVICES_FILTERS_STYLES.categoryButton} ${
                                selectedCategory === 'all'
                                    ? SERVICES_FILTERS_STYLES.categoryActive
                                    : SERVICES_FILTERS_STYLES.categoryInactive
                            }`}
                        >
                            {filterAllLabel} ({categoryCounts.all})
                        </button>
                        {categories.map((category) => (
                            <button
                                key={category.id}
                                onClick={() => onCategoryChange(category.id)}
                                className={`${SERVICES_FILTERS_STYLES.categoryButton} ${
                                    selectedCategory === category.id
                                        ? SERVICES_FILTERS_STYLES.categoryActive
                                        : SERVICES_FILTERS_STYLES.categoryInactive
                                }`}
                            >
                                {category.name} ({categoryCounts[category.id] || 0})
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ServicesFilters;
