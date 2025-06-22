import { CONTACT_INFO_CONTENT, CONTACT_ITEMS } from './ContactInfo.constants';
import type { ContactInfoProps } from './ContactInfo.types';

/**
 * @hook useContactInfo
 * @description Custom hook that contains all logic for the ContactInfo component
 *
 * @param {ContactInfoProps} props - Props passed to the ContactInfo component
 * @returns {Object} All data and functions needed by the ContactInfo component
 *
 * @author Ayyoub El Kouri
 * @date 14/06/2025
 * @lastUpdate 14/06/2025
 */
export const useContactInfo = (props: ContactInfoProps) => {
    return {
        title: CONTACT_INFO_CONTENT.title,
        contactItems: CONTACT_ITEMS,
    };
};
