import { HEADER_CONTENT } from './LoginHeader.constants';
import type { LoginHeaderProps } from './LoginHeader.types';

/**
 * @hook useLoginHeader
 * @description Custom hook that contains all logic for the LoginHeader component
 *
 * @param {LoginHeaderProps} props - Props passed to the LoginHeader component
 * @returns {Object} All data and functions needed by the LoginHeader component
 *
 * @author Ayyoub El Kouri
 * @date 14/06/2025
 * @lastUpdate 14/06/2025
 */
export const useLoginHeader = (props: LoginHeaderProps) => {
    return {
        ...HEADER_CONTENT,
    };
};
