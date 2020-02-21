import { IMeasure } from "../measures/baseMeasure";


export interface IContractMeasure extends IMeasure {
    contractAbbreviation?: string;
    documentId?: string;
    denom?: number;
    domain?: number;
    eligibilityStartDate?: any;
    eligibilityEndDate?: any;
    goals?: any[];
    goalOperator?: string;
    measureWeight?: any[];
    nameToSearch?: string;
    numer?: number;
    overRideContract?: boolean;
    p4pImpact?: string;
    performanceYTD?: number;
    targetName1?: string;
    targetValue1?: number;
    targetName2?: string;
    targetValue2?: number;
    targetName3?: string;
    targetValue3?: number;
    targetName4?: string;
    targetValue4?: number;
    targetName5?: string;
    targetValue5?: number;
}
