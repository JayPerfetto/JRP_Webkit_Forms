import * as functions from 'firebase-functions';
import { db } from '../../global';

export const getAllPersons = functions.https.onRequest(async (req, res) => {
    try {
        const allCollection = await db.collection('Person').get();
        const allData: any[] = [];
        allCollection.forEach((doc: any) => allData.push(doc.data()));
        res.status(200).send(allData);
    } catch (error) {
        res.status(500).send(error);
    }
});