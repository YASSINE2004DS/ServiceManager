import { COMPANY_DATA } from './CompanyInfo.constants';
import { formatFoundedYear } from './CompanyInfo.util';
import type { CompanyInfoProps } from './CompanyInfo.types';

/**
 * @hook useCompanyInfo
 * @description Custom hook that contains all logic for the CompanyInfo component
 *
 * @param {CompanyInfoProps} props - Props passed to the CompanyInfo component
 * @returns {Object} All data and functions needed by the CompanyInfo component
 *
 * @author Ayyoub El Kouri
 * @date 14/06/2025
 * @lastUpdate 14/06/2025
 */
export const useCompanyInfo = (props: CompanyInfoProps) => {
    const companyInfo = COMPANY_DATA;
    const experienceText = formatFoundedYear(companyInfo.foundedYear);

    return {
        companyInfo,
        experienceText,
    };
};
