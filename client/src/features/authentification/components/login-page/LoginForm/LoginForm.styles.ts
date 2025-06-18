/**
 * @constant LOGIN_FORM_STYLES
 * @description Styling classes for the LoginForm component
 */
export const LOGIN_FORM_STYLES = {
    form: 'space-y-6',
    inputGroup: 'space-y-4',
    inputWrapper: 'space-y-1',
    label: 'block text-sm font-medium text-slate-300',
    input: 'appearance-none relative block w-full px-4 py-3 border border-slate-600 placeholder-slate-400 text-white bg-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm transition-colors duration-200',
    inputError:
        'border-red-500 text-red-100 placeholder-red-300 focus:ring-red-500 focus:border-red-500',
    errorMessage: 'mt-1 text-sm text-red-400',
    submitButton:
        'group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 focus:ring-offset-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200',
    submitButtonDisabled: 'opacity-50 cursor-not-allowed hover:bg-blue-600',
    successMessage:
        'text-center text-sm text-green-400 mb-4 bg-green-900/30 border border-green-500/30 py-2 px-4 rounded-lg',
} as const;
