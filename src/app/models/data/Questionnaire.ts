import { ActivityInformation } from './ActivityInformation';
import { ActivityTimeInformation } from './ActivityTimeInformation';
import { OtherConsiderations } from './OtherConsiderations';
import { ParticipantInformation } from './ParticipantInformation';
import { RequiredExpertise } from './RequiredExpertise';
import { TravelInformation } from './TravelInformation';
import { FairMarketValueInfo } from './FairMarketValueInfo';
import { Timestamp } from '@firebase/firestore-types';
import { User } from './User';

export interface Questionnaire {
    id?: string;
    createUser?: User;
    updateUser?: User;
    activityInformation?: ActivityInformation;
    activityTimeInformation?: ActivityTimeInformation;
    otherConsiderations?: OtherConsiderations;
    participantInformation?: ParticipantInformation;
    requiredExpertise?: RequiredExpertise;
    travelInformation?: TravelInformation;
    fairMarketValueInfo?: FairMarketValueInfo;
    createdAt?: Timestamp;
    updatedAt?: Timestamp;
}

export let SAMPLE_QUESTIONNAIRE: Questionnaire = {
    activityInformation: {
        inPerson: false,
        telephone: false,
        teleconference: false,
        webMeeting: false,
        electronic: false,
        paperBasedMail: false,
        other: false,
        otherText: ''
    },
    activityTimeInformation: {
        expectedEvents: 0,
        expectedHoursPrep: 0,
        expectedHoursActivity: 0,
        expectedHoursPostActivity: 0,
        activityTimeRequirements: []
    },
    otherConsiderations: {
        riskOrLiability: false,
        wagesLost: false,
        childOrElderNeeded: false,
        organizationSize: false,
        eventTimeHorizon: false,
    },
    participantInformation: {
        participantType: '',
        hasTreatmentExperience: false,
        isPatientRepresentatitve: false,
        hasSeniorLeadership: false,
    },
    requiredExpertise: {
        livingWithRisk: false,
        knowledgeOfCondition: false,
        subjectMatterExpert: false,
        communications: false,
    },
    travelInformation: {
        expectedTravelHours: 0,
        caregiverMustAccompany: false,
        travelsWithAnimal: false,
        additionalDaysNeeded: false,
        hasMedicalEquipment: false,
        specialDietaryNeeds: false,
        restBreaksNeeded: false,
        otherSpecial: false,
        otherSpecialText: '',
        milage: '',
        incidental: '',
        hotel: '',
        trainplane: '',
        parking: '',
        tolls: '',
        estimatedExpenses: ''
    },
    fairMarketValueInfo: {
        expectedHoursOnActivity: 0,
        hoursOnTravel: 0,
        travelTimeHourlyRatePercent: '',
        fmvCompensationTo: 0,
        fmvCompensationFrom: 0
    }
}
