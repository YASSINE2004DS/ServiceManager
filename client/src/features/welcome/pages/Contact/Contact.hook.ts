import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import type { ContactProps } from './Contact.types';

/**
 * @hook useContact
 * @description Custom hook that contains all logic for the Contact page component
 *
 * @param {ContactProps} props - Props passed to the Contact component
 * @returns {Object} All data and functions needed by the Contact component
 *
 * @author Ayyoub El Kouri
 * @date 14/06/2025
 * @lastUpdate 14/06/2025
 */
export const useContact = (props: ContactProps) => {
    const navigate = useNavigate();

    /**
     * @function handleGoBack
     * @description Navigate back to home page
     */
    const handleGoBack = useCallback(() => {
        navigate('/');
    }, [navigate]);

    return {
        // Actions
        handleGoBack,
    };
};
