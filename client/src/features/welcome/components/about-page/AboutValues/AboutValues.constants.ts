import type { CompanyValue } from './AboutValues.types';

/**
 * @constant VALUES_CONTENT
 * @description Content for the company values section
 */
export const VALUES_CONTENT = {
    sectionTitle: 'Nos Valeurs',
    sectionSubtitle: 'Ces valeurs fondamentales guident chacune de nos décisions et actions quotidiennes',
    values: [
        {
            title: 'Excellence Technique',
            description: 'Nous nous engageons à fournir des solutions de la plus haute qualité technique',
            icon: '⚡',
        },
        {
            title: 'Innovation Continue',
            description: 'Nous investissons constamment dans les nouvelles technologies et méthodes',
            icon: '💡',
        },
        {
            title: 'Durabilité Environnementale',
            description: 'Nos solutions respectent l\'environnement et favorisent les énergies renouvelables',
            icon: '🌱',
        },
        {
            title: 'Satisfaction Client',
            description: 'La satisfaction de nos clients est au cœur de toutes nos décisions',
            icon: '🤝',
        },
        {
            title: 'Sécurité Prioritaire',
            description: 'La sécurité de nos équipes et clients est notre priorité absolue',
            icon: '🛡️',
        },
        {
            title: 'Formation Continue',
            description: 'Nous investissons dans la formation continue de nos équipes',
            icon: '📚',
        },
    ] as CompanyValue[],
} as const;
