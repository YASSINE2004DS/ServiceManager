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
 * @interface AboutHistoryProps
 * @description Props interface for the AboutHistory component
 */
export interface AboutHistoryProps {
    companyName: string;
}
