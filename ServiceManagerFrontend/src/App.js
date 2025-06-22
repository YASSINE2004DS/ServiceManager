
import React                                                  from 'react';
import { BrowserRouter as Router, Routes, Route , Navigate }  from 'react-router-dom';
import Acceuil                                                from './Pages/PageAccueil/PageAccueil.jsx';
import PageErreur                                             from './Pages/PageErreur/PageErreur.jsx';
import AuthorizationFailed                                    from './Pages/PageErreur/PageAutorisationFailed.jsx';
import RequireAuthentification                                from './Pages/PageErreur/PageConnexionRequise.jsx';
import SingUp                                                 from './Pages/PageInscription/PageInscription.jsx';
import Login                                                  from './Pages/PageConnextion/PageConnexion.jsx';
import Intervention                                           from './Pages/PageAddIntervention/PageIntervention.jsx';
import Interventions                                          from './Pages/PageShowInterventions/PageInterventions.jsx';
import Intervention_id                                        from './Pages/PageConsulteIntervention/PageConsulteIntervention.jsx';
import UpdateIntervention                                     from './Pages/PageUpdateIntervention/PageUpdateIntervention.jsx';
import PageEmail                                              from './Pages/PageEmail/PageEmail.jsx';
import Admin                                                  from './PagesAdmin/PageAcceuil/PageAdmin.jsx';      
import Graphic                                                from './PagesAdmin/PageStatistiquesService/StatistiquesService.jsx'


    function App() {
      const Authentifier = localStorage.getItem('token'); // recuperer le token d'authentification
      return (
        <Router>
           <Routes>

              <Route path="/"                                       element={ Authentifier ?   < Acceuil                 />      : <Navigate to="/login" /> }   />
              <Route path="/sign_up"                                element={                  < SingUp                  />                                 }   />    
              <Route path="/login"                                  element={                  < Login                   />                                 }   />    
              <Route path="/ShowInterventions"                      element={ Authentifier ?   < Interventions           />      : <Navigate to="/login" /> }   />  
              <Route path="/AddIntervention"                        element={ Authentifier ?   < Intervention            />      : <Navigate to="/login" /> }   /> 
              <Route path="/intervention/:id_Intervention"          element={ Authentifier ?   < Intervention_id         />      : <Navigate to="/login" /> }   />
              <Route path="/UpdateIntervention/:id_Intervention"    element={ Authentifier ?   < UpdateIntervention      />      : <Navigate to="/login" /> }   /> 
              <Route path="/admin/:Page"                            element={ Authentifier ?   < Admin                   />      : <Navigate to="/login" /> }   /> 
              <Route path="/admin/:Page/:idEntreprise"              element={ Authentifier ?   < Admin                   />      : <Navigate to="/login" /> }   />                     
              <Route path="/AuthorizationFailed"                    element={ Authentifier ?   < AuthorizationFailed     />      : <Navigate to="/login" /> }   /> 
              <Route path="/RequiredAuthentification"               element={ Authentifier ?   < RequireAuthentification />      : <Navigate to="/login" /> }   /> 
              <Route path="*"                                       element={                  < PageErreur              />                                 }   /> 
              <Route path="/sendemail"                              element={ Authentifier ?   < PageEmail               />      : <Navigate to="/login" /> }   />
              <Route path="/graphic"                                element={ Authentifier ?   < Graphic                 />      : <Navigate to="/login" /> }   />
           </Routes>
        </Router>
      );
    }



export default App;