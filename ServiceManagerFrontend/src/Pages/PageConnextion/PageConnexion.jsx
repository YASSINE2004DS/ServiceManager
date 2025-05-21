import { useState } from 'react';

import logo from '../../Shared/Assets/safarelec-logo.png';
import './PageConnexion.css' ;


/**
 * @component PageConnexion
 * @description This component renders the login page for the Service Manager application.
 * It displays a form where users can enter their email and password to authenticate.
 * The form includes:
 * - SAFARELEC company logo
 * - Email input field
 * - Password input field  
 * - Sign in button
 * 
 * @returns {JSX.Element} The rendered login page component
 */
const PageConnexion = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    // Handle form submission using async/await
    const handleSubmit = async (e) => {
        // Prevent default form submission behavior
        e.preventDefault(); 

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
            if(response.ok){
                // Set the token in the local storage
                localStorage.setItem('token', data.token);

                // Redirect to the home page
                window.location.href = '/ShowInterventions';
            } else {
                // Set the error message
                setError(data.message);
            }

        } catch (error) {
            // Handle any errors that occur during the request
            console.error('Error during login:', error);
        }
    }

    return  (
                <div className='container'>
                        
                    <div className="home-container-connexion">

                        {/* Company logo display */}
                        <img src={logo} alt="SAFARELEC Logo" className="logo" />

                        {/* Login form */}
                        <form 
                                className="welcome-section-form"
                                action="" 
                                method="post" 
                                onSubmit={handleSubmit}
                        >
                        
                            <h2>Log in to Service</h2>

                            {/* Error message */}
                            {error && <p className="error-message">{error}</p>}

                            {/* Email input field */}
                            <label htmlFor="email">Email :</label>
                            <input  
                                    className="Input-Form"         
                                    id="email"
                                    type="email" 
                                    placeholder='Entre your email'
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    autoComplete='on'
                            />

                            {/* Password input field */}
                            <label htmlFor="psd">Password :</label>
                            <input
                                    className="Input-Form" 
                                    id="psd"
                                    type="password" 
                                    placeholder='Entre password'
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    autoComplete='off'
                            />
                        
                            {/* Submit button */}
                            <button className="button">Sign In</button>
                        </form>
                    </div>
                </div>
            );
};

export default PageConnexion;
