import{ useState }      from 'react';

import styles           from './PageInscription.module.css';
import logo             from '../../Shared/Assets/safarelec-logo.png';

/**
 * @class PageInscription
 * @brief Registration page component that handles new user account creation
 * 
 * This component provides a form interface for users to register by entering their:
 * - First name
 * - Last name  
 * - Email address
 * - Password (with confirmation)
 * 
 * The form includes basic validation and submits user data to the backend service
 * for account creation.
 * 
 * @returns {JSX.Element} A registration form interface
 */
const PageInscription = () => {
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        confirm_password: '',
    });

    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            // Validate required fields
            if  (
                    !formData.first_name ||
                    !formData.last_name || 
                    !formData.email || 
                    !formData.password  || 
                    !formData.confirm_password
                )
            {
                setError('Please fill all fields');
                return;
            }

            // Validate password match
            if (formData.password !== formData.confirm_password)
            {
                setError('Passwords do not match');
                return;
            }

            // Remove confirm_password before sending to API
            const { confirm_password, ...dataToSend } = formData;

            const response = await fetch('http://localhost:8000/api/user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dataToSend)
            });

            const data = await response.json();

            if (response.ok)
            {
                window.location.href = '/login';
            }
            else
            {
                // Display error from backend
                setError(data.Error ? `${data.Error} ${data.description || ''}` : data.message);
            }
        } catch (error) {
            console.error('Registration error:', error);
            setError('An error occurred during registration. Please try again.');
        }
    };

    return (
        <div className={styles["container-singUp"]}>
            {/* Main wrapper for the registration page content */}
            <div className={styles["home-container"]}>
                {/* Company branding element */}
                <img src={logo} alt="SAFARELEC Logo" className={styles["logo"]} />
                
                {/* 
                 * Registration form component
                 * Handles user input collection and submission
                 */}
                <form 
                    className={styles["welcome-section"]}
                    action="" 
                    method="post" 
                    onSubmit={handleSubmit}
                >
                    <h2>Create an Account</h2>

                    {/* Error message display */}
                    {error && <p className={styles["error-message"]}>{error}</p>}

                    {/* User's first name input field */}
                    <label htmlFor="first_name">First name:</label>
                    <input  
                        id="first_name"
                        className={styles["Input-Form"]}
                        type="text" 
                        placeholder='Enter your first name'
                        value={formData.first_name}
                        onChange={(e)=>{setFormData({...formData, first_name: e.target.value})}}
                        required
                    />

                    {/* User's last name input field */}
                    <label htmlFor="last_name">Last name:</label>
                    <input  
                        id="last_name"
                        className={styles["Input-Form"]}
                        type="text" 
                        placeholder='Enter your last name'
                        value={formData.last_name}
                        onChange={(e)=>{setFormData({...formData, last_name: e.target.value})}}
                        required
                    />

                    {/* User's email address input field */}
                    <label htmlFor="email">Email:</label>
                    <input  
                        id="email"
                        className={styles["Input-Form"]}
                        type="email" 
                        placeholder='Enter your email'
                        value={formData.email}
                        onChange={(e)=>{setFormData({...formData, email: e.target.value})}}
                        required
                    />

                    {/* User's password input field */}
                    <label htmlFor="psd">Password:</label>
                    <input  
                        id="psd"
                        className={styles["Input-Form"]}
                        type="password" 
                        placeholder='Enter password'
                        value={formData.password}
                        onChange={(e)=>{setFormData({...formData, password: e.target.value})}}
                        autoComplete='new-password'
                        required
                    />

                    {/* Password confirmation input field for validation */}
                    <label htmlFor="Cpsd">Confirm Password:</label>
                    <input  
                        id="Cpsd"
                        className={styles["Input-Form"]}
                        type="password" 
                        placeholder='Confirm your password'
                        value={formData.confirm_password}
                        onChange={(e)=>{setFormData({...formData, confirm_password: e.target.value})}}
                        required
                    />       
                    
                    {/* Form submission button */}
                    <button className={styles["button-sing_up"]}>Sign Up</button>
                </form>
            </div>
        </div>
    );
};

export default PageInscription;
