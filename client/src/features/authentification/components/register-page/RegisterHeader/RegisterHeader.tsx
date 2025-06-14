import { useRegisterHeader } from './RegisterHeader.hook';
import { REGISTER_HEADER_STYLES } from './RegisterHeader.styles';
import type { RegisterHeaderProps } from './RegisterHeader.types';

/**
 * @component RegisterHeader
 * @description Header component for the Register page
 *
 * @dependencies useRegisterHeader hook, RegisterHeader.styles
 *
 * @author Ayyoub El Kouri
 * @date 14/06/2025
 * @lastUpdate 14/06/2025
 */
const RegisterHeader = (props: RegisterHeaderProps) => {
    const { formTitle, formSubtitle } = useRegisterHeader(props);

    return (
        <div className={REGISTER_HEADER_STYLES.container}>
            <h2 className={REGISTER_HEADER_STYLES.title}>{formTitle}</h2>
            <p className={REGISTER_HEADER_STYLES.subtitle}>{formSubtitle}</p>
        </div>
    );
};

export default RegisterHeader;
