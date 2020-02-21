const _admin = require('firebase-admin');
_admin.initializeApp();
import { CloudFunction, Change, HttpsFunction } from 'firebase-functions/lib/cloud-functions';
import { DocumentSnapshot } from 'firebase-functions/lib/providers/firestore';
import { collectionStatAggregatorCreate, collectionStatAggregatorDelete } from './triggers/aggregation/collection-stats-aggregator'
import { onMesureDeleteSync } from './triggers/related-delete/deleteMeasure'
import { onMesureAbbrevChangeSync } from './triggers/related-edit/editMeasure'
import { createMeasureHistory } from './triggers/measure-history/create-measure-history'
import { deleteMeasureHistory } from './triggers/measure-history/delete-stale-history'
import { addCreateDate } from './triggers/create-dates/createDateTrigger';
import { mthlyCpSnapshot } from './pubsub/contract-measure-history/monthlyCpSnapshot';
import * as collectionStats from './http/collections_api/collectionStats';
import * as contractMeasures from './http/collections_api/contractMeasures';
import * as contracts from './http/collections_api/contracts';
import * as entities from './http/collections_api/entities';
import * as measures from './http/collections_api/measures';
import * as people from './http/collections_api/people';
import * as providers from './http/collections_api/providers';
import * as resources from './http/collections_api/resources';
import * as users from './http/collections_api/users';
import * as measureScorecards from './http/collections_api/measureScorecard';
import { triggerMeasureHistoryCapture } from './http/measureHistorySnapshots/measureHistorySnapshots'
import { 
    deleteContractPopulation,
    updateContractPopulation,
    addNewContractMeasure,
    addNewMeasure,
    deleteContractMeasure
} from './triggers/measure-scorecard/measure-scorecard'

// AGGREGATOR
export const AggregatorCreate: CloudFunction<DocumentSnapshot> = collectionStatAggregatorCreate;
export const AggregatorDelete: CloudFunction<DocumentSnapshot> = collectionStatAggregatorDelete;

// CONTRACT MEASURE HISTORY:
export const AddMeasureHistory: CloudFunction<Change<DocumentSnapshot>> = createMeasureHistory;
export const DeleteStaleHistory: CloudFunction<DocumentSnapshot> = deleteMeasureHistory;

// MEASURE SCORECARD:
export const DeleteContractTrigger: CloudFunction<DocumentSnapshot> = deleteContractPopulation;
export const DeleteContractMeasureTrigger: CloudFunction<DocumentSnapshot> = deleteContractMeasure;
export const UpdateContractTrigger: CloudFunction<Change<DocumentSnapshot>> = updateContractPopulation;
export const AddContractMeasureTrigger: CloudFunction<DocumentSnapshot> = addNewContractMeasure;
export const AddMeasureTrigger: CloudFunction<DocumentSnapshot> = addNewMeasure;

// CREATE DATES
export const AddCreateDate: CloudFunction<DocumentSnapshot> = addCreateDate;

// DELETE TRIGGERS 
export const DeleteMeasureTrigger: CloudFunction<DocumentSnapshot> = onMesureDeleteSync;

// CHANGE TRIGGERS:
export const ChangeMeasureAbbrevTrigger: CloudFunction<Change<DocumentSnapshot>> = onMesureAbbrevChangeSync;

// CONTRACT PERFORMANCE SNAPSHOTS
export const MonthlyCPSnapshot: CloudFunction<{}> = mthlyCpSnapshot;
export const ManualCPSnapshot: HttpsFunction = triggerMeasureHistoryCapture;

// HTTP COLLECTIONS API
export const Contracts: HttpsFunction = contracts.getAllContracts;
export const ContractMeasures: HttpsFunction = contractMeasures.getAllContractMeasures;
export const Measures: HttpsFunction = measures.getAllMeasures;
export const Resources: HttpsFunction = resources.getAllResources;
export const Entities: HttpsFunction = entities.getAllEntities;
export const Providers: HttpsFunction = providers.getAllProviders;
export const Persons: HttpsFunction = people.getAllPersons;
export const Users: HttpsFunction = users.getAllUsers;
export const CollectionStats: HttpsFunction = collectionStats.getAllCollectionStats;
export const MeasureScorecards: HttpsFunction = measureScorecards.getAllMeasureScorecards;

