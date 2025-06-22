/**
 * @constant ABOUT_CTA_STYLES
 * @description Styling classes for the AboutCTA component using modern dark palette
 */
export const ABOUT_CTA_STYLES = {
    container: 'mb-20',
    ctaCard: 'bg-gradient-to-r from-blue-600 to-purple-600 py-16 rounded-2xl text-center',
    title: 'text-3xl font-bold text-white mb-4',
    description: 'text-xl text-blue-100 mb-8 max-w-2xl mx-auto',
    buttons: 'flex flex-col sm:flex-row gap-4 justify-center',
    primaryButton: 'bg-white text-blue-600 hover:bg-blue-50 px-8 py-4 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105',
    secondaryButton: 'border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 rounded-xl font-semibold transition-all duration-300',
} as const;
