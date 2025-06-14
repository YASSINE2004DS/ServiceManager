import { HEADER_CONTENT } from './RegisterHeader.constants';
import type { RegisterHeaderProps } from './RegisterHeader.types';

/**
 * @hook useRegisterHeader
 * @description Custom hook that contains all logic for the RegisterHeader component
 *
 * @param {RegisterHeaderProps} props - Props passed to the RegisterHeader component
 * @returns {Object} All data and functions needed by the RegisterHeader component
 *
 * @author Ayyoub El Kouri
 * @date 14/06/2025
 * @lastUpdate 14/06/2025
 */
export const useRegisterHeader = (props: RegisterHeaderProps) => {
    return {
        ...HEADER_CONTENT,
    };
};
