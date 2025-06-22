/**
 * @constant CONTACT_FORM_STYLES
 * @description Styling classes for the ContactForm component
 */
export const CONTACT_FORM_STYLES = {
    container: 'space-y-6',
    card: 'bg-gray-800 rounded-lg shadow-xl border border-gray-700 p-8',
    title: 'text-2xl font-bold text-white mb-6',

    successMessage:
        'bg-green-900/50 border border-green-700 text-green-300 px-4 py-3 rounded-lg mb-6',

    form: 'space-y-6',
    formGroup: 'space-y-2',
    label: 'block text-sm font-medium text-gray-300',
    input: 'w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200',
    textarea:
        'w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-vertical transition-colors duration-200',
    inputError: 'border-red-500 focus:ring-red-500 focus:border-red-500',
    errorText: 'text-sm text-red-400',

    submitButton:
        'w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-colors duration-200',
    submitButtonDisabled: 'opacity-50 cursor-not-allowed hover:bg-blue-600',
} as const;
