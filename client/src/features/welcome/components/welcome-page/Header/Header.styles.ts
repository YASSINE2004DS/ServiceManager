/**
 * @constant HEADER_STYLES
 * @description Styling classes for the Header component using modern dark palette
 */
export const HEADER_STYLES = {
    container:
        'bg-slate-900/95 backdrop-blur-sm shadow-xl sticky top-0 z-50 border-b border-slate-700',
    content: 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8',
    wrapper: 'flex justify-between items-center h-16',
    logo: {
        container: 'flex items-center',
        image: 'h-8 w-auto bg-white p-1 rounded shadow-sm',
        text: 'ml-3 text-xl font-bold text-white',
    },
    nav: {
        desktop: 'hidden md:flex space-x-8',
        link: 'text-slate-300 hover:text-white transition-colors duration-200 font-medium',
    },
    actions: {
        container: 'flex items-center space-x-4',
        loginButton: 'text-white hover:text-blue-400 font-medium transition-colors duration-200',
        registerButton:
            'bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-all duration-200 shadow-lg hover:shadow-xl',
    },
} as const;
