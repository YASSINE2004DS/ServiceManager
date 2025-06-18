import { useState, useEffect } from 'react';
import secureStorage from '../../utils/secureStorage';
import { User } from './Header.types';

export const useHeader = () => {
    const [user, setUser] = useState<User | null>(null);
    const [showLogoutMenu, setShowLogoutMenu] = useState(false);

    useEffect(() => {
        const userData = secureStorage.getData<User>('user');
        setUser(userData);
    }, []);

    const handleLogout = () => {
        secureStorage.removeData('user');
        secureStorage.removeData('token');
        setUser(null);
        setShowLogoutMenu(false);
        // Redirect to login or home page
        window.location.href = '/login';
    };

    const toggleLogoutMenu = () => {
        setShowLogoutMenu(!showLogoutMenu);
    };

    const closeLogoutMenu = () => {
        setShowLogoutMenu(false);
    };

    return {
        user,
        showLogoutMenu,
        handleLogout,
        toggleLogoutMenu,
        closeLogoutMenu,
    };
};
