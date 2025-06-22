/**
 * @constant HERO_STYLES
 * @description Styling classes for the Hero component using modern dark palette
 */
export const HERO_STYLES = {
    container:
        'relative bg-gradient-to-r from-blue-900 via-purple-900 to-blue-900 text-white py-24 overflow-hidden',
    content: 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10',
    title: 'text-4xl md:text-6xl font-bold mb-6 text-white drop-shadow-lg',
    subtitle: 'text-xl md:text-2xl mb-8 text-blue-100 font-light',
    cta: 'bg-white hover:bg-blue-50 text-blue-900 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 inline-block shadow-2xl hover:shadow-3xl transform hover:scale-105 hover:-translate-y-1',
} as const;
