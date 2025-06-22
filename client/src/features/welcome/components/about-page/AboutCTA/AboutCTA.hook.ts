import { CTA_CONTENT } from './AboutCTA.constants';
import type { AboutCTAProps } from './AboutCTA.types';

/**
 * @hook useAboutCTA
 * @description Custom hook that contains all logic for the AboutCTA component
 *
 * @param {AboutCTAProps} props - Props passed to the AboutCTA component
 * @returns {Object} All data and functions needed by the AboutCTA component
 *
 * @author Ayyoub El Kouri
 * @date 14/06/2025
 * @lastUpdate 14/06/2025
 */
export const useAboutCTA = (props: AboutCTAProps) => {
    const { companyName, onContactClick, onServicesClick } = props;

    const fullDescription = `${CTA_CONTENT.description} ${companyName} ${CTA_CONTENT.descriptionSuffix}`;

    return {
        title: CTA_CONTENT.title,
        description: fullDescription,
        primaryButtonText: CTA_CONTENT.primaryButtonText,
        secondaryButtonText: CTA_CONTENT.secondaryButtonText,
        onContactClick,
        onServicesClick,
    };
};
