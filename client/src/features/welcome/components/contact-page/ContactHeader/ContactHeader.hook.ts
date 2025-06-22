import { HEADER_CONTENT } from './ContactHeader.constants';
import type { ContactHeaderProps } from './ContactHeader.types';

/**
 * @hook useContactHeader
 * @description Custom hook that contains all logic for the ContactHeader component
 *
 * @param {ContactHeaderProps} props - Props passed to the ContactHeader component
 * @returns {Object} All data and functions needed by the ContactHeader component
 *
 * @author Ayyoub El Kouri
 * @date 14/06/2025
 * @lastUpdate 14/06/2025
 */
export const useContactHeader = (props: ContactHeaderProps) => {
    const { onGoBack } = props;

    return {
        pageTitle: HEADER_CONTENT.pageTitle,
        pageSubtitle: HEADER_CONTENT.pageSubtitle,
        backButtonText: HEADER_CONTENT.backButtonText,
        onGoBack,
    };
};
