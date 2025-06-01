import React, { useEffect, useState } from 'react';
import UserCard from './UserCard';
import './UsersManagement.css';

const UsersManagement = () => {
    const [users, setUsers] = useState([]);

    const token = localStorage.getItem('token'); // ou sessionStorage, selon ton choix

    // Fonction pour récupérer dynamiquement le nom d'agence
    async function getAgencyName(agencyId) {
        try {
            const response = await fetch(`http://localhost:8000/api/agency/${agencyId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error(`Erreur HTTP: ${response.status}`);
            }

            const data = await response.json();
            return data.name || 'Unknown';
        } catch (error) {
            console.error('Erreur lors de la récupération de l’agence:', error);
            return 'Unknown';
        }
    }

    // Récupérer les utilisateurs et leur agence
    useEffect(() => {
        async function fetchUsers() {
            try {
                const response = await fetch('http://localhost:8000/api/user', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    throw new Error(`Erreur HTTP: ${response.status}`);
                }

                const data = await response.json();

                const formattedUsers = await Promise.all(
                    data.map(async (user) => {
                        const agencyName = await getAgencyName(user.agency_id);
                        return {
                            id: user.user_id,
                            first_name: user.first_name,
                            last_name: user.last_name,
                            email: user.email,
                            role: user.role.toLowerCase(),
                            agency: agencyName,
                        };
                    })
                );

                setUsers(formattedUsers);
            } catch (error) {
                console.error('Erreur lors de la récupération des utilisateurs :', error);
            }
        }

        if (token) {
            fetchUsers();
        } else {
            console.error("Aucun token disponible. L'utilisateur doit se connecter.");
        }
    }, [token]);

    return (
        <div className="users-management">
            <h2 className="title">Users Management</h2>
            <div className="users-table">
                {users.map((user) => (
                    <UserCard
                        key={user.id}
                        {...user}
                        users={users}
                        setUsers={setUsers}
                    />
                ))}
            </div>
        </div>
    );
};

export default UsersManagement;
