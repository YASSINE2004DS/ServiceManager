import React, { useState } from 'react';
import './UsersManagement.css'

const UserCard = ({ id, first_name, last_name, email, role, agency, users, setUsers }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedUser, setEditedUser] = useState({
        first_name,
        last_name,
        role,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedUser((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSave = async () => {
        try {
            const { agency, email, ...userToSend } = editedUser;
            const response = await fetch(`http://localhost:8000/api/user/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}` // si tu utilises un token
                },
                body: JSON.stringify(userToSend),
            });
    
            const data = await response.json();
    
            if (!response.ok) {
                alert(data.Error || 'Failed to update user');
                return;
            }
    
            // Mettre à jour l'utilisateur dans le tableau
            const updatedUsers = users.map((user) =>
                user.id === id ? { ...user, ...editedUser } : user
            );
            setUsers(updatedUsers);
            setIsEditing(false);
        } catch (error) {
            console.error('Error while updating user:', error);
            alert('Unexpected error while updating user.');
        }
    };

    const handleCancel = () => {
        setEditedUser({ first_name, last_name, email, role, agency });
        setIsEditing(false);
    };

    const handleDelete = async () => {
        if (!window.confirm('Are you sure you want to delete this user?')) return;
    
        try {
            const response = await fetch(`http://localhost:8000/api/user/${id}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
    
            const data = await response.json();
    
            if (!response.ok) {
                alert(data.Error || 'Failed to delete user');
                return;
            }
    
            // Supprimer localement
            const updatedUsers = users.filter((user) => user.id !== id);
            setUsers(updatedUsers);
        } catch (error) {
            console.error('Error while deleting user:', error);
            alert('Unexpected error while deleting user.');
        }
    };
    

    return (
        <div className="user">
            <div className="user-info">
                <span className="user-id">#{id}</span>
                {isEditing ? (
                    <>
                        <input
                            type="text"
                            name="first_name"
                            value={editedUser.first_name}
                            onChange={handleChange}
                            placeholder="First name"
                        />
                        <input
                            type="text"
                            name="last_name"
                            value={editedUser.last_name}
                            onChange={handleChange}
                            placeholder="Last name"
                        />
                    </>
                ) : (
                    <>
                        <span className="user-name">
                            {`${first_name} ${last_name}`}
                        </span>
                        <span className="user-email">{email}</span>
                    </>
                )}
            </div>

            <div className="user-details">
                {isEditing ? (
                    <>
                        <input
                            type="text"
                            name="role"
                            value={editedUser.role}
                            onChange={handleChange}
                            placeholder="Role"
                        />

                    </>
                ) : (
                    <>
                        <span className="user-role">Role: {role}</span>
                        <span className="user-agency">Agency: {agency}</span>
                    </>
                )}
            </div>

            <div className="user-actions">
                {isEditing ? (
                    <>
                        <button className="save-button" onClick={handleSave}>
                            Save
                        </button>
                        <button className="cancel-button" onClick={handleCancel}>
                            Cancel
                        </button>
                    </>
                ) : (
                    <>
                        <button className="edit-button" onClick={() => setIsEditing(true)}>
                            Edit
                        </button>
                        <button className="delete-button" onClick={handleDelete}>
                            Delete
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};

export default UserCard;