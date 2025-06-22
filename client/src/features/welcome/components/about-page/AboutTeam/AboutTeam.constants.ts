import type { TeamMember } from './AboutTeam.types';

/**
 * @constant TEAM_CONTENT
 * @description Content for the team section
 */
export const TEAM_CONTENT = {
    sectionTitle: 'Notre Équipe',
    sectionSubtitle: 'Une équipe d\'experts passionnés et expérimentés à votre service',
    members: [
        {
            name: 'Ahmed Benali',
            position: 'Directeur Général',
            experience: '15 ans',
            specialization: 'Management et Stratégie',
            image: '/src/assets/team/ahmed-benali.jpg',
        },
        {
            name: 'Fatima Zahra',
            position: 'Directrice Technique',
            experience: '12 ans',
            specialization: 'Ingénierie Électrique',
            image: '/src/assets/team/fatima-zahra.jpg',
        },
        {
            name: 'Omar Kadiri',
            position: 'Chef de Projet',
            experience: '10 ans',
            specialization: 'Gestion de Projets',
            image: '/src/assets/team/omar-kadiri.jpg',
        },
        {
            name: 'Laila Chraibi',
            position: 'Responsable Énergie Renouvelable',
            experience: '8 ans',
            specialization: 'Systèmes Photovoltaïques',
            image: '/src/assets/team/laila-chraibi.jpg',
        },
    ] as TeamMember[],
} as const;
