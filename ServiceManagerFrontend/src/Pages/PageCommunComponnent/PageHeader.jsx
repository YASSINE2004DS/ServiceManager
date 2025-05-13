import logo from '../PageAccueil/Assets/safarelec-logo.png'; // remplace avec ton logo réel
import './PageHeader.css'

const PageHeader = () => {
    return (
                <div className='header'>
                   <img src={logo} alt="SAFARELEC logo" className="logo-safarelec" />
                   <div className='profile'>
                     <p className='email_user'>eljarjiniyassine1@gmail.com</p>
                     <div className="avatar">YE</div>
                     {/* <img src={avatarUrl} alt="profile" /> */}
                   </div>
                </div>
    ) ;
}

export default PageHeader ;