/**
 * @constant CONTACT_STYLES
 * @description Tailwind CSS styles for the Contact page with dark mode support
 */
export const CONTACT_STYLES = {
    container: 'min-h-screen bg-slate-900 text-white',
    content: 'max-w-6xl mx-auto px-6 py-12',
    grid: 'grid grid-cols-1 lg:grid-cols-2 gap-12',

    // Left column for form
    formSection: 'space-y-6',

    // Right column for info
    infoSection: 'space-y-6',
} as const;
