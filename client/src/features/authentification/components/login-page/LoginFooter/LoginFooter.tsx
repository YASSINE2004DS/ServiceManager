import { useLoginFooter } from './LoginFooter.hook';
import { LOGIN_FOOTER_STYLES } from './LoginFooter.styles';
import type { LoginFooterProps } from './LoginFooter.types';

/**
 * @component LoginFooter
 * @description Footer component for the Login page
 *
 * @dependencies useLoginFooter hook, LoginFooter.styles
 *
 * @author Ayyoub El Kouri
 * @date 14/06/2025
 * @lastUpdate 14/06/2025
 */
const LoginFooter = (props: LoginFooterProps) => {
    const { registerLinkText, handleRegisterClick } = useLoginFooter(props);

    return (
        <div className={LOGIN_FOOTER_STYLES.container}>
            <span className={LOGIN_FOOTER_STYLES.registerLink} onClick={handleRegisterClick}>
                {registerLinkText}
            </span>
        </div>
    );
};

export default LoginFooter;
