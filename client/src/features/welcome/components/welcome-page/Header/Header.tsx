import { useHeader } from './Header.hook';
import { HEADER_STYLES } from './Header.styles';
import type { HeaderProps } from './Header.types';

/**
 * @component Header
 * @description Header component for the Welcome page
 *
 * @dependencies useHeader hook, Header.styles
 *
 * @author Ayyoub El Kouri
 * @date 14/06/2025
 * @lastUpdate 14/06/2025
 */
const Header = (props: HeaderProps) => {
    const { companyName, logoPath, navigationItems, onLogin, onRegister, onNavigation } =
        useHeader(props);

    return (
        <header className={HEADER_STYLES.container}>
            <div className={HEADER_STYLES.content}>
                <div className={HEADER_STYLES.wrapper}>
                    {/* Logo */}
                    <div className={HEADER_STYLES.logo.container}>
                        <img
                            src={logoPath}
                            alt={`${companyName} Logo`}
                            className={HEADER_STYLES.logo.image}
                            onError={(e) => {
                                e.currentTarget.style.display = 'none';
                            }}
                        />
                        <span className={HEADER_STYLES.logo.text}>{companyName}</span>
                    </div>

                    {/* Navigation */}
                    <nav className={HEADER_STYLES.nav.desktop}>
                        {navigationItems.map((item) => (
                            <button
                                key={item.label}
                                onClick={() => onNavigation(item.href)}
                                className={HEADER_STYLES.nav.link}
                            >
                                {item.label}
                            </button>
                        ))}
                    </nav>

                    {/* Actions */}
                    <div className={HEADER_STYLES.actions.container}>
                        <button onClick={onLogin} className={HEADER_STYLES.actions.loginButton}>
                            Connexion
                        </button>
                        <button
                            onClick={onRegister}
                            className={HEADER_STYLES.actions.registerButton}
                        >
                            S'inscrire
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
