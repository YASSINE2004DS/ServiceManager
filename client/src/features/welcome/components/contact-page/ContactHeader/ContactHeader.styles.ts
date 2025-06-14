/**
 * @constant CONTACT_HEADER_STYLES
 * @description Styling classes for the ContactHeader component using modern dark palette
 */
export const CONTACT_HEADER_STYLES = {
    container: 'bg-gradient-to-r from-blue-900 via-purple-900 to-blue-900 text-white py-16',
    content: 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8',
    backButton:
        'inline-flex items-center text-blue-100 hover:text-white mb-4 transition-colors duration-200 font-medium',
    title: 'text-4xl md:text-5xl font-bold text-white drop-shadow-lg mb-4',
    subtitle: 'text-xl md:text-2xl text-blue-100 font-light max-w-3xl',
} as const;
