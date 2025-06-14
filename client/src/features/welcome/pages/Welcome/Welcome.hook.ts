import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { CONTACT_INFO } from './Welcome.constants';

/**
 * @hook useWelcome
 * @description Custom hook that contains all logic for the Welcome page component
 *
 * @returns {Object} All data and functions needed by the Welcome component
 *
 * @author Ayyoub El Kouri
 * @date 14/06/2025
 * @lastUpdate 14/06/2025
 */
export const useWelcome = () => {
    const navigate = useNavigate();

    /**
     * @function handleLogin
     * @description Navigate to login page when login button is clicked
     */
    const handleLogin = useCallback(() => {
        navigate('/login');
    }, [navigate]);

    /**
     * @function handleRegister
     * @description Navigate to register page when register button is clicked
     */
    const handleRegister = useCallback(() => {
        navigate('/register');
    }, [navigate]);

    /**
     * @function handleNavigation
     * @description Handle navigation to different pages
     *
     * @param {string} href - The URL to navigate to
     */
    const handleNavigation = useCallback(
        (href: string) => {
            if (href.startsWith('http')) {
                // External link
                window.open(href, '_blank', 'noopener,noreferrer');
            } else {
                // Internal navigation
                navigate(href);
            }
        },
        [navigate],
    );

    /**
     * @function handleServiceExplore
     * @description Navigate to services page when CTA button is clicked
     */
    const handleServiceExplore = useCallback(() => {
        navigate('/services');
    }, [navigate]);

    /**
     * @function handleServiceClick
     * @description Handle clicking on a specific service card
     *
     * @param {string} serviceId - The ID of the clicked service
     */
    const handleServiceClick = useCallback(
        (serviceId: string) => {
            navigate(`/services/${serviceId}`);
        },
        [navigate],
    );

    /**
     * @function handleContactClick
     * @description Handle contact information clicks (email, phone)
     *
     * @param {'email' | 'phone'} type - Type of contact action
     */
    const handleContactClick = useCallback((type: 'email' | 'phone') => {
        if (type === 'email') {
            window.location.href = `mailto:${CONTACT_INFO.email}`;
        } else if (type === 'phone') {
            window.location.href = `tel:${CONTACT_INFO.phone}`;
        }
    }, []);

    return {
        // Actions
        handleLogin,
        handleRegister,
        handleNavigation,
        handleServiceExplore,
        handleServiceClick,
        handleContactClick,
    };
};
