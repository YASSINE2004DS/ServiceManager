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

    const navigate            = useNavigate() ;

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

  const [Success , SetSuccess]                                = useState('');
  const [loading , SetLoading]                                = useState({    // variable qui indique le chargement des données
                                                                  data : true ,
                                                                  time : true 
                                                                });
 const [InterventionToday, SetInterventionToday]              = useState(false);   
 const [search , SetSearch]                                   = useState('');                                                        
  const [Interventions , SetInterventions]                    = useState([]);
  const [InterventionsNotValidate , SetInterventionsNotValidate] = useState([]);
  const {user_Id}                                             = UserIdAndRole(token) ; //fonction permet de decodé le token et de recuperer le id et le role d'utilisateur


  // handler permettre d'envoyer l'intervention => changement sur le champ validate
  const EnvoyerIntervention = async (id_intervention) => {
    try {

          //recuperer l'intervention pour verifier est ce que n'est pas déje envoyée
          const response = await axios.get(
              `http://localhost:8000/api/intervention/${user_Id}/${id_intervention}`,
            {
              headers: {
                authorization: `Bearer ${token}`
              }
            },     
         );
        const intervention = response.data ;

         // si l'intervention n'est pas envoyée
        if(!intervention.validate)
      {
          await axios.patch(
            `http://localhost:8000/api/intervention/${user_Id}/${id_intervention}?etat=true`,
            {
                 validate:true 
            } ,
            {
                headers: {
                    authorization: `Bearer ${token}`
                }
            },   
          ) ;

        console.log("success send Intrevention");

    }
    } catch (error)
    {
      // les cas des errurs envoyé au niveau de backend
      if(error.response && error.response.data && error.response.data.message)
      {
        console.log(error.response.data.message);
      }else {

        console.log("erreur send intervention" , error);
      }
      
    }
  }

    //  pour l'envoie automatique si le temps dépasse 24h
    useEffect(() => {
    //   const updateTime =async  () => {

    // try {
    //   // Requête GET pour récupérer les interventions d'un utilisateur
    //   const responseInterventions = await axios.get(
    //     `http://localhost:8000/api/intervention?Intervention_today=${false}&validate=0`,
    //     {
    //       headers: {
    //         Authorization: `Bearer ${token}`
    //       }
    //     }
    //   )
    //   .then(response=>{
    //       SetInterventionsNotValidate(response.data);
    //      })
    //   .catch(erreur=>{
    //       console.log(erreur);
    //    });

    //  }catch(erreur){

    //   console.log(erreur);
    //   return ;
    //  }
    //     const now = new Date(); // la date courrant

    //       /*parcourir toutes les temps des interventions et l'initialise le temps reste de chaque intervention dans une case correspond a l'index d'intervention dans
    //       le tableau Time */
    //       const updatedTimes = InterventionsNotValidate.map(async (interv) =>  {
  
    //      //calculé  le temps d'autorization de modification , le 1000 pour la convertion en ms
    //       const target = new Date(interv.createdAt).getTime() + 24 * 60 * 60 * 1000;
  
    //       //calculer le temps entre  time courrant  et time d'autorization
    //       const diff = target - now.getTime();
    
    //        // le temps terminé
    //       if (diff <= 0) {

    //         await EnvoyerIntervention(interv.intervention_id);
            
            
    //         //return une indication
    //         return 'Termine';
    //       }

    //     });
       
    //   };
     
    //   updateTime(); //  Appel immédiat au montage sans attendre 1min
  
    }, []);

  // fonction pour recuperer tout les intreventions de l'uitilisateur courant
  const RecupererInterventions =async ()=>{
        
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

    const updateTime =async  () => {

    try {
      // Requête GET pour récupérer les interventions d'un utilisateur
      const responseInterventions = await axios.get(
        `http://localhost:8000/api/intervention?Intervention_today=${false}&validate=0`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      .then(response=>{
          SetInterventionsNotValidate(response.data);
         })
      .catch(erreur=>{
          console.log(erreur);
       });

     }catch(erreur){

      console.log(erreur);
      return ;
     }
        const now = new Date(); // la date courrant

          /*parcourir toutes les temps des interventions et l'initialise le temps reste de chaque intervention dans une case correspond a l'index d'intervention dans
          le tableau Time */
          const updatedTimes = InterventionsNotValidate.map(async (interv) =>  {
  
         //calculé  le temps d'autorization de modification , le 1000 pour la convertion en ms
          const target = new Date(interv.createdAt).getTime() + 24 * 60 * 60 * 1000;
  
          //calculer le temps entre  time courrant  et time d'autorization
          const diff = target - now.getTime();
    
           // le temps terminé
          if (diff <= 0) {

            await EnvoyerIntervention(interv.intervention_id);
            
            
            //return une indication
            return 'Termine';
          }

        });
       
      };
     
      updateTime(); //  Appel immédiat au montage sans attendre 1min

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
  }, [InterventionToday]);
  
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
