import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import Link and useNavigate for navigation

import logo from '../../Shared/Assets/safarelec-logo.png';
import './PageConnexion.css';
// Make sure these imports are correct based on your file structure
import { VerifierExpiredToken, UserIdAndRole, token } from '../Authentification/Authentification';


/**
 * @component PageConnexion
 * @description This component renders the login page for the Service Manager application.
 * It displays a form where users can enter their email and password to authenticate.
 * The form includes:
 * - SAFARELEC company logo
 * - Email input field
 * - Password input field
 * - Sign in button
 * - Link to registration page
 *
 * @returns {JSX.Element} The rendered login page component
 */
const PageConnexion = () => {
    const navigate = useNavigate(); // Initialize useNavigate hook

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');


    // Handle form submission using async/await
    const handleSubmit = async (e) => {
        // Prevent default form submission behavior
        e.preventDefault();

        // Basic client-side validation
        if (!email || !password) {
            setError('Veuillez entrer votre email et votre mot de passe.');
            return;
        }

        try {
            // Send login request to backend API
            const response = await fetch('http://localhost:8000/api/user/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    password: password
                })
            });

            // Parse JSON response data
            const data = await response.json();

            // Check if the response is successful
            if (response.ok) {
                localStorage.setItem('token', data.token);
                localStorage.setItem('id', data.user.id);

                // Assuming UserIdAndRole decodes the token correctly
                const { role } = UserIdAndRole(data.token);

                // Check if the account is active
                if (!data.user.active) {
                    navigate('/inactiveAccount'); // Use navigate
                    return;
                }

                if (role === 'user') {
                    navigate('/ShowInterventions'); // Use navigate
                } else {
                    navigate('/admin/statistiques'); // Use navigate
                }

            } else {
                // Set the error message
                setError(data.message || 'Email ou mot de passe incorrect.');
            }

        } catch (apiError) {
            // Handle any errors that occur during the request
            console.error('Erreur lors de la connexion:', apiError);
            setError('Une erreur est survenue. Veuillez réessayer plus tard.');
        }
    };

    return (
        <div className='container-cnx'>

            <div className="home-container-connexion">

                {/* Company logo display */}
                <img src={logo} alt="SAFARELEC Logo" className="logo" />

                {/* Login form */}
                <form
                    className="welcome-section-form"
                    onSubmit={handleSubmit}
                >

                    <h2>Connectez-vous à Safarelec</h2> {/* Changed title to French for consistency */}

                    {/* Error message */}
                    {error && <p className="error-message">{error}</p>}

                    {/* Email input field */}
                    <label htmlFor="email">Email :</label>
                    <input
                        className="Input-Form"
                        id="email"
                        type="email"
                        placeholder='Entrez votre email'
                        value={email}
                        onChange={(e) => { setEmail(e.target.value); setError(''); }} // Clear error on change
                        required
                        autoComplete='on'
                    />

                    {/* Password input field */}
                    <label htmlFor="psd">Mot de passe :</label> {/* Changed label to French */}
                    <input
                        className="Input-Form"
                        id="psd"
                        type="password"
                        placeholder='Entrez votre mot de passe' // Changed placeholder to French
                        value={password}
                        onChange={(e) => { setPassword(e.target.value); setError(''); }} // Clear error on change
                        required
                        autoComplete='off'
                    />

                    {/* Submit button */}
                    <button className="button-cnx">Se Connecter</button> {/* Changed button text to French */}
                </form>

                {/* Link to registration page - ADDED HERE */}
                <p className="register-prompt">
                    Vous n'avez pas de compte ? <Link to="/register" className="register-link">Inscrivez-vous ici</Link>
                </p>
            </div>
        </div>
    );
};

export default PageConnexion;