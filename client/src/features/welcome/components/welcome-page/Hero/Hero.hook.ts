import { HERO_CONTENT } from './Hero.constants';
import type { HeroProps } from './Hero.types';

/**
 * @hook useHero
 * @description Custom hook that contains all logic for the Hero component
 *
 * @param {HeroProps} props - Props passed to the Hero component
 * @returns {Object} All data and functions needed by the Hero component
 *
 * @author Ayyoub El Kouri
 * @date 14/06/2025
 * @lastUpdate 14/06/2025
 */
export const useHero = (props: HeroProps) => {
    const { onCtaClick } = props;

    return {
        ...HERO_CONTENT,
        onCtaClick,
    };
};
