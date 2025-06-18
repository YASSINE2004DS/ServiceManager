/**
 * @constant ABOUT_HISTORY_STYLES
 * @description Styling classes for the AboutHistory component using modern dark palette
 */
export const ABOUT_HISTORY_STYLES = {
    container: 'mb-20',
    sectionTitle: 'text-3xl font-bold text-white mb-8 text-center',
    sectionSubtitle: 'text-xl text-slate-300 mb-12 text-center max-w-4xl mx-auto leading-relaxed',
    timeline: 'relative',
    timelineItem: {
        container: 'flex items-start mb-12 relative',
        dot: 'w-4 h-4 bg-blue-500 rounded-full mt-2 mr-6 flex-shrink-0 relative z-10',
        line: 'absolute left-2 top-6 w-0.5 h-full bg-slate-700',
        content: 'flex-1',
        year: 'text-blue-400 font-bold text-lg mb-2',
        title: 'text-xl font-semibold text-white mb-2',
        description: 'text-slate-300 leading-relaxed',
    },
} as const;
