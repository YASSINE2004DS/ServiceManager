import './PageEmail.css'
import logo from '../../Shared/Assets/safarelec-logo.png';
import { useState } from 'react';
const PageEmail = () => {

    const [email, setEmail] = useState('');
    const [title, setTitle] = useState('');
    const [message, setMessage] = useState('');
    const [Error, setError] = useState('');

    const sendEmail = async () => {

        // get the token from the local storage.
        const token = localStorage.getItem('token');

        try{
            const response = await fetch('http://localhost:3001/api/email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ destination_email: email, title: title, content: message })
            });


            const data = await response.json();
            
            if(!response.ok){
                setError(data.Error);
            }else{
                setError('');
                setEmail('');
                setTitle('');
                setMessage('');
            }
        }catch(error){
            console.error('Error sending email:', error);
        }
    }

    return  (
                <div className='container'>
                        
                    <div className="container-email">

                        {/* Company logo display */}
                        <img src={logo} alt="SAFARELEC Logo" className="logo" />
                        <h1>Boite Emails</h1>

                        <div className='email-container'>

                            <p className='error-message'>{Error}</p>
                            {/*  Email input field */}
                            <div className='email-inputs'>

                                {/*  Email input field */}
                                <label className='email-label' >Email</label>
                                <input type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />

                            </div>

                            {/*  Title input field */}
                            <div className='email-inputs'>

                                {/*  Email input field */}
                                <label className='email-label' >Title</label>
                                <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />

                            </div>

                            {/*  Message input field */}
                            <div className='email-inputs'>

                                {/*  Email input field */}
                                <label className='email-label' >Message</label>
                                <textarea className='email-textarea' type="text" placeholder="Message" value={message} onChange={(e) => setMessage(e.target.value)} />

                            </div>

                            {/*  Send button */}
                            
                            <button className='email-button' onClick={() => sendEmail()}>Send</button>
                            
                        </div>

                    </div>

                </div>
            );
};

export default PageEmail;
