/**
 * @constant CONTACT_INFO_STYLES
 * @description Styling classes for the ContactInfo component
 */
export const CONTACT_INFO_STYLES = {
    card: 'bg-gray-800 rounded-lg shadow-xl border border-gray-700 p-8',
    title: 'text-xl font-bold text-white mb-6',

    item: 'flex items-start space-x-4 mb-6 last:mb-0',
    icon: 'text-2xl mt-1',
    content: 'flex-1',
    label: 'text-sm font-medium text-gray-400 mb-1',
    value: 'text-gray-200',
} as const;
