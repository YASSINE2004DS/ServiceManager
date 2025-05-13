import React, { useState , useEffect}                from 'react';
import './PageIntervention.css';                                                                       // import fichier css
import axios from 'axios' ;
import { useNavigate }                                from 'react-router-dom';
import PageHeader                                     from '../PageCommunComponnent/PageHeader'     // import page qui contient le header
import {VerifierExpiredToken , UserIdAndRole , token} from '../Authentification/Authentification' // import deux fonctions un pour la verifications
                                                                                                  //de token et l'autre pour decode le token ainsi le 
                                                                                                  //token 

const PageIntervention = () => {

    // hooks pour verifié l'authentification et l'expiration du token
    useEffect(( )=> {
      if(!token || VerifierExpiredToken(token))
        {
            navigate('/RequiredAuthentification');
            return
        }
     } , []);

  const [intreventionSection , SetIntreventionSection]         = useState(1); // variable pour precise la section  1 ou 2
  const {user_Id}                                              =  UserIdAndRole(token) ; //fonction permet de decodé le token et de recuperer le id et le role d'utilisateur
  const [Erreur , SetErreur]                                   = useState('');//variable pour les erreur
  const [Success , SetSuccess]                                 = useState('');//variable pour la validatin de creation
  const navigate                                               = useNavigate() ;
  
  const [IntreventionInformation , SetIntreventionInformation] = useState //variable objet pour sauvegarder les données saisie
  ({
      intervention_id           :''      ,
      date                      : ''     ,
      team                      : ''     ,
      reference                 : ''     ,
      post                      : ''     ,
      maintenance_type          : 'PREVENTIF' ,
      status                    : false  ,
      work_order_number         : ''     ,
      work_autorisation_number  : ''     ,
      planification             : false  ,
      reception                 : false  ,
      start_time                : ''     ,
      end_time                  : ''     ,
      comment                   : ' '    ,
      validate                  : false  ,
      section_id                :  1     ,
      user_id                   :  user_Id 
   });

   // fonction pour passe a la section 2
  const Nextsection = ()=> {

    SetIntreventionSection(intreventionSection + 1);
  }

    // fonction pour revenir a la section 1
  const PreviousSection = ()=> {

    SetIntreventionSection(intreventionSection - 1);
  }

  const RetriveDataAndInitializechamp = (e) => {
    const {name , value} = e.target ;
    SetIntreventionInformation(prev => ({ ...prev, [name]: value }));

  }

   // fonction pour les champ boolean dans la base donnees
   //permettre d'initialise le champ par false ou true correspond a la valeur entré

  const RetriveDataAndInitializechampTypeBool = (e) => {
    const {name , value}=e.target ;
    let valeurBoll = false ;
    if(value==="OUI" || value==="PL")
         valeurBoll=true ;
    
    // modifie le champ correspond dans la variable InterventionInformation
    SetIntreventionInformation(prev => ({ ...prev, [name]: valeurBoll }));
  }

   // fonction pour sauvegarder l'intervention dans la BD
   const RegistreIntervention = async (Type_Validate , event) => {
    event.preventDefault(); // pour eviter l'envoi de formulaire
     try {

      //preciser le type d'evenement envoyer ou enregistrer
      if(Type_Validate==="Envoyer")
        SetIntreventionInformation(prev => ({ ...prev, validate: true }));
        
      // requete pour le sauvegarde avec une header pour verifier l'authorization
       const response = await axios.post(
        'http://localhost:8000/api/intervention',
         IntreventionInformation, // directement l'objet
        {
          headers: {
            authorization: `Bearer ${token}`
          }
        },
      );
      SetErreur('');
      SetSuccess(response.data.Success);

      // message apparitre pendent 2s seulement
        await setTimeout(()=> SetSuccess('') , 3000 ) ;

        //navige vers la page ShowIntreventions qui affiche toutes les interventions
        navigate('/ShowInterventions');
                                            
     } catch (error) {

      if (error.response && error.response.data && error.response.data.message) {
        SetErreur(error.response.data.message);
        // SetErreur("Verifier le remplissage des champs et la validité des données");
        await setTimeout(()=> SetErreur('') , 3000 ) ;
      
    } else {
        SetErreur("Erreur de connexion au serveur");
    }

     }
   }
  return (
    <div className='container-add-intervention'>
       {/* Header */}
       <PageHeader />

      {/* container pour la formulaire et logo */}
    <div className="home-container">

      {/* logo entreprise safarelec */}
      {/* <img src={logo} alt="SAFARELEC Logo" className="logo" /> */}
      <h2>Remplir la formulaire d'intervention</h2>

      {/* message pour gerer les erreur */}
       {Erreur && ( <h3 className='Message erreur'>‼ {Erreur} </h3>   )}
       {Success && (<h3 className='Message success'>‼ {Success} </h3>   )}  

      {/* container pour le header h2 et la formaulaire */}
      {/* <div className="welcome-section"> */}
       
      {/* formulaire pour l'insription */}
      <form 
            className=""
            action="" 
            method="post" 
            onSubmit={()=>{}}> 
     
      {/* section 1 */}
    {(intreventionSection==1 ) ? (  <div  className='welcome-section-intrevention' >
    
         <div 
               className='welcome-section border-left' >

         <label for="intervention_id">
               DI:
          </label>
          <input 
                name="intervention_id" 
                id="intervention_id"
                type="text" 
                placeholder='Entre Intrevention demande number'
                value={IntreventionInformation.intervention_id}
                required
                onChange={(event)=>RetriveDataAndInitializechamp(event)}
          />  
          <label for="work_order_number">
              OT :
          </label>
          <input  
                name='work_order_number'
                id="work_order_number"
                type="text" 
                placeholder='Entre work ordre number'
                value={IntreventionInformation.work_order_number}
                required
                onChange={(event)=>RetriveDataAndInitializechamp(event)}
          />  
          <label for="work_autorisation_number">
               AT :
          </label>
          <input  
                name='work_autorisation_number'
                id="work_autorisation_number"
                type="text" 
                placeholder='Entre work autorization number'
                value={IntreventionInformation.work_autorisation_number}
                required
                onChange={(event)=>RetriveDataAndInitializechamp(event)}
          />  
          </div>  

          <div 
               className='welcome-section border-right' >

          <label for="date_inter">
              Date :
          </label>
          <input 
                name="date" 
                id="date_inter"
                type="date" 
                placeholder='Entre your name'
                value={IntreventionInformation.date}
                required
                onChange={(event)=>RetriveDataAndInitializechamp(event)}
          />

          <label for="start_time">
              Heure de début  :
          </label>
          <input
                name='start_time'  
                id="start_time"
                type="time" 
                placeholder='Entre your last name'
                value={IntreventionInformation.start_time}
                required
                onChange={(event)=>RetriveDataAndInitializechamp(event)}
          />

          <label for="end_time">
              Heure de fin :
          </label>
          <input 
                name='end_time' 
                id="end_time"
                type='time'
                placeholder='Entre your email'
                value={IntreventionInformation.end_time}
                required
                onChange={(event)=>RetriveDataAndInitializechamp(event)}
          />

        </div>
        <div className='button-group'>
          <input 
                  className="btn button-suivant"
                  type='button' 
                  value="Next"
                  onClick={Nextsection}/>
        </div>
        </div>  ) : (

              //  section 2
        <div  className='welcome-section-intrevention' >
         <div 
               className='welcome-section border-left' >

         <label for="team">
               Equipe :
          </label>
          <input 
                name="team" 
                id="team"
                type="text" 
                placeholder='Entre your equipe'
                value={IntreventionInformation.team}
                required
                onChange={(event)=>RetriveDataAndInitializechamp(event)}
                
          />  

           <label for="Status">
              Section :
          </label>
          <select 
                  id="Status"
                  name='status'
                  onChange={(event)=>RetriveDataAndInitializechamp(event)}
          >
            <option value="1"   > SPI </option>
            <option value="1"   selected > SPN </option>
         </select> 

          <label for="reference">
               Repére :
          </label>
          <input 
                name="reference" 
                id="reference"
                type="text" 
                placeholder='Entre Repére'
                value={IntreventionInformation.reference}
                required
                onChange={(event)=>RetriveDataAndInitializechamp(event)}
          />  
          
          <label for="poste">
               Poste :
          </label>
          <input
                name='post' 
                id="poste"
                type="text" 
                placeholder='Entre your poste'
                value={IntreventionInformation.post}
                required
                onChange={(event)=>RetriveDataAndInitializechamp(event)}
          />   

          </div>  

          <div 
               className='welcome-section border-right' >

          <label for="type-maintenance">
              Type de maintenance :
          </label>
          <select 
                   id="type-maintenance"
                   name='maintenance_type'
                   onChange={(event)=>RetriveDataAndInitializechamp(event)}
                   required
          >
            <option selected={(IntreventionInformation.maintenance_type==="CORRECTIF") ? true : false}>  CORRECTIF </option>
            <option selected={(IntreventionInformation.maintenance_type==="PREVENTIF") ? true : false}>  PREVENTIF </option>
         </select>

          <label for="Planification">
              Planification  :
          </label>
          <select 
                  id="Planification"
                  name='planification'
                  onChange={(event)=>RetriveDataAndInitializechampTypeBool(event)}
                  >

            <option selected={ IntreventionInformation.planification}> PL </option>
            <option selected={!IntreventionInformation.planification}> NPL </option>
         </select>

          <label for="Status">
              Status :
          </label>
          <select 
                  id="Status"
                  name='status'
                  onChange={(event)=>RetriveDataAndInitializechampTypeBool(event)}>
            <option selected={ IntreventionInformation.status  }> OUI </option>
            <option selected={ !IntreventionInformation.status }> NON </option>
         </select>

         <label for="Reception">
              Reception :
          </label>
          <select 
                  id="Reception"
                  name='reception' 
                  onChange={(event)=>RetriveDataAndInitializechampTypeBool(event)}       
          >
            <option selected={ IntreventionInformation.reception }> OUI </option>
            <option selected={ !IntreventionInformation.reception}> NON </option>
         </select>

        </div>

        <div className='commentaire'>
         <label for="commentaire"
                className='labelCommentaire'>
             Commentaire:
          </label>
          <textarea 
                    name="comment" 
                    id="commentaire" 
                    placeholder="Entre commentaire for intrevention"   
                    className='Commentaire-text'
                    onChange={(event)=>RetriveDataAndInitializechamp(event)}
          >

          </textarea>
        </div> 

        <div className='button-group'>
        <input 
                  className="btn button-previous"
                  type='button' 
                  value="Precedent"
                  onClick={PreviousSection}/>
        <input 
                  className="btn button-suivant"
                  type='button' 
                  value="Enregistrer"
                  onClick={(e)=>{RegistreIntervention("Registre" , e)}}/>
          <input 
                  className="btn button-envoyer-direct"
                  type='button' 
                  value="Envoyer"
                  onClick={(e)=>{RegistreIntervention("Envoyer"  , e)}}/>
        </div>

        </div>   )} 
     
       
        </form>
     </div>

    {/* style depend a numero du section pour precise quelle style doit appliqué */}
     <style jsx>
       {`
     .home-container {
    display         : flex;
    flex-direction  : column;
    align-items     : center;
    justify-content : center;
    padding         : 40px 20px 0px  20px;
    font-family     : 'Segoe UI', sans-serif;
    background      : linear-gradient(to bottom right, #f0f0f0, #ffffff);
    color           : #333;
    text-align      : center;
    width           :  ${(intreventionSection==2) ? 75 : 65 }% ;
    height          :  ${(intreventionSection==2) ? 80 : 70 }% ;  
    border-radius   : 5px;
    box-shadow      : 2px 2px 5px 3px gray;
    position        : absolute;
    margin-top      :  ${(intreventionSection==2) ? 100 : 120 }px ;
    }

     .welcome-section {
    width           : 50% ;
    /* animation    : fadeIn 2s ease-in-out; */
    height          : ${(intreventionSection==2) ? 70 : 60 }%;
    width           : 60% ;
    display         : flex ;
    flex-direction  : column;
    padding         : 5px 0px ;
    gap: 0px;
    margin     : auto ;
    margin-top: 20px ;
    margin-bottom: 0px ;

  }

    .border-right {
    border-bottom:  2px solid;
    border-right  : 1px solid ;
    padding : 20px ;

  }

  .border-left {
    border-bottom:  2px solid;
    border-left : 1px solid ;
    padding : 20px ;
  }

       `}
     </style>
  </div>
  );
};

export default PageIntervention;




 
