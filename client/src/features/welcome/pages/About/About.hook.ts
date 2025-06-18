import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { PAGE_CONTENT } from './About.constants';

/**
 * @hook useAbout
 * @description Custom hook that contains all logic for the About page component
 *
 * @returns {Object} All data and functions needed by the About component
 *
 * @author Ayyoub El Kouri
 * @date 14/06/2025
 * @lastUpdate 14/06/2025
 */
export const useAbout = () => {
    const navigate = useNavigate();

    /**
     * @function handleGoBack
     * @description Navigate back to home page
     */
    const handleGoBack = useCallback(() => {
        navigate('/');
    }, [navigate]);

    /**
     * @function handleContactClick
     * @description Navigate to contact page
     */
    const handleContactClick = useCallback(() => {
        navigate('/contact');
    }, [navigate]);

    /**
     * @function handleServicesClick
     * @description Navigate to services page
     */
    const handleServicesClick = useCallback(() => {
        navigate('/services');
    }, [navigate]);

    return {
        // Data
        companyName: PAGE_CONTENT.companyName,

        // Actions
        handleGoBack,
        handleContactClick,
        handleServicesClick,
    };
};
