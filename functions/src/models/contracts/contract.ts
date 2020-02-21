import { IContractMeasure } from "./contractMeasure";
import { State } from "../utility/state";

export interface IContract {
    actualTmc?: string;
    contractID?: string;
    documentId?: string;
    nameToSearch?: string;
    contractDescription?: string;
    entityName?: string;
    state?: State;
    eligiblePop?: string;
    expectedTmc?: string;
    populationSize?: number;
    infrastructurePMPM?: number;
    sharedSavings?: number;
    expectedPMPM?: number;
    actualPMPM?: number;
    paidToAllowedRatio?: number;
    gainSharePercent?: number;
    savingsGateMin?: number;
    savingsGateMax?: number;
    overallQualityScore?: number;
    qualityAsOfDate?: any;
    qualityLogic?: any;
    qualityAdjustment?: number;
    qualityBonusPMPM?: string;
    numberOfGoals?: number;
    goalNames?: string;
    measures?: IContractMeasure[];
    overRideFlag?: number;
    updatedAt?: any;
    createdAt?: any;
}
