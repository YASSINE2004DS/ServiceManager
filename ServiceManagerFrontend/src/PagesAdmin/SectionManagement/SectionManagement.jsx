import { FontAwesomeIcon }                              from '@fortawesome/react-fontawesome';
import { faCheckCircle, faTimesCircle }                 from '@fortawesome/free-solid-svg-icons';
import {VerifierExpiredToken , UserIdAndRole , token}   from '../../Pages/Authentification/Authentification' // import deux fonctions un pour la verifications
import  { useState , useEffect }                        from 'react';
import './SectionManagement.css';
import {ConfirmeOperation}                              from '../../Shared/Components/SweetAlert'
import {  useNavigate  }                                from 'react-router-dom';
import axios                                            from 'axios';

const SectionManagement = () => 
{
       const navigate     =  useNavigate();
        // hooks pour verifié l'authentification et l'expiration du token
        useEffect(( )=> {
          if(!token || VerifierExpiredToken(token))
            {
                navigate('/RequiredAuthentification');
                return ;
            }
          const { role} = UserIdAndRole(token);
    
            if(role !== 'admin')
               navigate('/AuthorizationFailed');
         } , []);

        const [Sections , SetSections]                       = useState([]);
        const [loading , SetLoading]                         = useState(true);
        const [Edit , SetEdit]                               = useState(false);
        const [idSectionEdit , SetIdEdit]                    = useState(null);
        const [WillEditSection , SetWillEditSection]         = useState('');
        const [AcienneNameSection , SetAcienneNameSection]   = useState('');
        const [Error , SetError]                             = useState('');
        const [success , Setsuccess]                         = useState('');

        useEffect(()=>{
            const RecuperSections = async ()=> {
            try {
               const response =  await axios.get(
                'http://localhost:8000/api/section'
               ) ;
               SetSections(response.data);
               SetLoading(false);

               console.log("retreived data successfuly");
                
            } catch (error) {
                console.log(error);
            }  

            }
   
           RecuperSections();
        } , []) ;

        const EditSectionsclick = (NameSection  , IdSection) => {
            SetEdit(true);
            SetIdEdit(IdSection);
            SetWillEditSection(NameSection);
            SetAcienneNameSection(NameSection);
        }

        const AnnulerEditSection = () => {
            SetEdit(false);
            SetIdEdit(null);
            SetWillEditSection('');
            SetAcienneNameSection('');
        }


    // function pour traitement des operations et des erreur avant l'effectuation des operations
    const OperationBackend = async (type_opr , etat=false , id_section=null  , url='http://localhost:8000/api/section') => {
            let response ;
            switch (type_opr) {
                case 'Ajouter':
                  response = await axios.post(`${url}?etat=${etat}`,
                 {
                    name : WillEditSection ,
                 }
                );
                    break;

                case 'Modifier':
                  response =  await axios.patch(`${url}/${idSectionEdit}?etat=${etat}` , 
                {
                    name : WillEditSection ,
                }
               );
                   break ;
                    break;

                case 'Supprimer':
                  response = await axios.delete(`${url}/${id_section}?etat=${etat}`);
                    break;
            
                default:
                    break;
            }

            if(etat)
            {
             switch (type_opr) {
                case 'Ajouter':
                SetSections(prev =>( [...prev , response.data.Section]));
                    break;

                 case 'Modifier':
                const NewtabSection = Sections.map((section )=>
                    section.section_id == idSectionEdit ? response.data.SectionUpdated : section
               );
                SetSections(NewtabSection);
                    break;                   
            
                 case "Supprimer" :
                const NewtabSection_delete = Sections.filter((section , ind)=>
                    section.section_id != id_section
                );
                SetSections(NewtabSection_delete);
                break ;

                default:
                    break;
            } 
                AnnulerEditSection();
                Setsuccess(response.data.Success);
            }
            return response ;
         }


         // handler pour la suppression
        const supprimerSection = async (idsection , section_name) => {
            try {

               await OperationBackend("Supprimer" , false , idsection ) ;
            
                 ConfirmeOperation(`Êtes-vous sûr de vouloir Supprimer la  section ${section_name} ?`,
                                    '' , 
                                    ()=>OperationBackend("Supprimer" ,  true , idsection )    
                                   );   
                console.log("deleted succefuly");

            } catch (error) {

                if(error.response.data.message)
                    SetError(error.response.data.message);
                else
                   console.log(error);
                
            }
                
     }
        

     // handler pour la modification
     const EditSection = async ()  => {
            try {
             if(String(WillEditSection).trim() === '')
               {
                console.log("champ Vide");
                SetError("ne laissez pas le champ vide");
                return ;
               }

               await OperationBackend("Modifier") ;
            
                 ConfirmeOperation(`Êtes-vous sûr de vouloir Modifier la section ${AcienneNameSection} ?`,
                                    '' , 
                                    ()=>OperationBackend("Modifier" , true)    
                                   );   

                console.log("update succefuly");


            } catch (error) {
                if(error.response.data.message)
                    SetError(error.response.data.message);
                else
                   console.log(error);
                
            }
        }


// handler pour ajouter section
        const AjouterSection = async () => {

            try {
                if(String(WillEditSection).trim() === '')
               {
                console.log("champ Vide");
                SetError("ne laissez pas le champ vide")
                return ;
               }
                const response = await OperationBackend("Ajouter") ;

                 ConfirmeOperation(`Êtes-vous sûr de vouloir Ajouter la section ${WillEditSection} ?`,
                                    '' , 
                                    ()=>OperationBackend("Ajouter" , true)     
                                   );             
                console.log("added success ");
                
            } catch (error) {
                if(error.response.data.message)
                    SetError(error.response.data.message);
                else
                   console.log(error);
            }
        }


        // cantainer message 
 const ErrorManagement = (id, message, type, onClose)=> {
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

     return (
           <div className="container">
                            {(Error && ErrorManagement(null , Error, "error" , SetError))  || (success && ErrorManagement(null , success, "success" , Setsuccess ))  }

                <header className="header-section">
                    <h1>Gestion des Sections</h1>
                </header>
                {/* <p className='Mesaage-etat'>dffjkjkgkgg g g;hgkl</p> */}

                <section className="add-section-form">
                    <div className="form-group">
                        <label for="sectionNameInput">Nom de section :</label>
                        <input type="text" 
                               value={WillEditSection} 
                               id="sectionNameInput" 
                              placeholder="Ajouter une nouvelle section"
                              onChange={(e)=>{SetWillEditSection(e.target.value)}}
                              />
                    </div>
                    <div className="actions">
                       {!Edit && <button style={{width:'fit-content'}} className="button primary" onClick={()=>AjouterSection()}>Ajouter</button>} 
                       {Edit && <button className="button secondary" onClick={AnnulerEditSection}>Annuler</button>}
                        {Edit && <button className="button success" onClick={EditSection}>Modifier</button>}
                    </div>
                </section>

                <section className="search-section">
                    <div className="search-bar">
                        <input type="text" placeholder="chercher par Numéro Intervention ou la date."/>
                        <svg style={{height:30 ,}}  className="search-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" classNameName="size-6">
                              <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                         </svg>
                    </div>
                </section>

                <section className="section-list-container">
                    <div className="section-grid">
 
                  {Sections.map((section , index)=>(
                        <div key={index} className="section-card">
                            <span className="section-title">{section.name}</span>
                            <div className="section-actions">
                                <button className="icon-button edit-button" aria-label="Modifier la section" onClick={()=>EditSectionsclick(section.name , section.section_id)}>
                                    <svg style={{height:25 }} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                            <path strokeLinecap="round" 
                                                   strokeLinejoin="round" 
                                                   d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                    </svg>
                                 

                                </button>
                                <button className="icon-button delete-button" aria-label="Supprimer la section" onClick={()=>supprimerSection(section.section_id , section.name)}>
                                     <svg style={{height:25 }} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                            <path strokeLinecap="round" 
                                                  strokeLinejoin="round" 
                                                  d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                      </svg>

                                </button>
                            </div>
                        </div>
                        ))}




                    </div>
                </section>
            </div>

     );
}

   export default SectionManagement ;
















