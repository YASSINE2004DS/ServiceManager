import React from 'react';
import './CompteCard.css';

const CompteCard = ({ first_name, last_name, email, role, onValidate }) => {
  return (
    <div className="compte-card_container">
      <div className="compte-card_info">
        <p><strong>Nom :</strong> {first_name} {last_name}</p>
        <p><strong>Email :</strong> {email}</p>
        <p><strong>Rôle :</strong> {role}</p>
      </div>
      <button className="compte-card_button" onClick={onValidate}>
        Valider
      </button>
    </div>
  );
};

export default CompteCard;
