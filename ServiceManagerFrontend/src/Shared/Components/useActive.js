    import { useEffect, useState } from 'react';

    const useActive = () => {
        const [isActive, setIsActive] = useState(null);
        const userId = localStorage.getItem('id');

        useEffect(() => {
            const fetchActiveStatus = async () => {
                if (!userId) return;

                try {
                    const response = await fetch(`http://localhost:8000/api/user/isActive/${userId}`);
                    const data = await response.json();
                    setIsActive(data.active);
                } catch (error) {
                    console.error('Erreur lors de la récupération du statut actif:', error);
                    setIsActive(null);
                }
            };

            fetchActiveStatus();
        }, [userId]);

        return isActive;
    };

    export default useActive;

