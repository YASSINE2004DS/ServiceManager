import React from 'react';
import './PageInscription.css';      // import fichier css
import logo from '../PageAccueil/Assets/safarelec-logo.png'; // remplace avec ton logo réel

const PageInscription = () => {
  return (
    <div className='container'>

      {/* container pour la formulaire et logo */}
    <div className="home-container">

      {/* logo entreprise safarelec */}
      <img src={logo} alt="SAFARELEC Logo" className="logo" />

      {/* container pour le header h2 et la formaulaire */}
      {/* <div className="welcome-section"> */}
       
      {/* formulaire pour l'insription */}
      <form 
            className="welcome-section"
            action="" 
            method="post" 
            onSubmit={()=>{}}>
         
         <h2>Create an Account</h2>

          <label for="first_name">
              First_name :
          </label>
          <input  
                id="first_name"
                className='Input_f'
                type="text" 
                placeholder='Entre your name'
          />

          <label for="last_name">
              Last_name :
          </label>
          <input  
                id="last_name"
                type="text" 
                placeholder='Entre your last name'
          />

          <label for="email">
              Email :
          </label>
          <input  
                id="email"
                type="email" 
                placeholder='Entre your email'
          />

          <label for="psd">
               Password :
          </label>
          <input  
                id="psd"
                type="password" 
                placeholder='Entre password'
          />

          <label for="Cpsd">
               Confirm Password :
          </label>
          <input  
                id="Cpsd"
                type="password" 
                placeholder='Confirm your password'
          />       
          <button className="button">Sign Up</button>
        </form>
      {/* </div> */}
     </div>
  </div>
  );
};

export default PageInscription;
