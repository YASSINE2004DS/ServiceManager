import { FontAwesomeIcon }                            from '@fortawesome/react-fontawesome';      // bibliothéque pour les icons
import { faSpinner }                                  from '@fortawesome/free-solid-svg-icons';   // icon spinner
import './PageChargement.css'

const PageChargement =  () => {
     
    return (
        <div className='Chargement'>
            <FontAwesomeIcon 
                    icon={faSpinner}
                    style={{marginTop : '20px' ,}} 
                    spin size="1x" />
             <p>Chargement en cours...</p>
        </div>
    );
}

export default PageChargement ;