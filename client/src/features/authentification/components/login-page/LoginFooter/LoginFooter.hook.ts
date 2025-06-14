import { FOOTER_CONTENT } from './LoginFooter.constants';
import type { LoginFooterProps } from './LoginFooter.types';

/**
 * @hook useLoginFooter
 * @description Custom hook that contains all logic for the LoginFooter component
 *
 * @param {LoginFooterProps} props - Props passed to the LoginFooter component
 * @returns {Object} All data and functions needed by the LoginFooter component
 *
 * @author Ayyoub El Kouri
 * @date 14/06/2025
 * @lastUpdate 14/06/2025
 */
export const useLoginFooter = (props: LoginFooterProps) => {
    const { handleRegisterClick } = props;

    return {
        ...FOOTER_CONTENT,
        handleRegisterClick,
    };
};
