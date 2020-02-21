import * as functions from 'firebase-functions';
import { db } from '../../global';

export const getAllContracts = functions.https.onRequest(async (req, res) => {
    try {
        const allCollection = await db.collection('Contract').get();
        const allContractMeasures = await db.collection('ContractMeasures').get();

        const allContracts: any[] = [];
        const allMeasures: any[] = [];

        allContractMeasures.forEach((doc: any) => {
            allMeasures.push(doc.data())
        });

        allCollection.forEach((doc: any) => {
            const c = doc.data();
            const totalPotentialPoints: any[] = [];
            c.totalPotentialPoints = totalPotentialPoints;
            c.measures = allMeasures.filter(m => m.contractAbbreviation === c.contractID);
            c.measures.forEach((m: any) => {
                if (c.goalNames) {
                    for (let i = 0; i < c.goalNames.length; i++) {
                        if (c.goalNames[i].totalPotentialPoints) {
                            c.goalNames[i].totalPotentialPoints += m.measureWeight[i]
                        } else {
                            const goalName = c.goalNames[i];
                            c.goalNames[i] = {
                                goal: goalName,
                                totalPotentialPoints: m.measureWeight[i]
                            }
                        }
                    }
                }
            });
            allContracts.push(c);
        });

        res.status(200).send(allContracts);
    } catch (error) {
        res.status(500).send(error);
    }
});
