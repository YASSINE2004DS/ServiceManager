/**
 * @constant ABOUT_MISSION_VISION_STYLES
 * @description Styling classes for the AboutMissionVision component using modern dark palette
 */
export const ABOUT_MISSION_VISION_STYLES = {
    container: 'mb-20',
    sectionTitle: 'text-3xl font-bold text-white mb-8 text-center',
    grid: 'grid md:grid-cols-2 gap-8',
    card: {
        container: 'bg-slate-800 p-8 rounded-xl border border-slate-700 hover:border-blue-500 transition-all duration-300',
        title: 'text-2xl font-semibold text-blue-300 mb-4 flex items-center gap-3',
        text: 'text-slate-300 leading-relaxed',
    },
} as const;
