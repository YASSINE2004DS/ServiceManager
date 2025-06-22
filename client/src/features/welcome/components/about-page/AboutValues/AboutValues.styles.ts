/**
 * @constant ABOUT_VALUES_STYLES
 * @description Styling classes for the AboutValues component using modern dark palette
 */
export const ABOUT_VALUES_STYLES = {
    container: 'mb-20',
    sectionTitle: 'text-3xl font-bold text-white mb-8 text-center',
    sectionSubtitle: 'text-xl text-slate-300 mb-12 text-center max-w-4xl mx-auto leading-relaxed',
    grid: 'grid md:grid-cols-2 lg:grid-cols-3 gap-8',
    card: {
        container: 'bg-slate-800 p-6 rounded-xl border border-slate-700 hover:border-purple-500 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/10 group',
        icon: 'text-4xl mb-4 group-hover:scale-110 transition-transform duration-300',
        title: 'text-xl font-semibold text-white mb-3 group-hover:text-purple-300 transition-colors duration-300',
        description: 'text-slate-300 leading-relaxed',
    },
} as const;
