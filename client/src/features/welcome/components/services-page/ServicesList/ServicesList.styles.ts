/**
 * @constant SERVICES_LIST_STYLES
 * @description Styling classes for the ServicesList component using modern dark palette
 */
export const SERVICES_LIST_STYLES = {
    container: 'py-16 bg-slate-900',
    content: 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8',
    grid: 'grid gap-8 md:grid-cols-2 lg:grid-cols-3',
    card: {
        container:
            'bg-slate-800 border border-slate-700 rounded-xl p-6 hover:border-blue-500 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/10 group',
        header: 'flex items-start justify-between mb-4',
        title: 'text-xl font-semibold text-white mb-3 group-hover:text-blue-300 transition-colors duration-300',
        description: 'text-slate-300 text-sm mb-6 leading-relaxed',
        info: 'space-y-3',
        infoItem: 'flex justify-between text-sm',
        infoLabel: 'text-slate-400',
        infoValue: 'text-slate-200 font-medium',
        status: {
            active: 'inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-green-900/30 text-green-400 border border-green-500/30',
            inactive:
                'inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-red-900/30 text-red-400 border border-red-500/30',
            maintenance:
                'inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-orange-900/30 text-orange-400 border border-orange-500/30',
        },
        category: {
            blue: 'inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-blue-900/30 text-blue-400 border border-blue-500/30',
            green: 'inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-green-900/30 text-green-400 border border-green-500/30',
            purple: 'inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-purple-900/30 text-purple-400 border border-purple-500/30',
            yellow: 'inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-yellow-900/30 text-yellow-400 border border-yellow-500/30',
        },
    },
    empty: {
        container: 'text-center py-16',
        icon: 'text-6xl text-slate-600 mb-4',
        title: 'text-2xl font-semibold text-white mb-2',
        message: 'text-slate-400 max-w-md mx-auto',
    },
} as const;
