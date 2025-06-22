import { useFooter } from './Footer.hook';
import { FOOTER_STYLES } from './Footer.styles';
import type { FooterProps } from './Footer.types';

/**
 * @component Footer
 * @description Footer component for the Welcome page
 *
 * @dependencies useFooter hook, Footer.styles
 *
 * @author Ayyoub El Kouri
 * @date 14/06/2025
 * @lastUpdate 14/06/2025
 */
const Footer = (props: FooterProps) => {
    const {
        companyName,
        companyDescription,
        logoPath,
        navigationItems,
        contactInfo,
        onNavigation,
        onContactClick,
        formattedPhone,
        currentYear,
    } = useFooter(props);

    return (
        <footer className={FOOTER_STYLES.container}>
            <div className={FOOTER_STYLES.content}>
                <div className={FOOTER_STYLES.grid}>
                    {/* Company Info */}
                    <div>
                        <div className={FOOTER_STYLES.logo.container}>
                            <img
                                src={logoPath}
                                alt={`${companyName} Logo`}
                                className={FOOTER_STYLES.logo.image}
                                onError={(e) => {
                                    e.currentTarget.style.display = 'none';
                                }}
                            />
                            <span className={FOOTER_STYLES.logo.text}>{companyName}</span>
                        </div>
                        <p className={FOOTER_STYLES.description}>{companyDescription}</p>
                    </div>

                    {/* Navigation */}
                    <div>
                        <h3 className={FOOTER_STYLES.section.title}>Navigation</h3>
                        <div className={FOOTER_STYLES.section.content}>
                            {navigationItems.map((item) => (
                                <button
                                    key={item.label}
                                    onClick={() => onNavigation(item.href)}
                                    className={FOOTER_STYLES.nav.link}
                                >
                                    {item.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className={FOOTER_STYLES.section.title}>Contact</h3>
                        <div className={FOOTER_STYLES.section.content}>
                            <div className={FOOTER_STYLES.contact.item}>
                                <span>📧</span>
                                <button
                                    onClick={() => onContactClick('email')}
                                    className={FOOTER_STYLES.contact.link}
                                >
                                    {contactInfo.email}
                                </button>
                            </div>
                            <div className={FOOTER_STYLES.contact.item}>
                                <span>📞</span>
                                <button
                                    onClick={() => onContactClick('phone')}
                                    className={FOOTER_STYLES.contact.link}
                                >
                                    {formattedPhone}
                                </button>
                            </div>
                            <div className={FOOTER_STYLES.contact.item}>
                                <span>📍</span>
                                <span>{contactInfo.address}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={FOOTER_STYLES.bottom.container}>
                    <p className={FOOTER_STYLES.bottom.text}>
                        © {currentYear} {companyName}. Tous droits réservés.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
