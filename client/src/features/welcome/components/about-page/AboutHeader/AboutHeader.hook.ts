import { HEADER_CONTENT } from './AboutHeader.constants';
import { formatExperienceText } from './AboutHeader.util';
import type { AboutHeaderProps } from './AboutHeader.types';

/**
 * @hook useAboutHeader
 * @description Custom hook that contains all logic for the AboutHeader component
 *
 * @param {AboutHeaderProps} props - Props passed to the AboutHeader component
 * @returns {Object} All data and functions needed by the AboutHeader component
 *
 * @author Ayyoub El Kouri
 * @date 14/06/2025
 * @lastUpdate 14/06/2025
 */
export const useAboutHeader = (props: AboutHeaderProps) => {
    const { onGoBack } = props;

    const experienceText = formatExperienceText(HEADER_CONTENT.foundedYear);

    return {
        companyName: HEADER_CONTENT.companyName,
        description: HEADER_CONTENT.description,
        experienceText,
        onGoBack,
    };
};
