/**
 * @interface AboutPageProps
 * @description Props interface for the About page component
 */
export interface AboutPageProps {
    className?: string;
}

/**
 * @interface CompanyAbout
 * @description Interface for main company information
 */
export interface CompanyAbout {
    companyName: string;
    foundedYear: number;
    description: string;
    mission: string;
    vision: string;
    headquarters: string;
    employees: string;
    projectsCompleted: string;
    serviceAreas: string[];
}

/**
 * @interface CompanyHistory
 * @description Interface for company timeline events
 */
export interface CompanyHistory {
    year: number;
    title: string;
    description: string;
}

/**
 * @interface CompanyValue
 * @description Interface for company core values
 */
export interface CompanyValue {
    title: string;
    description: string;
    icon: string;
}

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
