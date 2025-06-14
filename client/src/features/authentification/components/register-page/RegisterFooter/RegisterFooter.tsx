import { useRegisterFooter } from './RegisterFooter.hook';
import { REGISTER_FOOTER_STYLES } from './RegisterFooter.styles';
import type { RegisterFooterProps } from './RegisterFooter.types';

/**
 * @component RegisterFooter
 * @description Footer component for the Register page
 *
 * @dependencies useRegisterFooter hook, RegisterFooter.styles
 *
 * @author Ayyoub El Kouri
 * @date 14/06/2025
 * @lastUpdate 14/06/2025
 */
const RegisterFooter = (props: RegisterFooterProps) => {
    const { loginLinkText, handleLoginClick } = useRegisterFooter(props);

    return (
        <div className={REGISTER_FOOTER_STYLES.container}>
            <span className={REGISTER_FOOTER_STYLES.loginLink} onClick={handleLoginClick}>
                {loginLinkText}
            </span>
        </div>
    );
};

export default RegisterFooter;
