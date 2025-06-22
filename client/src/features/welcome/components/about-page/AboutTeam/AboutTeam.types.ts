/**
 * @interface TeamMember
 * @description Interface for team member information
 */
export interface TeamMember {
    name: string;
    position: string;
    experience: string;
    specialization: string;
    image: string;
}

/**
 * @interface AboutTeamProps
 * @description Props interface for the AboutTeam component
 */
export interface AboutTeamProps {
    // No props needed - component manages its own data
}
