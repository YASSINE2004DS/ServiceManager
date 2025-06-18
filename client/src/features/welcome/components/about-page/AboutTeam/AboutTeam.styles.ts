/**
 * @constant ABOUT_TEAM_STYLES
 * @description Styling classes for the AboutTeam component using modern dark palette
 */
export const ABOUT_TEAM_STYLES = {
    container: 'mb-20',
    sectionTitle: 'text-3xl font-bold text-white mb-8 text-center',
    sectionSubtitle: 'text-xl text-slate-300 mb-12 text-center max-w-4xl mx-auto leading-relaxed',
    grid: 'grid md:grid-cols-2 lg:grid-cols-4 gap-8',
    card: {
        container: 'bg-slate-800 p-6 rounded-xl border border-slate-700 hover:border-green-500 transition-all duration-300 hover:shadow-xl hover:shadow-green-500/10 group text-center',
        imageContainer: 'relative mb-4',
        image: 'w-24 h-24 rounded-full mx-auto object-cover border-4 border-slate-600 group-hover:border-green-500 transition-colors duration-300',
        imagePlaceholder: 'w-24 h-24 rounded-full mx-auto bg-slate-700 flex items-center justify-center text-3xl text-slate-400 border-4 border-slate-600 group-hover:border-green-500 transition-colors duration-300',
        name: 'text-lg font-semibold text-white mb-1 group-hover:text-green-300 transition-colors duration-300',
        position: 'text-green-400 font-medium mb-2',
        experience: 'text-slate-300 text-sm mb-1',
        specialization: 'text-slate-400 text-sm',
    },
} as const;
