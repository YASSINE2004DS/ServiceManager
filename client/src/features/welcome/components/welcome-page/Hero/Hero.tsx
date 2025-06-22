import { useHero } from './Hero.hook';
import { HERO_STYLES } from './Hero.styles';
import type { HeroProps } from './Hero.types';

/**
 * @component Hero
 * @description Hero section component for the Welcome page
 *
 * @dependencies useHero hook, Hero.styles
 *
 * @author Ayyoub El Kouri
 * @date 14/06/2025
 * @lastUpdate 14/06/2025
 */
const Hero = (props: HeroProps) => {
    const { title, subtitle, ctaText, onCtaClick } = useHero(props);

    return (
        <section className={HERO_STYLES.container}>
            <div className={HERO_STYLES.content}>
                <h1 className={HERO_STYLES.title}>{title}</h1>
                <p className={HERO_STYLES.subtitle}>{subtitle}</p>
                <button onClick={onCtaClick} className={HERO_STYLES.cta}>
                    {ctaText}
                </button>
            </div>
        </section>
    );
};

export default Hero;
