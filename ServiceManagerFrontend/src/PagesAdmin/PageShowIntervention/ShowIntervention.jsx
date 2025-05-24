import React, { useEffect, useState }                from 'react';
import { FontAwesomeIcon }                           from '@fortawesome/react-fontawesome';
import { faSearch }                                  from '@fortawesome/free-solid-svg-icons';
import '../../Pages/PageShowInterventions/PageInterventions.css'
import './ShowIntervention.css'
import axios                                          from 'axios' ;
import {ConfirmeOperation}                              from '../../Shared/Components/SweetAlert'
import { faTrash }                                    from '@fortawesome/free-solid-svg-icons';
import { useNavigate }                                from 'react-router-dom';
import PageChargement                                 from '../../Pages/PageCommunComponnent/PageChargement'
import {VerifierExpiredToken , UserIdAndRole , token} from '../../Pages/Authentification/Authentification' // import deux fonctions un pour la verifications
                                                                                                  //de token et l'autre pour decode le token ainsi le 
                                                                                                  //token 
const PageInterventions = () => {

    // hooks pour verifié l'authentification et l'expiration du token
    useEffect(( )=> {
      if(!token || VerifierExpiredToken(token))
        {
            navigate('/RequiredAuthentification');
            return ;
        }
     } , []);

  const [Time , SetTime]                                      = useState([]); // tableau pour sauvegerder le time restant pour la modification
  const [Success , SetSuccess]                                = useState('');
  const [loading , SetLoading]                                = useState({    // variable qui indique le chargement des données
                                                                  data : true ,
                                                                  time : true 
                                                                });
 const [InterventionToday, SetInterventionToday]              = useState(false);   
 const [width, setWidth]                                      = useState(6);
 const [search , SetSearch]                                   = useState('');                                                        
  const navigate                                              = useNavigate() ;
  const [Interventions , SetInterventions]                    = useState([]);
  const {user_Id}                                             = UserIdAndRole(token) ; //fonction permet de decodé le token et de recuperer le id et le role d'utilisateur


  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    // Ajouter l'écouteur
    window.addEventListener('resize', handleResize);

    // Nettoyer l'écouteur à la destruction du composant
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // fonction pour recuperer tout les intreventions de l'uitilisateur courant
  const RecupererInterventions =async ()=>{
    // let limit = 6;

    // if (window.innerWidth > 700) {
    //   limit = 9;
    // }
    
    try {
      // Requête GET pour récupérer les interventions d'un utilisateur
      const responseInterventions = await axios.get(
        `http://localhost:8000/api/intervention?Intervention_today=${InterventionToday}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

        // indique que les données et chargé
        SetLoading(prev => ({...prev , data:false})) ;
      return responseInterventions ;

     }catch(erreur){

      console.log(erreur);
     }
  }

  const deleteAll = async () => {
    try {
         
       const response =   await axios.delete(`http://localhost:8000/api/intervention/${user_Id}` ,{
            headers : {
                Authorization : `Bearer ${token}`
            }
        }
         );
         SetInterventions([]);
        //  SetSuccess(response.data.Success);
        //  setTimeout(()=> SetSuccess('') , 2000);
    }catch(error)
    {
        if(error.response.data.message)
           console.log(error.response.data.message);
        else
        console.log(error);
    }
  }

   const deleteInterventionById = async (id_intervention) =>{
    try {
        
         const response =  await axios.delete(
                 `http://localhost:8000/api/intervention/${user_Id}/${id_intervention}`,
                 {
                    headers : {
                        Authorization : `Bearer ${token}`
                    }
                 }
         ) ;
         const NewTableIntervention = Interventions.filter((inter , index) => ( inter.intervention_id != id_intervention ));

         SetInterventions(NewTableIntervention);

        //  SetSuccess(response.data.Success);
        //  setTimeout(()=> SetSuccess('') , 2000);

    } catch (error) {

         if(error.response.data.message)
           console.log(error.response.data.message);
        else
        console.log(error);       
    }
   }
  // handler permet de consulter les informations d'une intervention a travers le click sur le button voir plus
  const ConsulterInterventionNavigate= (interventionId) => {
 
    //redirection ver la page /intervention/id_intervention
    navigate(`/intervention/${interventionId}`);
  }

    // handler permet de consulter les informations d'une intervention a travers le click sur le button voir plus
  const UpdateInterventionNavigate= (interventionId) => {
 
      //redirection ver la page /intervention/id_intervention
      navigate(`/UpdateIntervention/${interventionId}`);
    }

 //hooks pour recuperer les interventions est l'initialis' dans une variable tableau
  useEffect( ()=> {
    try {

      RecupererInterventions()
      .then(response=>{
          SetInterventions(response.data);
         })
      .catch(erreur=>{
          console.log(erreur);
       });

    } catch (error) {

      console.log("erreur");

    }
  }, [InterventionToday , width]);
  
// fonction pour la convertion du date 
 const convertirDate = (date_recup)=> {
    const rawDate = date_recup;
     const date = new Date(rawDate);
     const formattedDate = `${String(date.getDate()).padStart(2, '0')}-${String(date.getMonth() + 1).padStart(2, '0')}-${date.getFullYear()}`;

     return formattedDate ;
 }


  return (
          <div className='Container-globale-show-admin'>
            
              <div className='Container-search-pagination'>
                  <div className="Container-pages">
                      <button
                          className='paginate-btn'
                          onClick={() => SetInterventionToday(true)}
                          style={{backgroundColor:  InterventionToday ? '#a9a1a1 ' : 'lightgray' }}
                      >
                            pour Aujourd'hui
                      </button>

                     <button
                          className='paginate-btn'
                          onClick={() => SetInterventionToday(false)}
                          style={{backgroundColor: !InterventionToday ? '#a9a1a1 ' : 'lightgray' }}
                      >
                                 Tous
                      </button>
              
                  </div>
                  <div className='Container-search'>
                  <input
                             type='search'
                             name='search'
                             placeholder='chercher par Numero intervention ou la date'
                             onChange={(e)=> SetSearch(e.target.value)}
                      />
                      <FontAwesomeIcon 
                                     icon={faSearch} 
                                     className='icon-search'
                                     />
                  </div>

                { Interventions.length > 0 && 
                  <button className="delete-btn" 
                         onClick={()=>
                                 ConfirmeOperation(`Êtes-vous sûr de vouloir supprimer toutes les interventions ?`,
                                                    'Les interventions ont été supprimées.' , 
                                                    deleteAll     
                                                   )
                         }
                  
                  >
                            <FontAwesomeIcon 
                                     icon={faTrash} 
                                     className='icon-search'
                            />
                                Supprimer Tous
                 </button>
                } 
              </div>

         <div className='Interventions-container'>
            {Interventions.length == 0 && 
               <h2 className='NotExistData'>Aucune intervention trouvée.</h2>
            }

             {/* message si l'intervention est bien envoyée */}
        {Success && <p className='MessageSend' >{Success}</p>} 

       {Interventions.map((interv , index)=>

            <div key={index} 
                   className='Intervention-container'
                   style={{display : (!search || (String(interv.intervention_id).includes(search) || String(convertirDate(interv.date)).includes(String(search).trim() )) ||
                    String(interv.intervention_id)===String(search).trim() ) ? 'block' : 'none'}}
                    >
            
             {/* section pour le temps et numero d'intervention */}
               <div className='Data-inter'>
                   <div className='Info-time-send'>

                      <h4>{ convertirDate(interv.date)}</h4>

                    </div>

                    <h3 className='DI-number'>DI-N° {interv.intervention_id}</h3>
               </div>

                 {/* section pour quelque info sur l'interventions */}
              <div className='Data-inter Addstyle'>

                <div className='Info-time-send Addstyle1'>
                    <p className='p1'><span className='Type_Attribut'> <span>Status </span> <span>:</span> </span> <span>{(interv.status)?"OUI" : "NON"}</span> </p>
                    <p className='p2'><span className='Type_Attribut'> <span>Section</span> <span>:</span> </span> <span className='Span2'>{interv.section.name}</span>                             </p>
                </div>

                <div className='Info-time-send Addstyle2'>
                     <p className='p1'><span className='Type_Attribut'> <span>Reception</span> <span>:</span> </span> <span >{(interv.reception)?"OUI" : "NON"}</span> </p>
                     <p className='p2'><span className='Type_Attribut'> <span className='Type_M_Abr'>Type_M</span> <span className='Type_M'>Type_Maintenance </span> <span>:</span>   </span>  <span className='Span2'>{interv.maintenance_type}</span> </p>
                </div>
                 

              </div>


                      {/* section des buttons pour gerer l'intervention */}
              <div className='button-group-inter'>
                  <input 
                  className=" button-consulter"
                  type='button' 
                  value="Voir plus"
                  onClick={()=>ConsulterInterventionNavigate(interv.intervention_id)}/>

                  <input 
                  className=" button-update-show"
                  type='button' 
                  value="Modifier"
                  onClick={()=>UpdateInterventionNavigate(interv.intervention_id)}
                 />
                 
                 <input 
                  className=" button-supprimer"
                  type='button' 
                  value="Supprimer"
                  onClick={()=>
                                 ConfirmeOperation(`Es-tu sûr de Supprimer l\'intervention ${interv.intervention_id}`,
                                                    'Intervention est supprimé' , 
                                                    deleteInterventionById      , 
                                                    interv.intervention_id   )
                          }
                  /> 
                
              </div>
           </div>
          )}
          {/* //  fin de la fonction map
     */}
    </div>  
     </div>
  );

};

export default PageInterventions;
