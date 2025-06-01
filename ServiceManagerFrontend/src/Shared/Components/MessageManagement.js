
import './MessageManagement.css'
import { FontAwesomeIcon }                           from '@fortawesome/react-fontawesome';
import { faSearch , faCheckCircle, faTimesCircle }   from '@fortawesome/free-solid-svg-icons';


export const ErrorManagement = (id, message, type, onClose)=> {

    const icon = type === 'success' ? 'fas fa-check-circle' : 'fas fa-times-circle'; // Ou utilisez FontAwesomeIcon
    setTimeout(()=>onClose('') , 2000);

    return (
    <div className={`toast-notification toast-${type}`}>
      {/* Si vous utilisez FontAwesomeIcon */}
      <FontAwesomeIcon icon={type === 'success' ? faCheckCircle : faTimesCircle} className="toast-icon" />
      <i className={`${icon} toast-icon`}></i> {/* Alternative simple avec des classes FA */}
      <span className="toast-message">{message}</span>
      <button className="toast-close-btn" onClick={() => onClose(id)}>
        <i className="fas fa-times"></i>
      </button>
    </div>
  );
  
 }