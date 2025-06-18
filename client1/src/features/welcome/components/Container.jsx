import React from 'react';

const Container = ({ children }) => {
    return (
        <main className="relative flex items-center justify-center h-screen bg-gray-950 text-white overflow-hidden">
            {/* Motif SVG en fond */}
            <svg
                className="absolute inset-0 w-full h-full opacity-10 pointer-events-none"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="xMidYMid slice"
            >
                <defs>
                    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                        <path
                            d="M 40 0 L 0 0 0 40"
                            fill="none"
                            stroke="#3b82f6"
                            strokeWidth="0.5"
                        />
                    </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
            <div className="relative z-10 text-center space-y-8 max-w-2xl px-4">
                {children}
            </div>
        </main>
    );
};

export default Container;
