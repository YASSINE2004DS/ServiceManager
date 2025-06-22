/**
 * @interface LoginFormData
 * @description Data structure for login form
 */
export interface LoginFormData {
    email: string;
    password: string;
}

/**
 * @interface LoginFormErrors
 * @description Error structure for login form validation
 */
export interface LoginFormErrors {
    email?: string;
    password?: string;
    submit?: string;
}

/**
 * @interface LoginProps
 * @description Props for Login component
 */
export interface LoginProps {
    className?: string;
}

/**
 * @interface LoginApiRequest
 * @description API request structure for login
 */
export interface LoginApiRequest {
    email: string;
    password: string;
}

/**
 * @interface LoginApiResponse
 * @description API response structure for login
 */
export interface LoginApiResponse {
    success: boolean;
    message: string;
    data?: {
        message: string;
        token: string;
        user: {
            id: number;
            email: string;
            role: string;
            active: boolean;
        };
    };
}
