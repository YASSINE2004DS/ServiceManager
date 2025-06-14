import { FOOTER_CONTENT } from './RegisterFooter.constants';
import type { RegisterFooterProps } from './RegisterFooter.types';

/**
 * @hook useRegisterFooter
 * @description Custom hook that contains all logic for the RegisterFooter component
 *
 * @param {RegisterFooterProps} props - Props passed to the RegisterFooter component
 * @returns {Object} All data and functions needed by the RegisterFooter component
 *
 * @author Ayyoub El Kouri
 * @date 14/06/2025
 * @lastUpdate 14/06/2025
 */
export const useRegisterFooter = (props: RegisterFooterProps) => {
    const { handleLoginClick } = props;

    return {
        ...FOOTER_CONTENT,
        handleLoginClick,
    };
};
