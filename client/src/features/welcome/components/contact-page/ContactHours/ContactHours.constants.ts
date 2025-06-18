/**
 * @constant HOURS_CONTENT
 * @description Content for the contact hours component
 */
export const HOURS_CONTENT = {
    title: "Heures d'Ouverture",
    schedule: [
        {
            days: 'Lundi - Vendredi',
            hours: '8h00 - 18h00',
        },
        {
            days: 'Samedi',
            hours: '9h00 - 16h00',
        },
        {
            days: 'Dimanche',
            hours: 'Fermé',
        },
    ],
} as const;
