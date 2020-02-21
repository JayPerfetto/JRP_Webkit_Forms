import { IMeasureCategory } from "./measureCategory";
import { IResource } from "../resources/resource";


export interface IMeasure {
    masterAbbreviation?: string;
    documentId?: string;
    effortMinutesToCloseGap?: number;
    cptCodes?: Array<any>;
    measure?: string;
    notes?: string;
    spec?: string;
    category?: IMeasureCategory;
    resourceHourlyRate?: number;
    resourceTypeRequired?: IResource;
    overRideFlag?: boolean;
    nameToSearch?: string;
    createdAt?: any;
    updatedAt?: any;
}
