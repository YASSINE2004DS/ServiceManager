import { API_ENDPOINTS } from './Login.constants';
import type { LoginApiRequest, LoginApiResponse } from './Login.types';

/**
 * @function loginUser
 * @description Send login request to the API
 *
 * @param {LoginApiRequest} payload - Login request payload
 * @returns {Promise<LoginApiResponse>} API response
 *
 * @author Ayyoub El Kouri
 * @date 14/06/2025
 * @lastUpdate 14/06/2025
 */
export const loginUser = async (payload: LoginApiRequest): Promise<LoginApiResponse> => {
    try {
        const response = await fetch(API_ENDPOINTS.LOGIN, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Login failed');
        }

        return {
            success: true,
            message: data.message || 'Login successful',
            data: data,
        };
    } catch (error) {
        console.error('Login error:', error);

        return {
            success: false,
            message: error instanceof Error ? error.message : 'Network error occurred',
        };
    }
};
