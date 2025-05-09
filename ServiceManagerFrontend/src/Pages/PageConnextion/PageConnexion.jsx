
import logo from '../PageAccueil/Assets/safarelec-logo.png'; // remplace avec ton logo réel
import './PageConnexion.css' ;  // import fichier css
const PageConnexion = () => {
  return (
    <div className='container'>

      {/* container pour la formulaire et logo */}
    <div className="home-container-connexion">

      {/* logo entreprise safarelec */}
      <img src={logo} alt="SAFARELEC Logo" className="logo" />

      {/* container pour le header h2 et la formaulaire */}     
      {/* formulaire pour la connexion */}
      <form 
            className="welcome-section-form"
            action="" 
            method="post" 
            onSubmit={()=>{}}>
         
         <h2>Log in to Service</h2>

          <label for="email">
              Email :
          </label>
          <input  
                className="Input-Form"         
                id="email"
                type="email" 
                placeholder='Entre your email'
          />

          <label for="psd">
               Password :
          </label>
          <input
                className="Input-Form" 
                id="psd"
                type="password" 
                placeholder='Entre password'
          />
     
          <button className="button">Sign In</button>
        </form>
     </div>
  </div>
  );
};

export default PageConnexion;
