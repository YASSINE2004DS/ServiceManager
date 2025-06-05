import React, { useEffect, useState } from 'react';
import UserCard from './UserCard';
import './UsersManagement.css';

const UsersManagement = () => {
  const [users, setUsers] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    confirm_password: '',
    role: 'user',
    agency_id: '',
  });
  const [error, setError] = useState('');
  const token = localStorage.getItem('token');

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const getAgencyName = async (agencyId) => {
    try {
      const response = await fetch(`http://localhost:8000/api/agency/${agencyId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) throw new Error(`Erreur HTTP: ${response.status}`);
      const data = await response.json();
      return data.name || 'Inconnue';
    } catch (error) {
      console.error('Erreur récupération agence:', error);
      return 'Inconnue';
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/user', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) throw new Error(`Erreur HTTP: ${response.status}`);
      const data = await response.json();

      const formattedUsers = await Promise.all(
        data.map(async (user) => {
          const agencyName = await getAgencyName(user.agency_id);
          return {
            id: user.user_id,
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            role: typeof user.role === 'string' ? user.role.toLowerCase() : 'user',
            agency: agencyName,
            agency_id: user.agency_id,
          };
        })
      );

      setUsers(formattedUsers);
    } catch (error) {
      console.error('Erreur récupération utilisateurs:', error);
    }
  };

  useEffect(() => {
    if (token) fetchUsers();
    else console.error('Aucun token, merci de vous connecter.');
  }, [token]);

  const handleAddUser = async (e) => {
    e.preventDefault();
    setError('');

    if (
      !formData.first_name ||
      !formData.last_name ||
      !formData.email ||
      !formData.password ||
      !formData.confirm_password
    ) {
      setError('Tous les champs sont obligatoires');
      return;
    }

    if (formData.password !== formData.confirm_password) {
      setError('Les mots de passe ne correspondent pas');
      return;
    }

    const { confirm_password, agency_id, ...dataToSend } = formData;

    try {
      const response = await fetch('http://localhost:8000/api/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(dataToSend),
      });

      const result = await response.json();

      if (!response.ok) {
        const message = result.message || result.Error || JSON.stringify(result);
        setError(`Erreur création utilisateur: ${message}`);
        return;
      }

      // 🔁 Recharge tous les utilisateurs après ajout
      await fetchUsers();

      // 🧹 Reset
      setFormData({
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        confirm_password: '',
        role: 'user',
        agency_id: '',
      });
      setShowAddForm(false);
    } catch (error) {
      console.error('Erreur lors de la création utilisateur:', error);
      setError('Une erreur est survenue lors de la création de l\'utilisateur.');
    }
  };

  return (
    <div className="users-management">
      <div className="users-management-header">
        <h2 className="title">Gestion des utilisateurs</h2>
        <button className="users-management-button" onClick={() => setShowAddForm(true)}>
          Ajouter un utilisateur
        </button>
      </div>

      {showAddForm && (
        <form className="add-user-form" onSubmit={handleAddUser}>
          {error && <p className="error-message">{error}</p>}

          <input
            type="text"
            name="first_name"
            placeholder="Prénom"
            value={formData.first_name}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="last_name"
            placeholder="Nom"
            value={formData.last_name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Mot de passe"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="confirm_password"
            placeholder="Confirmer le mot de passe"
            value={formData.confirm_password}
            onChange={handleChange}
            required
          />
          <select name="role" value={formData.role} onChange={handleChange}>
            <option value="user">Utilisateur</option>
            <option value="admin">Admin</option>
          </select>

          <div>
            <button type="submit">Créer</button>
            <button type="button" onClick={() => setShowAddForm(false)}>
              Annuler
            </button>
          </div>
        </form>
      )}

      <div className="users-table">
        {users.map((user) => (
          <UserCard key={user.id} {...user} users={users} setUsers={setUsers} />
        ))}
      </div>
    </div>
  );
};

export default UsersManagement;
