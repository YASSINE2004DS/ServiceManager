import React, { useRef, useEffect } from 'react';
import { useHeader } from './Header.hook';
import { HeaderProps } from './Header.types';
import logoSvg from '../../assets/safarelec-logo.png' // Adjust the path as necessary

const Header: React.FC<HeaderProps> = ({ className = '' }) => {
    const { user, showLogoutMenu, handleLogout, toggleLogoutMenu, closeLogoutMenu } = useHeader();
    const menuRef = useRef<HTMLDivElement>(null);

    // Close menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                closeLogoutMenu();
            }
        };

        if (showLogoutMenu) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showLogoutMenu, closeLogoutMenu]);

    return (
        <header
            className={`bg-gradient-to-r from-blue-600 to-blue-700 shadow-lg border-b border-blue-500 ${className}`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo Section */}
                    <div className="flex items-center space-x-3">
                        <div className="relative">
                            <img
                                src={logoSvg}
                                alt="Safarelec Logo"
                                className="h-10 w-10 opacity-90 hover:opacity-100 transition-opacity duration-200"
                            />
                            <div className="absolute inset-0 bg-blue-400 rounded-lg opacity-20 blur-sm"></div>
                        </div>
                        <div>
                            <h1 className="text-xl font-bold text-white tracking-tight">
                                Safarelec
                            </h1>
                            <p className="text-xs text-blue-100 opacity-80">Service Manager</p>
                        </div>
                    </div>

                    {/* User Section */}
                    {user && (
                        <div className="relative" ref={menuRef}>
                            <button
                                onClick={toggleLogoutMenu}
                                className="flex items-center space-x-3 px-4 py-2 rounded-lg bg-blue-500/30 hover:bg-blue-500/50 transition-all duration-200 border border-blue-400/30 hover:border-blue-400/50"
                            >
                                <div className="flex items-center space-x-2">
                                    <div className="w-8 h-8 bg-blue-400 rounded-full flex items-center justify-center">
                                        <span className="text-white text-sm font-medium">
                                            {user.email.charAt(0).toUpperCase()}
                                        </span>
                                    </div>
                                    <span className="text-white font-medium text-sm">
                                        {user.email}
                                    </span>
                                </div>
                                <svg
                                    className={`w-4 h-4 text-blue-200 transition-transform duration-200 ${
                                        showLogoutMenu ? 'rotate-180' : ''
                                    }`}
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M19 9l-7 7-7-7"
                                    />
                                </svg>
                            </button>

                            {/* Logout Menu */}
                            {showLogoutMenu && (
                                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50">
                                    <div className="px-4 py-2 border-b border-gray-100">
                                        <p className="text-sm text-gray-600">
                                            Connecté en tant que
                                        </p>
                                        <p className="text-sm font-medium text-gray-900 truncate">
                                            {user.email}
                                        </p>
                                    </div>
                                    <button
                                        onClick={handleLogout}
                                        className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 hover:text-red-700 transition-colors duration-150 flex items-center space-x-2"
                                    >
                                        <svg
                                            className="w-4 h-4"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                                            />
                                        </svg>
                                        <span>Se déconnecter</span>
                                    </button>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;
