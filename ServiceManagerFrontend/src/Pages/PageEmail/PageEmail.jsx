import './PageEmail.css'
import { useState , useEffect }                         from 'react';
import axios                                            from 'axios';
import PageHeader                                       from '../../Pages/PageCommunComponnent/PageHeader'; // import page qui contient le header
import { ErrorManagement}                               from '../../Shared/Components/MessageManagement'
import { FontAwesomeIcon }                              from '@fortawesome/react-fontawesome';      // bibliothéque pour les icons
import { faSpinner }                                    from '@fortawesome/free-solid-svg-icons';   // icon spinner
import { VerifierExpiredToken , UserIdAndRole , token}  from '../../Pages/Authentification/Authentification' // import deux fonctions un pour la verifications
import { useNavigate  }                                 from 'react-router-dom';


const PageEmail = () => {

            // hooks pour verifié l'authentification et l'expiration du token
            useEffect(( )=> {
              if(!token || VerifierExpiredToken(token))
                {
                    navigate('/RequiredAuthentification');
                    return ;
                }
            //   const { role} = UserIdAndRole(token);
        
            //     if(role !== 'admin')
            //        navigate('/AuthorizationFailed');                

             } , []);

  const [email, setEmail]        = useState('');
  const [title, setTitle]        = useState('');
  const [message, setMessage]    = useState('');
  const [file, setFile]          = useState(null);
  const [Error, setError]        = useState('');
  const [Success, setSuccess]    = useState('');
  const [loading , setLoading]   = useState(false);
    const navigate               = useNavigate();



  const sendEmail = async () => {
    const token = localStorage.getItem('token');

    try {
       setLoading(true);
      const formData = new FormData();
      formData.append('destination_email', email);
      formData.append('title', title);
      formData.append('content', message);
      formData.append('document', file);

      await axios.post(
        'http://localhost:8000/api/email',
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      setLoading(false);
      setSuccess('Email envoyé avec succès');

    } catch (error) {
      if (error.response?.data?.Error) {
        setError(error.response.data.Error);
      } else {
        console.error('Error sending email:', error);
      }
      setLoading(false);
    }
  };

  return (
    <div className="page-email">
        <PageHeader />
      <div className="email-card">
              {(Error && ErrorManagement(null , Error , "error" ,     setError )) || 
               (Success && ErrorManagement(null , Success , "success" , setSuccess)) }
        {/* Logo en haut */}
        <header className="email-header">
          <h1 className="email-title">Boîte Email</h1>
        </header>

        <form
          className="email-form"
          onSubmit={(e) => {
            e.preventDefault();
            sendEmail();
          }}
        >

          {/* Message d'erreur */}
          {/* {Error && <p className="email-error">{Error}</p>} */}

          {/* Champ Email */}
          <div className="input-group">
            <label htmlFor="destination_email" className="input-label">
              Email :
            </label>
            <input
              id="destination_email"
              type="email"
              placeholder="Entrez l'email du destinataire"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="input-field"
            />
          </div>

          {/* Champ Title */}
          <div className="input-group">
            <label htmlFor="title" className="input-label">
              Titre :
            </label>
            <input
              id="title"
              type="text"
              placeholder="Objet du mail"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="input-field"
            />
          </div>

          {/* Champ Message */}
          <div className="input-group">
            <label htmlFor="content" className="input-label">
              Message :
            </label>
            <textarea
              id="content"
              placeholder="Votre message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              className="textarea-field"
              rows={5}
            />
          </div>

<div className="input-group">
  <label htmlFor="document" className="input-label">Fichier :</label>

  <div className="custom-file-input">
    <input
      id="document"
      type="file"
      name="document"
      onChange={(e) => setFile(e.target.files[0])}
    />

    <span className="file-label">
        {!file &&
        <svg style={{height:20  , padding:'0px 15px' }} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
        <path strokeLinecap="round" 
              strokeLinejoin="round" 
              d="m9 13.5 3 3m0 0 3-3m-3 3v-6m1.06-4.19-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z" />
        </svg>
        }
      {file ? file.name : "Choisir un fichier"}
    </span>
  </div>
</div>

          {/* Bouton Envoi */}
          <div className="button-container">
            <button   type="submit" 
                      className="send-button" 
                      disabled={loading} 
                      style={loading ? { backgroundColor: 'gray' } : {}}>

             {loading &&             
                   <FontAwesomeIcon 
                    icon={faSpinner}
                    style={{padding:'0px 8px',}} 
                    spin size="1x" />
             }
             {loading ? 'En cours' : 'Envoyer'}

            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PageEmail;
