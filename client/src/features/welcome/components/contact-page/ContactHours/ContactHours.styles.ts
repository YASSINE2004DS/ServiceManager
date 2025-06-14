/**
 * @constant CONTACT_HOURS_STYLES
 * @description Styling classes for the ContactHours component
 */
export const CONTACT_HOURS_STYLES = {
    card: 'bg-gray-800 rounded-lg shadow-xl border border-gray-700 p-8',
    title: 'text-xl font-bold text-white mb-6',

    list: 'space-y-3',
    item: 'flex justify-between items-center py-2 border-b border-gray-700 last:border-b-0 text-gray-300',
    days: 'font-medium',
    hours: 'text-gray-400',
} as const;
