import * as functions from 'firebase-functions';
import { admin, db } from '../../global';
import { MeasureScorecard, Rating } from '../../models/measure-scorecard/measureScorecard';

// TESTED AND WORKING
export const addNewContractMeasure = functions.firestore
    .document('ContractMeasures/{docId}')
    .onCreate(async (snap, context) => {
        const scorecardData: any[] = [];
        const cm = snap.data();
        if (cm) {
            const scoreCardsRef = db.collection('MeasureScorecard');
            const snapshot = await scoreCardsRef.where('masterAbbreviation', '==', cm.masterAbbreviation).get()
            if (snapshot.empty) {
                console.log('No matching scorecards.');
                return;
            }

            snapshot.forEach((doc: any) => {
                scorecardData.push({ id: doc.id, ...doc.data() });
            });

            const allContracts: any[] = [];
            const contractSnapshots = await db.collection('Contract').where('contractID', '==', cm.contractAbbreviation).get();
            contractSnapshots.forEach((doc: any) => allContracts.push({id: doc.id, ...doc.data()}));
            if (!contractSnapshots.empty) {
                const contract = allContracts[0];
                const scoreCard = scorecardData[0];

                if (!scoreCard.contractsWithMeasure.includes(contract.id)) {
                    scoreCard.contractsWithMeasure.push(contract.id);
                    scoreCard.contractsAffected++;
                    scoreCard.memberCount += contract.populationSize;

                    const scoreCardRef = await db.collection('MeasureScorecard').doc(scoreCard.id);

                    // Update scorecard for measure
                    scoreCardRef.set(scoreCard, { merge: true });
                    // TODO: increment potentialRevenuePmpy, measureScore, and scoreContracts values
                }
            }
        }
    });

// TESTED AND WORKING
export const addNewMeasure = functions.firestore
    .document('Measure/{docId}')
    .onCreate(async (snap, context) => {
        const m = snap.data();
        if (m) {
            const scoreCardRef = await db.collection('MeasureScorecard').doc();
            let scoreCard: MeasureScorecard;
            scoreCard = {
                measure: m.measure,
                masterAbbreviation: m.masterAbbreviation,
                memberCount: 0,
                contractsWithMeasure: [],
                potentialRevenuePmpy: 0,
                scoreContracts: [],
                measureScore: 0,
            }

            scoreCard.scoreContracts = BASE_SCORE_CONTRACTS;
    
            const batch = db.batch();
            batch.set(scoreCardRef, scoreCard);
            batch.commit()
                .catch((error: any) => console.log(error));
        }
    });

// TESTED AND WORKING
export const updateContractPopulation = functions.firestore
    .document('Contract/{docId}')
    .onUpdate(async (snap, context) => {
        const contractMeasures: any[] = [];
        const newContract = snap.after.data();
        const oldContract = snap.before.data(); 

        if (newContract && oldContract) {
            if ((Number(newContract.populationSize) - Number(oldContract.populationSize)) !== 0) {
                // Get all Contract Meaures for this Contract:
                const allContractMeasuresRef = await db.collection('ContractMeasures');
                const cmSnaps = await allContractMeasuresRef.where('contractAbbreviation', '==', newContract.contractID).get()
                if (cmSnaps.empty) {
                    console.log('No matching contract measures.');
                    return;
                }
                cmSnaps.forEach((doc: any) => {
                    contractMeasures.push({ id: doc.id, ...doc.data() });
                });

                const populationDifference = Number(newContract.populationSize) - Number(oldContract.populationSize)

                // Update each contract measure scorecard
                contractMeasures.forEach(async (cm: any) => {
                    // Get Scorecard for Measure:
                    const scorecardData: any[] = [];
                    const scorecardRef = db.collection('MeasureScorecard');
                    const snapshot = await scorecardRef.where('masterAbbreviation', '==', cm.masterAbbreviation).get()
                    if (snapshot.empty) {
                        console.log('No matching scorecards for ' + cm.masterAbbreviation);
                        return;
                    }  
                
                    snapshot.forEach((doc: any) => {
                        scorecardData.push({ id: doc.id, ...doc.data() });
                    });

                    const scoreCard = scorecardData[0];

                    const scoreCardRef = await db.collection('MeasureScorecard').doc(scoreCard.id);
                    scoreCard.memberCount += populationDifference;
                    scoreCard.updatedAt = admin.firestore.FieldValue.serverTimestamp();

                    scoreCardRef.set(scoreCard, { merge: true });
                });
            }
        }
    });

// TESTED AND WORKING
export const deleteContractPopulation = functions.firestore
    .document('Contract/{docId}')
    .onDelete(async (snap, context) => {
        const contract: any = { id: snap.id, ...snap.data()};
        const contractMeasures: any = [];

        if (contract) {
            const allContractMeasuresRef = await db.collection('ContractMeasures');
            const cmSnaps = await allContractMeasuresRef.where('contractAbbreviation', '==', contract.contractID).get()
            if (cmSnaps.empty) {
                console.log('No matching contract measures.');
                return;
            }
            cmSnaps.forEach((doc: any) => {
                contractMeasures.push({ id: doc.id, ...doc.data() });
            });

            contractMeasures.forEach(async (cm: any) => {
                const batch = db.batch();

                // Get Scorecard for Measure:
                const scorecardData: any[] = [];
                const scorecardRef = db.collection('MeasureScorecard');
                const snapshot = await scorecardRef.where('masterAbbreviation', '==', cm.masterAbbreviation).get()
                if (snapshot.empty) {
                    console.log('No matching scorecards for ' + cm.masterAbbreviation);
                    return;
                }  

                snapshot.forEach((doc: any) => {
                    scorecardData.push({ id: doc.id, ...doc.data() });
                });

                const scoreCard = scorecardData[0];


                const scoreCardRef = await db.collection('MeasureScorecard').doc(scoreCard.id);
                scoreCard.memberCount -= contract.populationSize;
                scoreCard.contractsWithMeasure.splice(scoreCard.contractsWithMeasure.indexOf(contract.id), 1);
                scoreCard.contractsAffected--;
                scoreCard.updatedAt = admin.firestore.FieldValue.serverTimestamp();
                batch.set(scoreCardRef, scoreCard, { merge: true });

                // Delete all contract measures for contract once scorecard is updated
                batch.delete(db.collection(`ContractMeasures`).doc(`${cm.id}`));

                return batch.commit().then(() => console.log("batch completed - deleted contract " + contract.contractID));

            });
        }
    });

// TESTED AND WORKING
export const deleteContractMeasure = functions.firestore
    .document('ContractMeasures/{docId}')
    .onDelete(async (snap, context) => {
        const cm = snap.data();
        if (cm) {
            // Get Scorecard for Measure:
            const scorecardData: any[] = [];
            const scorecardRef = db.collection('MeasureScorecard');
            const snapshot = await scorecardRef.where('masterAbbreviation', '==', cm.masterAbbreviation).get()
            if (snapshot.empty) {
                console.log('No matching scorecards for ' + cm.masterAbbreviation);
                return;
            }  

            snapshot.forEach((doc: any) => {
                scorecardData.push(doc.data());
            });

            const scoreCard = scorecardData[0];

            const scoreCardRef = await db.collection('MeasureScorecard').doc(scoreCard.id);
            const allContracts: any[] = [];
            const allContractsSnaps = await db.collection('Contract').where('contractID', '==', cm.contractAbbreviation).get();
            
            if (allContractsSnaps.empty) {
                console.log('No matching documents.');
                return;
            }  
        
            allContractsSnaps.forEach((doc: any) => {
                allContracts.push({id: doc.id, ...doc.data()});
            });

            const contract = allContracts[0];
            const populationSize = contract.populationSize ? contract.populationSize : 0;
            
            scoreCard.memberCount -= populationSize;
            scoreCard.contractsWithMeasure.splice(scoreCard.contractsWithMeasure.indexOf(contract.id), 1);
            scoreCard.contractsAffected--;
            scoreCard.updatedAt = admin.firestore.FieldValue.serverTimestamp();
            
            scoreCardRef.set(scoreCard, { merge: true });
        }
    });

const BASE_SCORE_CONTRACTS = [{
    contractName: 'Contracts Affected',
    rating: Rating.High,
    score: 3
},
{
    contractName: 'Revenue Opportunity',
    rating: Rating.High,
    score: 3
},
{
    contractName: 'PMPM Members',
    rating: Rating.High,
    score: 3
},
{
    contractName: 'Past Performance',
    rating: Rating.Med,
    score: 2
},
{
    contractName: 'Attainable Goal',
    rating: Rating.Med,
    score: 2
},
{
    contractName: 'Impact Ability',
    rating: Rating.High,
    score: 3
},
{
    contractName: 'Level of Effort',
    rating: Rating.Med,
    score: 2
},
{
    contractName: 'Resource Availability',
    rating: Rating.Low,
    score: 1
}
];
