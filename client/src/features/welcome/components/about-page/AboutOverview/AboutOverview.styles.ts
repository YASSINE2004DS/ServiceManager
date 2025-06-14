/**
 * @constant ABOUT_OVERVIEW_STYLES
 * @description Styling classes for the AboutOverview component using modern dark palette
 */
export const ABOUT_OVERVIEW_STYLES = {
    container: 'mb-20',
    grid: 'grid md:grid-cols-2 gap-12 items-center mb-16',
    textContent: 'space-y-6',
    title: 'text-3xl font-bold text-white mb-6',
    description: 'text-lg text-slate-300 leading-relaxed mb-6',
    stats: 'grid grid-cols-2 gap-6',
    stat: {
        container: 'bg-slate-800 p-6 rounded-xl border border-slate-700 text-center',
        number: 'text-3xl font-bold text-blue-400 mb-2',
        label: 'text-slate-300 text-sm uppercase tracking-wider',
    },
    imageContainer: 'relative',
    image: 'w-full h-96 object-cover rounded-xl shadow-2xl border border-slate-600',
} as const;
