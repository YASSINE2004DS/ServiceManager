import { useAboutTeam } from './AboutTeam.hook';
import { ABOUT_TEAM_STYLES } from './AboutTeam.styles';
import { getInitials } from './AboutTeam.util';
import type { AboutTeamProps } from './AboutTeam.types';

/**
 * @component AboutTeam
 * @description Team members section component for the About page
 *
 * @dependencies useAboutTeam hook, AboutTeam.styles, AboutTeam.util
 *
 * @author Ayyoub El Kouri
 * @date 14/06/2025
 * @lastUpdate 14/06/2025
 */
const AboutTeam = (props: AboutTeamProps) => {
    const { sectionTitle, sectionSubtitle, members } = useAboutTeam(props);

    return (
        <section className={ABOUT_TEAM_STYLES.container}>
            <h2 className={ABOUT_TEAM_STYLES.sectionTitle}>{sectionTitle}</h2>
            <p className={ABOUT_TEAM_STYLES.sectionSubtitle}>
                {sectionSubtitle}
            </p>
            <div className={ABOUT_TEAM_STYLES.grid}>
                {members.map((member, index) => (
                    <div key={index} className={ABOUT_TEAM_STYLES.card.container}>
                        <div className={ABOUT_TEAM_STYLES.card.imageContainer}>
                            <img
                                src={member.image}
                                alt={member.name}
                                className={ABOUT_TEAM_STYLES.card.image}
                                onError={(e) => {
                                    const placeholder = document.createElement('div');
                                    placeholder.className = ABOUT_TEAM_STYLES.card.imagePlaceholder;
                                    placeholder.textContent = getInitials(member.name);
                                    e.currentTarget.parentNode?.replaceChild(placeholder, e.currentTarget);
                                }}
                            />
                        </div>
                        <h3 className={ABOUT_TEAM_STYLES.card.name}>{member.name}</h3>
                        <p className={ABOUT_TEAM_STYLES.card.position}>{member.position}</p>
                        <p className={ABOUT_TEAM_STYLES.card.experience}>{member.experience} d'expérience</p>
                        <p className={ABOUT_TEAM_STYLES.card.specialization}>{member.specialization}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default AboutTeam;
