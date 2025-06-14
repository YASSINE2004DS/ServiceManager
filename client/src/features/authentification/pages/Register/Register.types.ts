/**
 * @interface RegisterFormData
 * @description Data structure for register form
 */
export interface RegisterFormData {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

/**
 * @interface RegisterFormErrors
 * @description Error structure for register form validation
 */
export interface RegisterFormErrors {
    firstName?: string;
    lastName?: string;
    email?: string;
    password?: string;
    submit?: string;
}

/**
 * @interface RegisterProps
 * @description Props for Register component
 */
export interface RegisterProps {
    className?: string;
}

/**
 * @interface RegisterApiRequest
 * @description API request structure for register
 */
export interface RegisterApiRequest {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
}

/**
 * @interface RegisterApiResponse
 * @description API response structure for register
 */
export interface RegisterApiResponse {
    success: boolean;
    message: string;
    data?: {
        message: string;
        user: {
            id: number;
            first_name: string;
            last_name: string;
            email: string;
            role: string;
            active: boolean;
        };
    };
}
