/**
 * @constant SERVICES_FILTERS_STYLES
 * @description Styling classes for the ServicesFilters component using modern dark palette
 */
export const SERVICES_FILTERS_STYLES = {
    container: 'bg-slate-800 border-b border-slate-700 py-8',
    content: 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8',
    grid: 'flex flex-col sm:flex-row gap-6 items-center justify-between',
    searchContainer: 'flex-1 max-w-md',
    searchInput:
        'w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200',
    categoriesContainer: 'flex gap-3 flex-wrap',
    categoryButton: 'px-6 py-3 rounded-lg text-sm font-medium transition-all duration-200 border',
    categoryActive: 'bg-blue-600 text-white border-blue-600 shadow-lg',
    categoryInactive:
        'bg-slate-700 text-slate-300 border-slate-600 hover:bg-slate-600 hover:text-white hover:border-slate-500',
} as const;
