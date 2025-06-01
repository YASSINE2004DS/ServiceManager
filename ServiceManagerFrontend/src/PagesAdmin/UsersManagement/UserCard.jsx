import React, { useState } from 'react';
import './UsersManagement.css'

const UserCard = ({ id, first_name, last_name, email, role, agency, users, setUsers }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedUser, setEditedUser] = useState({
        first_name,
        last_name,
        email,
        role,
        agency,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedUser((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSave = () => {
        const updatedUsers = users.map((user) =>
            user.id === id ? { ...user, ...editedUser } : user
        );
        setUsers(updatedUsers);
        setIsEditing(false);
    };

    const handleCancel = () => {
        setEditedUser({ first_name, last_name, email, role, agency });
        setIsEditing(false);
    };

    const handleDelete = () => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            const updatedUsers = users.filter((user) => user.id !== id);
            setUsers(updatedUsers);
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
                        <input
                            type="email"
                            name="email"
                            value={editedUser.email}
                            onChange={handleChange}
                            placeholder="Email"
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
                        <input
                            type="text"
                            name="agency"
                            value={editedUser.agency}
                            onChange={handleChange}
                            placeholder="Agency"
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