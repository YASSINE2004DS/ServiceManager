import { API_ENDPOINTS } from './Register.constants';
import type { RegisterApiRequest, RegisterApiResponse } from './Register.types';

/**
 * @function registerUser
 * @description Send register request to the API
 *
 * @param {RegisterApiRequest} payload - Register request payload
 * @returns {Promise<RegisterApiResponse>} API response
 *
 * @author Ayyoub El Kouri
 * @date 14/06/2025
 * @lastUpdate 14/06/2025
 */
export const registerUser = async (payload: RegisterApiRequest): Promise<RegisterApiResponse> => {
    try {
        const response = await fetch(API_ENDPOINTS.REGISTER, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.Error || 'Registration failed');
        }

        return {
            success: true,
            message: data.message || 'Registration successful',
            data: data,
        };
    } catch (error) {
        console.error('Register error:', error);

        return {
            success: false,
            message: error instanceof Error ? error.message : 'Network error occurred',
        };
    }
};
