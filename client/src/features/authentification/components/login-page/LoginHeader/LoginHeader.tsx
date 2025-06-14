import { useLoginHeader } from './LoginHeader.hook';
import { LOGIN_HEADER_STYLES } from './LoginHeader.styles';
import type { LoginHeaderProps } from './LoginHeader.types';

/**
 * @component LoginHeader
 * @description Header component for the Login page
 *
 * @dependencies useLoginHeader hook, LoginHeader.styles
 *
 * @author Ayyoub El Kouri
 * @date 14/06/2025
 * @lastUpdate 14/06/2025
 */
const LoginHeader = (props: LoginHeaderProps) => {
    const { formTitle, formSubtitle } = useLoginHeader(props);

    return (
        <div className={LOGIN_HEADER_STYLES.container}>
            <h2 className={LOGIN_HEADER_STYLES.title}>{formTitle}</h2>
            <p className={LOGIN_HEADER_STYLES.subtitle}>{formSubtitle}</p>
        </div>
    );
};

export default LoginHeader;
