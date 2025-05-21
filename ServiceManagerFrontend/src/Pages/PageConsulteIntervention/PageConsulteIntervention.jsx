import React, { useEffect, useState }                 from 'react';
import './PageConsulteIntervention.css'
import PageHeader                                     from '../PageCommunComponnent/PageHeader'     // import page qui contient le header
import PageChargement                                 from '../PageCommunComponnent/PageChargement' // import page de chargement
import axios                                          from 'axios' ;                  //import axios pour la communication avec le backend
import { useNavigate, useParams }                     from 'react-router-dom';        // Outil pour gerer la navigation et les parametre de l'url
import {VerifierExpiredToken , UserIdAndRole , token} from '../Authentification/Authentification' // import deux fonctions un pour la verifications
                                                                                                  //de token et l'autre pour decode le token ainsi le 
                                                                                                  //token 
// componnet pour la consultation d'intervention
const PageConsulteIntervention = () => {

        // hooks pour verifié l'authentification et l'expiration du token
   useEffect(( )=> {
          if(!token || VerifierExpiredToken(token))
            {
                navigate('/RequiredAuthentification');
                return
            }
    } , []);

const [Intervention , SetIntervention]   =  useState({});  //variable pour le stockage des données recu par l'api
const [loading , SetLoading]             = useState(true);// variable qui indique le chargement des données
const {id_Intervention}                  =  useParams();   // variable pour recuperer les parametre de l'url
const navigate                           =  useNavigate(); // pour le navigation entre les pages
const {user_Id}                          =  UserIdAndRole(token) ; //fonction permet de decodé le token et de recuperer le id et le role d'utilisateur


// hooks pour gerer l'authentification et la ercuperation des donnees a partie de backend a partir d'une api
useEffect(() => {

    const fetchIntervention = async () => {
      try {

        // Envoie d'une requete pour recuperer intervention avec une header contient le token pour verifier l'authorization
        const response = await axios.get(
          `http://localhost:8000/api/intervention/${user_Id}/${id_Intervention}`,
          {
            headers: {
              authorization: `Bearer ${token}`
            }
          }
        );
        
        //Initialiser données recuperer dans la variable Intervention
        SetIntervention(response.data);
        SetLoading(false);
        console.log("Intervention bien récupérée");

      } catch (error) {

        if (error.response && error.response.data && error.response.data.message) {
            //erreur pour les authorizations
          if(error.response.data.message === "Authorization failed")
          {
            console.log("Vous n'avez pas le droit de consulter cette intervention");
            navigate('/AuthorizationFailed' , {replace : true });  // navigé vers une page erreur authorization failed
            return ;
          }else { 
            //pour les autre erreur 
            console.log("ID d'intervention invalide ou inexistant" , error.response.data.message);
            navigate("/erreur");
          
          }
        } else {
            //erreur lié au serveur
          console.log("Erreur serveur", error);
        }
         SetLoading(false);
      }
    };

   fetchIntervention(); // appeler la fonction dessus

  }, [id_Intervention, user_Id, token]);


   // fonction pour la convertion du date sous forme iso vers la forme DD-MM-YYYY
  const convertirDate = (date_recup)=> {
    const rawDate = date_recup;
    const date = new Date(rawDate);
    const formattedDate = `${String(date.getDate()).padStart(2, '0')}-
                            ${String(date.getMonth() + 1).padStart(2, '0')}-
                            ${date.getFullYear()}`;

     return formattedDate ;
 }

  //fonction pour la convertion de time pour apparaitre seulement les heures et les minutes
 const convertirTime = (date_recup)=> {
    const dateTostring = date_recup+"";
     const formatTime = dateTostring.split(':').splice(0,2).join(':');

     return formatTime ;
 }

 return (
         <div className='container-intreventions-consulter'>
     
              {/* header */}
              <PageHeader />

      {loading ? (

            //  page de Chargement
              <PageChargement />
      
       ) : (<div className='Interventions-container-consulter'>
                  <h2>Demande d'Intervention : {Intervention.intervention_id} {(Intervention.validate) && "(SEND)"}  </h2>
                  <div className='AllSection'>
                    {/* section 1 */}
                      <div className='Section'> 
                        {/* //champ1 */}
                         <div className='Champ'>
                            <span>Ordre de Travail (OT) </span>
                            <span>: {Intervention.work_order_number}</span>
                         </div>
                                    {/* //champ2 */}
                         <div  className='Champ'>
                            <span>Autorisation de travail (AT) </span>
                            <span>: {Intervention.work_autorisation_number}</span>
                         </div>
                                    {/* //champ3 */}
                          <div  className='Champ'>
                            <span>Date </span>
                            <span>: {convertirDate(Intervention.date)}</span>
                         </div> 
                                    {/* //champ4 */}
                        <div  className='Champ'>
                            <span>Heure de début </span>
                            <span>: {convertirTime(Intervention.start_time)}</span>
                         </div> 
                                    {/* //champ5 */}
                        <div  className='Champ'>
                            <span>Heure de fin </span>
                            <span>: {convertirTime(Intervention.end_time)}</span>
                         </div>                                                     
                      </div> 

                                          {/* section 2 */}
                        <div className='Section2 Section2ConfigHeight'> 
                        {/* //champ1 */}
                         <div className='Champ champOverflow'>
                            <span >Equipe </span>
                            <span >: {Intervention.team}</span>
                         </div>
                                    {/* //champ2 */}
                         <div  className='Champ' >
                            <span>Section </span>
                            <span>: {Intervention.section.name}</span>
                         </div>
                                    {/* //champ3 */}
                          <div  className='Champ champOverflow'>
                            <span>Repére </span>
                            <span>: {Intervention.reference}</span>
                         </div> 
                                    {/* //champ4 */}
                        <div  className='Champ champOverflow'>
                            <span>Poste </span>
                            <span>: {Intervention.post}</span>
                         </div> 
                                                  
                      </div> 

                      
                                     {/* section 1 */}
                    <div className='Section2 Section2All'> 
                        {/* //champ1 */}
                         <div className='Champ'>
                            <span>Type_maintenance </span>
                            <span>: {Intervention.maintenance_type}</span>
                         </div>
                                    {/* //champ2 */}
                         <div  className='Champ'>
                            <span>Planification </span>
                            <span>: {(Intervention.planification) ? "PL ✅" : "NPL 🔴"}</span>
                         </div>
                                    {/* //champ3 */}
                          <div  className='Champ'>
                            <span>Status </span>
                            <span>:  {(Intervention.status) ? "OUI ✅" : "NON 🔴"}</span>
                         </div> 
                                    {/* //champ4 */}
                        <div  className='Champ'>
                            <span>Reception </span>
                            <span>:  {(Intervention.reception) ? "OUI ✅" : "NON 🔴"}</span>
                         </div> 
                                                  
                      </div> 
                   </div> 
                   <div className='ZoneCommentaire'>
                    <span>Commentaire :</span>
                    <textarea value={Intervention.comment}  disabled ={true}   ></textarea>
                         
                   </div>
             </div>
         )} 

           </div>//fin 
 );
}

export default PageConsulteIntervention ;