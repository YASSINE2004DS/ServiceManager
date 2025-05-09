import Acceuil from './Pages/PageAccueil/PageAccueil.jsx';
import PageErreur from './Pages/PageErreur/PageErreur.jsx';
import SingUp from './Pages/PageInscription/PageInscription.jsx';
import Login from './Pages/PageConnextion/PageConnexion.jsx';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

    function App() {
      return (
        <Router>
          <Routes>
            <Route path="/"            element={< Acceuil />     }          />
            <Route path="/sign_up"     element={< SingUp />      }          />
            <Route path="/login"       element={< Login />       }            />
            <Route path="*"            element={< PageErreur />  }          />
          </Routes>
        </Router>
      );
    }



export default App;
