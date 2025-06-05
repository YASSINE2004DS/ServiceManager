import React, { useEffect, useState } from 'react';
import CompteCard from './CompteCard';
import './ComptesNonActive.css';

const ComptesNonActive = () => {
  const [comptesNonActives, setComptesNonActives] = useState([]);
  const [loading, setLoading] = useState(true);

  // Supposons que le token est déjà dans localStorage (ex: lors de la connexion)
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) {
      setLoading(false);
      return;
    }

    fetch('http://localhost:8000/api/user/inactive', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Erreur lors du chargement des comptes');
        }
        return response.json();
      })
      .then(data => {
        setComptesNonActives(data);
        console.log(data);
        setLoading(false);
      })
      .catch(error => {
        console.error(error);
        setLoading(false);
      });
  }, [token]);

  const handleValidate = (id) => {
    if (!token) {
      console.error('Aucun token trouvé, merci de vous connecter.');
      return;
    }

    fetch(`http://localhost:8000/api/user/active/${id}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Échec de l’activation');
        }
        setComptesNonActives(prev => prev.filter(compte => compte.user_id !== id));
      })
      .catch(error => {
        console.error(`Erreur lors de l'activation du compte ${id} :`, error);
      });
  };

  return (
    <div className="comptes-non-active_container">
      <h1 className="comptes-non-active_title">Comptes Non Actifs</h1>
      <div className="comptes-non-active_content">
        {loading ? (
          <p>Chargement...</p>
        ) : comptesNonActives.length === 0 ? (
          <p>Aucun compte non actif.</p>
        ) : (
          comptesNonActives.map((compte) => {
            return (
                <CompteCard
                  key={compte.id}
                  {...compte}
                  onValidate={() => handleValidate(compte.user_id)}
                />
              )
          } )
        )}
      </div>
    </div>
  );
};

export default ComptesNonActive;
