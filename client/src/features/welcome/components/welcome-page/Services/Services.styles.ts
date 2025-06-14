/**
 * @constant SERVICES_STYLES
 * @description Styling classes for the Services component using modern dark palette
 */
export const SERVICES_STYLES = {
    container: 'py-20 bg-slate-900',
    content: 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8',
    title: 'text-4xl font-bold text-center text-white mb-16',
    grid: 'grid md:grid-cols-2 lg:grid-cols-4 gap-8',
    card: {
        container:
            'bg-slate-800 p-8 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer border border-slate-700 hover:border-blue-500 hover:bg-slate-750 transform hover:scale-105 group',
        icon: 'text-5xl mb-6 text-blue-400 group-hover:text-blue-300 transition-colors duration-300',
        title: 'text-xl font-semibold text-white mb-4 group-hover:text-blue-100 transition-colors duration-300',
        description:
            'text-slate-300 leading-relaxed group-hover:text-slate-200 transition-colors duration-300',
    },
} as const;
