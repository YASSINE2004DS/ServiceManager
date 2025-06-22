
import styles                                         from  './MessageManagement.module.css';
import { FontAwesomeIcon }                           from '@fortawesome/react-fontawesome';
import { faSearch , faCheckCircle, faTimesCircle , faInfoCircle , faExclamationTriangle }   from '@fortawesome/free-solid-svg-icons';


export const ErrorManagement = (id, message, type, onClose)=> {

  let icon ;
  let icon_type ;
     switch (type) {
        case 'success':
           icon_type = faCheckCircle;
            break;
        case 'error':
           icon_type = faTimesCircle;
            break;
        case 'warning':
            icon_type = faExclamationTriangle;
            break;
        case 'info':
            icon_type = faInfoCircle;
            break;

        default:
           icon_type = faSearch;
            break;
      }
    setTimeout(()=>onClose('') , 3000);

    return (

<div className={`${styles['toast-notification']} ${styles[`toast-${type}`]}`}>
  {/* Si vous utilisez FontAwesomeIcon */}
  <FontAwesomeIcon icon={icon_type} className={styles['toast-icon']} />

  {/* Alternative simple avec des classes FA */}
  <i className={`${icon} ${styles['toast-icon']}`}></i>

  <span className={styles['toast-message']}>{message}</span>

  <button className={styles['toast-close-btn']} onClick={() => onClose(id)}>
    <i className="fas fa-times"></i>
  </button>
</div>
  );
  
 }