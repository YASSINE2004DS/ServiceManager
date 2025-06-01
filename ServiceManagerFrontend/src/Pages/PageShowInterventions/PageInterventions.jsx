import React, { useEffect, useState }                from 'react';
import { FontAwesomeIcon }                           from '@fortawesome/react-fontawesome';
import { faSearch }                                  from '@fortawesome/free-solid-svg-icons';
import './PageInterventions.css'
import axios                                          from 'axios' ;
import { useNavigate }                                from 'react-router-dom';
import PageHeader                                     from '../PageCommunComponnent/PageHeader'
import PageChargement                                 from '../PageCommunComponnent/PageChargement'
import {ErrorManagement}                              from '../../Shared/Components/MessageManagement'
import {VerifierExpiredToken , UserIdAndRole , token} from '../Authentification/Authentification' // import deux fonctions un pour la verifications
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
 const [page, setPage]                                        = useState(1);
 const [pages, setPages]                                      = useState(0);    
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
    let limit = 6;

    if (window.innerWidth > 700) {
      limit = 9;
    }
    
    try {
      // Requête GET pour récupérer les interventions d'un utilisateur
      const responseInterventions = await axios.get(
        `http://localhost:8000/api/intervention/${user_Id}?page=${page}&limit=${limit}`,
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
          intervention.validate=true ; // modifié le champ qui permet de verifie est ce que l'intervention est envoyée ou non
          await axios.patch(
            `http://localhost:8000/api/intervention/${user_Id}/${id_intervention}`,
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

        // modifié l'intervention modifié dans le tableau des interventions

        //copié de tableau interventions pour faire la modification
        let UpdateIntervention = Interventions.map((inter , index)=>
         inter.intervention_id === id_intervention ? {...inter , validate : true} 
                                                   : inter
        );

        // modifie le tableau par le nouveau tableau modifié
        SetInterventions(UpdateIntervention);

        // initialisé une message de réussie doit apparaitre pendent 2s 
        SetSuccess("Intervention est bien envoyée");

        setTimeout(() => {
          SetSuccess('');
        }, 2000);

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
          SetInterventions(response.data.data);
          setPages(response.data.pages);
         })
      .catch(erreur=>{
          console.log(erreur);
       });

    } catch (error) {

      console.log("erreur");

    }
  }, [page , width]);

  // hooks pour calculé le temps reste de la modification d'intervention (temps < 24) et ainsi pour l'envoie 
  //automatique si le temps dépasse 24h
  useEffect(() => {
    const updateTime = () => {

        const now = new Date(); // la date courrant

        /*parcourir toutes les temps des interventions et l'initialise le temps reste de chaque intervention dans une case correspond a l'index d'intervention dans
        le tableau Time */
        const updatedTimes = Interventions.map((interv , index) => {

       //calculé  le temps d'autorization de modification , le 1000 pour la convertion en ms
        const target = new Date(interv.createdAt).getTime() + 24 * 60 * 60 * 1000;

        //calculer le temps entre  time courrant  et time d'autorization
        const diff = target - now.getTime();
  
         // le temps terminé
        if (diff <= 0) {

          if(Time[index] !== 'Termine')
          // envoie automatique de l'intervention si n'est pas encore envoyée
          EnvoyerIntervention(interv.intervention_id);
          
          //return une indication
          return 'Termine';
        } else {

          //calcule les heures et les minutes
          const hours = Math.floor(diff / (1000 * 60 * 60));
          const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

          //return sous form XXh YYmin
          return `${hours}h ${minutes}min`;
        }
      });
     
       // initialisé le tableau du temps par le tableau retourné par la fonction map
      SetTime(updatedTimes);
    };
  
    updateTime(); //  Appel immédiat au montage sans attendre 1min

    // upadte state time operation to chargement 
    setTimeout(()=>SetLoading(prev => ({...prev , time:false})) , 0); 
    const interval = setInterval(updateTime, 60000); // Ensuite toutes les 60 secondes
  
    return () => clearInterval(interval); // Nettoyage
  }, [Interventions]);
  
// fonction pour la convertion du date 
 const convertirDate = (date_recup)=> {
    const rawDate = date_recup;
     const date = new Date(rawDate);
     const formattedDate = `${String(date.getDate()).padStart(2, '0')}-${String(date.getMonth() + 1).padStart(2, '0')}-${date.getFullYear()}`;

     return formattedDate ;
 }


  return (
  
    <div className='container-intreventions'>

      {/* header */}
        <PageHeader />
        
        {loading.data ? (  
   
          // Page de chargement
          <PageChargement />
         ) :(
          <div className='Container-globale'>
            {Success &&  ErrorManagement(null ,Success , "success" , ()=>{} )}
                        {Interventions.length == 0 && 
               <h2 className='NotExistData'>Aucune intervention trouvée.</h2>
            }
              <div className='Container-search-pagination'>
                  <div className="Container-pages">
                      {[...Array(pages)].map((_, index) => (
                      <button
                           key={index}
                          onClick={() => setPage(index + 1)}
                          style={{backgroundColor:(page == index+ 1) ? '#7c7979 ' : '#a9a1a1' }}
                      >
                                  {index + 1}
                      </button>
                      ))}
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
              </div>

         <div className='Interventions-container'>

             {/* message si l'intervention est bien envoyée */}
        {/* {Success && <p className='MessageSend'>{Success}</p>}  */}

       {Interventions.map((interv , index)=>

            <div key={index} 
                   className='Intervention-container'
                   style={{display : (!search || (String(interv.intervention_id).includes(search) || String(convertirDate(interv.date)).includes(search)) ) ? 'block' : 'none'}}
                    >
            
             {/* section pour le temps et numero d'intervention */}
               <div className='Data-inter'>
                   <div className='Info-time-send'>

                      <h4>{ convertirDate(interv.date)}</h4>

                      <div className='Info-time-send2'>
                      {interv.validate && <h5 style={{color:'green',}}>✅Send</h5>} 
                      {!loading.time && Time[index] !== 'Termine' && <h5>⏳{Time[index]}</h5>}
                      </div>

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

                { !loading.time &&  (Time[index] !== 'Termine') &&  <input 
                  className=" button-update-show"
                  type='button' 
                  value="Modifier"
                  onClick={()=>UpdateInterventionNavigate(interv.intervention_id)}/>
                 }

               
                {!loading.time && !(interv.validate) && (Time[index] !== 'Termine') && (<input 
                  className=" button-envoyer"
                  type='button' 
                  value="Envoyer"
                  onClick={()=>EnvoyerIntervention(interv.intervention_id)}/> )
                }
              </div>
           </div>
          )}
          {/* //  fin de la fonction map
     */}
    </div>  
     </div>)}
          
  </div>
  );
};

export default PageInterventions;
