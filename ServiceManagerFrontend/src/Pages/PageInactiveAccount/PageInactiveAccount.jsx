import './PageInactiveAccount.css';
import { MailCheck } from 'lucide-react';

function PageInactiveAccount() {
  return (
    <div className="inactive-container">
      <div className="inactive-card">
        <MailCheck size={48} color="#007bff" />
        <h1>Compte non activé</h1>
        <p>
          Votre compte a bien été créé, mais il n’est pas encore activé.  
          Un lien d’activation sera envoyé à votre adresse email après.
        </p>
      </div>
    </div>
  );
}

export default PageInactiveAccount;
