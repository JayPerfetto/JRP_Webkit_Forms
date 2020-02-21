export interface MeasureScorecard {
    measure: string;
    masterAbbreviation: string;
    memberCount?: number;
    contractsWithMeasure?: string[];
    potentialRevenuePmpy?: number;
    scoreContracts?: ScoreContract[];
    contractsAffected?: number;
    measureScore?: number;
    updatedAt?: any
}

interface ScoreContract {
    contractName?: string;
    rating?: Rating
    score?: number;
}

export enum Rating {
    High = 'High',
    Med = 'Med',
    Low = 'Low'
}