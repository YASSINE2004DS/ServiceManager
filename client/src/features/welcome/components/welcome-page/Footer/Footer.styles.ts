/**
 * @constant FOOTER_STYLES
 * @description Styling classes for the Footer component using modern dark palette
 */
export const FOOTER_STYLES = {
    container: 'bg-slate-950 text-white py-16 border-t border-slate-800',
    content: 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8',
    grid: 'grid md:grid-cols-3 gap-12',
    section: {
        title: 'text-xl font-semibold mb-6 text-white',
        content: 'space-y-4',
    },
    logo: {
        container: 'flex items-center mb-6',
        image: 'h-10 w-auto bg-white p-2 rounded shadow-sm',
        text: 'ml-4 text-2xl font-bold text-white',
    },
    contact: {
        item: 'flex items-center space-x-3 text-slate-300 hover:text-white transition-colors duration-200 group',
        link: 'hover:text-blue-400 transition-colors duration-200',
    },
    nav: {
        link: 'text-slate-300 hover:text-white transition-colors duration-200 block py-2 hover:translate-x-1 transform transition-transform duration-200',
    },
    bottom: {
        container: 'border-t border-slate-800 mt-12 pt-8 text-center',
        text: 'text-slate-400',
    },
    description: 'text-lg text-slate-300 leading-relaxed mb-6',
} as const;
