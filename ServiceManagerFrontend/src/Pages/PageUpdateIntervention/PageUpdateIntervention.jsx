import React, { useState , useEffect}                from 'react';
import './PageUpdateIntervention.css';                                                                       // import fichier css
import axios from 'axios' ;
import { useNavigate , useParams }                    from 'react-router-dom';
import PageHeader                                     from '../PageCommunComponnent/PageHeader'     // import page qui contient le header
import PageChargement                                 from '../PageCommunComponnent/PageChargement'
import swal                                           from 'sweetalert2'
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

    const [intreventionSection , SetIntreventionSection]        =  useState(1); // variable pour precise la section  1 ou 2
    const [Erreur , SetErreur]                                  =  useState('');//variable pour les erreur
    const [Success , SetSuccess]                                =  useState('');//variable pour la validatin de creation
    const [IntreventionInformation , SetIntreventionInformation]=  useState({});  //variable pour le stockage des données recu par l'api
    const [Sections , SetSections]                              =  useState([]) ;
    const [loading , SetLoading]                                =  useState(true);// variable qui indique le chargement des données
    const {id_Intervention}                                     =  useParams();   // variable pour recuperer les parametre de l'url
    const {user_Id}                                             =  UserIdAndRole(token) ; //fonction permet de decodé le token et de recuperer le id et le role d'utilisateur
    const navigate                                              =  useNavigate(); // pour le navigation entre les pages

    
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
            SetIntreventionInformation(response.data);
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


    const RecupererSections = async () => {
      try {
        
        const response = await axios.get(
                                          'http://localhost:8000/api/section'
                                        );

        return response ;   

      } catch (error) {

         console.log("Erreur serveur ");
         SetErreur("Erreur serveur ");
      }
    }

   useEffect( () => {

     RecupererSections()
     .then(response=>{
         SetSections(response.data);
     })
     .catch(error => {
         console.log(error);
     });
     console.log("sections bien recuperer");

   } , []);

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
   const UpdateIntervention = async ( event ) => {

     event.preventDefault(); // pour eviter l'envoi de formulaire
     const {createdAt , section , ...infoUpdating} = IntreventionInformation ;
      try {
  
      // requete pour le sauvegarde avec une header pour verifier l'authorization
       const response = await axios.patch(
        `http://localhost:8000/api/intervention/${user_Id}/${id_Intervention}`,
        infoUpdating , 
        {
          headers: {
            authorization: `Bearer ${token}`
          }
        },
      );
      SetErreur('');
      // SetSuccess(response.data.Success);

      // message apparitre pendent 2s seulement
         setTimeout( navigate('/ShowInterventions'), 2000 ) ;

        //navige vers la page ShowIntreventions qui affiche toutes les interventions
        
                                            
     } catch (error) {

      if (error.response && error.response.data && error.response.data.message) {
        SetErreur(error.response.data.message);
        // SetErreur("Verifier le remplissage des champs et la validité des données");
        await setTimeout(()=> SetErreur('') , 3000 ) ;
      
    } else {
        SetErreur("Erreur de connexion au serveur");
        console.log(error);
    }

     }
   }

    const ConfirmUpdateIntervention = (event) => {
      swal.fire({
        title: `Es-tu sûr de modifier l\'intervention ${id_Intervention} ?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: 'darkred',
        cancelButtonColor: 'darkblue',
        confirmButtonText: 'Oui',
        width: '400px' 

      }).then((result) => {
        if (result.isConfirmed) {
          
          UpdateIntervention(event);
          swal.fire({
            title: "Intervention est modifiée",
            icon: "success",
            showConfirmButton:false,
            width: '400px' ,
            timer:1000
          });
        }
      });
    }
   
   // fonction pour la convertion du date sous forme iso vers la forme DD-MM-YYYY
  const convertirDate = (date_recup)=> {
     const rawDate = date_recup;
     const date = new Date(rawDate);
     const formattedDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;

     return String(formattedDate) ;

 }

  return (
    <div className='container-add-intervention'>
       {/* Header */}
       <PageHeader />
  {loading ? (
       <PageChargement />
  ):(
    <div className=" home-container">
        {/* container pour la formulaire et logo */}

      {/* logo entreprise safarelec */}
      {/* <img src={logo} alt="SAFARELEC Logo" className="logo" /> */}
      <h2>Remplir le formulaire d'intervention</h2>

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
                value={convertirDate(IntreventionInformation.date)}
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
            {Sections.map((section , index) =>
              <option key     = {index} 
                      value   = {section.section_id} 
                      selected= {section.section_id == IntreventionInformation.section_id}
              > 

                                  {section.name}
              </option>
            )}

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
                    value={IntreventionInformation.comment}
                    className='Commentaire-text'
                    onChange={(event)=>RetriveDataAndInitializechamp(event)}
          >

          </textarea>
        </div> 

        <div className='button-group'>
        <input 
                  className="btn button-previous-update-intervention"
                  type='button' 
                  value="Precedent"
                  onClick={PreviousSection}/>
        <input 
                  className="btn button-update"
                  type='button' 
                  value="Modifier"
                  onClick={(e)=>ConfirmUpdateIntervention(e)}/>

        </div>

        </div>   )} 
     
       
        </form>
     </div>
     )}

    {/* style depend a numero du section pour precise quelle style doit appliqué */}
     <style jsx>
       {`
     .home-container {
    display         : flex;
    flex-direction  : column;
    align-items     : center;
    justify-content : center;
    padding         : 10px 20px 0px  10px;
    font-family     : 'Segoe UI', sans-serif;
    background      : linear-gradient(to bottom right, #f0f0f0, #ffffff);
    color           : #333;
    text-align      : center;
    width           :  ${(intreventionSection==2) ? 75 : 65 }% ;
    height          :  ${(intreventionSection==2) ? 80 : 70 }% ;  
    border-radius   : 5px;
    box-shadow      : 2px 2px 5px 3px gray;
    position        : absolute;
    margin-top      :  ${(intreventionSection==2) ? 130 : 150 }px ;
    }

     .welcome-section {
    width           : 50% ;
    /* animation    : fadeIn 2s ease-in-out; */
    height          : ${(intreventionSection==2) ? 70 : 60 }%;
    width           : 60% ;
    display         : flex ;
    flex-direction  : column;
    padding         : 5px 0px ;
    gap             : 0px;
    margin          : auto ;
    margin-top      : 20px ;
    margin-bottom   : 0px ;
    font-size       : 25px ;

  }

    .border-right {
    border-bottom   :  2px solid;
    border-right    : 1px solid ;
    padding         : 20px ;

  }

  .border-left {
    border-bottom   :  2px solid;
    border-left     : 1px solid ;
    padding         : 20px ;
  }
  

  @media (max-width: 1500px) {

    .home-container {
    height          :${(intreventionSection==2) ? 600: 500 }px ;
    width           : 80% ;
    display         : flex;
    flex-direction  : column;
    align-items     : center;
    justify-content : center;
    padding         : 10px 20px 0px  10px;
    font-family     : 'Segoe UI', sans-serif;
    background      : linear-gradient(to bottom right, #f0f0f0, #ffffff);
    color           : #333;
    text-align      : center;
    border-radius   : 5px;
    box-shadow      : 2px 2px 5px 3px gray;
    position        : absolute;
    margin-top      : ${(intreventionSection==2) ? 120: 140 }px ;
    background-color: #067200;
       }

  .welcome-section {
        /* animation    : fadeIn 2s ease-in-out; */
    height              : ${(intreventionSection==2) ? 77: 80 }% ;
    width               : 80% ;
    display             : flex ;
    flex-direction      : column;
    padding             : 5px 0px ;
    gap                 : 0px;
    margin              : auto ;
    margin-top          : 0px ;
    margin-bottom       : 0px ;
    
      }
      input , select {
      width             : 90% ;
      margin            : auto ;
      }
      
   .commentaire {
  display               : flex;
  flex-direction        : column;
  align-items           : center;
  width                 : 100%;
  height                : 100%;
  grid-column           : 1 / -1;
  margin-top            : -65px ;
 
}

.Commentaire-text {
  width                 : 90%;
  height                : 90%;
  padding               : 5px;
  font-size             : 14px;
  border-radius         : 3px;
}

    .button-suivant  ,  .button-update , .button-previous-update-intervention {
  color                 : white;
  background-color      : darkblue;
  font-weight           : normal;
  height                : 40px;
  width                 : 120px;
  font-size             : 14px;
  padding               : 0px ;
  margin-bottom         : 10px ;
  }

  .button-update {
  background-color      : red;
  }


  }

    @media (max-width: 1300px) {

    .home-container {
    height          :${(intreventionSection==2) ? 600: 500 }px ;
    width           : 80% ;
    display         : flex;
    flex-direction  : column;
    align-items     : center;
    justify-content : center;
    padding         : 10px 20px 0px  10px;
    font-family     : 'Segoe UI', sans-serif;
    background      : linear-gradient(to bottom right, #f0f0f0, #ffffff);
    color           : #333;
    text-align      : center;
    border-radius   : 5px;
    box-shadow      : 2px 2px 5px 3px gray;
    position        : absolute;
    margin-top      :  100px ;
    background-color: #067200;
       }
    }
  
  @media (max-width: 800px) {

  .home-container {
    height          :${(intreventionSection==2) ? 900: 600 }px ;
    width           : 80% ;
    display         : flex;
    flex-direction  : column;
    align-items     : center;
    justify-content : center;
    padding         : 10px 20px 0px  10px;
    font-family     : 'Segoe UI', sans-serif;
    background      : linear-gradient(to bottom right, #f0f0f0, #ffffff);
    color           : #333;
    text-align      : center;
    border-radius   : 5px;
    box-shadow      : 2px 2px 5px 3px gray;
    position        : absolute;
    margin-top      :  120px ;
    background-color: #067200;
       }

    .welcome-section-intrevention {
  
    width           : 100%;
    height          : 100%;
    display         : flex ;
    flex-direction  : column;
  }

    .welcome-section {
    /* animation    : fadeIn 2s ease-in-out; */
    height          : ${(intreventionSection==2) ? 32 : 36 }% ;
    width           : 80% ;
    display         : flex ;
    flex-direction  : column;
    padding         : 5px 0px ;
    gap             : 0px;
    margin          : auto ;
    margin-top      : 0px ;
    margin-bottom   : 0px ;

  }

   h2 {
  font-size          : 17px;
  margin-bottom      : 10px;
  color              : #005580;
}
  label  {
   font-size          : 14px;
   margin-left        : 5% ;
  }

  input,
  select  {
  padding            : 3px 10px;
  width              : 85% ;
  height             : 30px;
  margin-bottom      : 10px;
  border             : 1px solid #a9a1a1;
  border-radius      : 8px;
  font-size          : 14px;
  outline            : none;
  margin             :  auto ;
}
.border-left {
    border-bottom    : 0px solid;
    border-left      : 1px solid ;
    padding          : 20px ;
  }

     .border-right {
    border-bottom    :  1px solid;
    border-left      : 1px solid ;
    border-right     : 0px ;
    padding          : 20px ;
  }

  .button-group {
    height           :${(intreventionSection==2) ? 6 : 10 }% ;
    column-gap       : 5px ;
    right            : 0px ;
    margin           : 0px 0px ;
  }

  .button-suivant , .button-update , .button-previous-update-intervention {
  color              : white;
  background-color   : darkblue;
  font-weight        : normal;
  height             : 30px;
  width              : 70px;
  font-size          : ${(intreventionSection==2) ? 10 : 12 }px;
  padding            :0px ;
  }

  .button-update {
  background-color   : darkred;
  }

   
  .commentaire {
  display              : flex;
  flex-direction       : column;
  align-items          : center;
  width                : 100%;
  height               : 18%;
  grid-column          : 1 / -1;
  margin-top           : 12px;
}

.Commentaire-text {
  width                : 90%;
  height               : 90%;
  padding              : 5px;
  font-size            : 12px;
  border-radius        : 3px;
}
.Message {
font-size              : 12px ;
}

    }
  
       `}
     </style>
  </div>
  );
};

export default PageIntervention;




 
