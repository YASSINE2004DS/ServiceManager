/**
 * @constant COMPANY_INFO_STYLES
 * @description Styling classes for the CompanyInfo component using modern dark palette
 */
export const COMPANY_INFO_STYLES = {
    container: 'py-20 bg-slate-800',
    content: 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8',
    grid: 'grid md:grid-cols-2 gap-12 items-center',
    textContent: 'space-y-8',
    title: 'text-4xl font-bold text-white mb-6',
    description: 'text-lg text-slate-300 leading-relaxed',
    mission: {
        container:
            'bg-blue-900/30 border border-blue-500/30 p-6 rounded-xl backdrop-blur-sm shadow-lg',
        title: 'text-xl font-semibold text-blue-300 mb-3 flex items-center gap-2',
        text: 'text-slate-200 leading-relaxed',
    },
    vision: {
        container:
            'bg-purple-900/30 border border-purple-500/30 p-6 rounded-xl backdrop-blur-sm shadow-lg',
        title: 'text-xl font-semibold text-purple-300 mb-3 flex items-center gap-2',
        text: 'text-slate-200 leading-relaxed',
    },
    imageContainer: 'relative',
    image: 'w-full h-96 object-cover rounded-xl shadow-2xl border border-slate-600',
} as const;
