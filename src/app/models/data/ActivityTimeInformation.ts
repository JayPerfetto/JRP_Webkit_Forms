export interface ActivityTimeInformation {
    expectedEvents?: number;
    expectedHoursPrep?: number;
    expectedHoursActivity?: number;
    expectedHoursPostActivity?: number;
    postEngagementDescription?: string;
    prepDescription?: string;
    compensationPercentage?: string;
    activityTimeRequirements?: ActivityTimeDetails[];
}

export interface ActivityTimeDetails {
    activityName?: any;
    activityDisplayName?: string;
    prep?: number;
    activity?: number;
    post?: number;
    travel?: number;
    eventNumber?: number;
    totalTime?: number;
}
