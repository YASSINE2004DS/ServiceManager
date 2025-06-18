import type { CompanyHistory } from './AboutHistory.types';

/**
 * @constant HISTORY_CONTENT
 * @description Content for the company history section
 */
export const HISTORY_CONTENT = {
    sectionTitle: 'Notre Parcours',
    sectionSubtitle: 'Les étapes clés qui ont marqué l\'évolution de',
    timeline: [
        {
            year: 2010,
            title: 'Fondation de Safarelec',
            description: 'Création de l\'entreprise avec une équipe de 5 ingénieurs électriciens passionnés',
        },
        {
            year: 2013,
            title: 'Expansion des Services',
            description: 'Ajout des services de maintenance préventive et corrective',
        },
        {
            year: 2016,
            title: 'Énergie Renouvelable',
            description: 'Lancement de la division énergie solaire et photovoltaïque',
        },
        {
            year: 2019,
            title: 'Certification ISO',
            description: 'Obtention des certifications ISO 9001 et ISO 14001',
        },
        {
            year: 2022,
            title: 'Innovation Technologique',
            description: 'Intégration des technologies IoT et smart grid dans nos solutions',
        },
        {
            year: 2025,
            title: 'Leadership Régional',
            description: 'Plus de 500 projets réalisés et équipe de 150+ professionnels',
        },
    ] as CompanyHistory[],
} as const;
