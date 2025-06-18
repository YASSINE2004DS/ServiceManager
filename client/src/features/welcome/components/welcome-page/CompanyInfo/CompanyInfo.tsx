import { useCompanyInfo } from './CompanyInfo.hook';
import { COMPANY_INFO_STYLES } from './CompanyInfo.styles';
import type { CompanyInfoProps } from './CompanyInfo.types';

/**
 * @component CompanyInfo
 * @description Company information section component for the Welcome page
 *
 * @dependencies useCompanyInfo hook, CompanyInfo.styles
 *
 * @author Ayyoub El Kouri
 * @date 14/06/2025
 * @lastUpdate 14/06/2025
 */
const CompanyInfo = (props: CompanyInfoProps) => {
    const { companyInfo, experienceText } = useCompanyInfo(props);

    return (
        <section className={COMPANY_INFO_STYLES.container}>
            <div className={COMPANY_INFO_STYLES.content}>
                <div className={COMPANY_INFO_STYLES.grid}>
                    <div className={COMPANY_INFO_STYLES.textContent}>
                        <h2 className={COMPANY_INFO_STYLES.title}>
                            À propos de {companyInfo.name}
                        </h2>
                        <p className={COMPANY_INFO_STYLES.description}>{companyInfo.description}</p>
                        <p className={COMPANY_INFO_STYLES.description}>
                            {experienceText} dans le domaine électrique
                        </p>

                        <div className={COMPANY_INFO_STYLES.mission.container}>
                            <h3 className={COMPANY_INFO_STYLES.mission.title}>Notre Mission</h3>
                            <p className={COMPANY_INFO_STYLES.mission.text}>
                                {companyInfo.mission}
                            </p>
                        </div>

                        <div className={COMPANY_INFO_STYLES.vision.container}>
                            <h3 className={COMPANY_INFO_STYLES.vision.title}>Notre Vision</h3>
                            <p className={COMPANY_INFO_STYLES.vision.text}>{companyInfo.vision}</p>
                        </div>
                    </div>

                    <div className={COMPANY_INFO_STYLES.imageContainer}>
                        <img
                            src="/src/assets/company-building.jpg"
                            alt="Safarelec Building"
                            className={COMPANY_INFO_STYLES.image}
                            onError={(e) => {
                                e.currentTarget.style.display = 'none';
                            }}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CompanyInfo;
