export const FMV_RANGES = {
    patientCaregiver: {
        advancedExpert: {
            from: 100,
            to: 205
        },
        expert: {
            from: 80,
            to: 150
        },
        individual: {
            from: 50,
            to: 105
        }
    },
    patientOrg: {
        exec: {
            from: 150,
            to: 350
        },
        nonExec: {
            from: 85,
            to: 150
        }
    }
};

export const PERCENTAGE_RANGES = [
    { value: '0%', display: '0%'},
    { value: '25%', display: '25%'},
    { value: '50% (Recommended)', display: '50% (Recommended)'},
    { value: '75%', display: '75%'},
    { value: '100%', display: '100%'}
];

export const EXPERTISE_OPTIONS = [
    {id: 'livingWithRisk', name: 'Option A'},
    {id: 'knowledgeOfCondition', name: 'Option B'},
    {id: 'subjectMatterExpert', name: 'Option C'},
    {id: 'communications', name: 'Option D'}
];

export const PGR_ATTRIBUTES = [
    {
        id: 'isPatientRepresentatitve',
        name: `Is Patient Group Representative a
        representative for a patient, with a condition
        (can speak to individual/personal treatment
        experiences)?`
    },
    {
        id: 'hasSeniorLeadership',
        name: `Does Patient Group Representatve have experience 
        as a senior leader in a patient organization (e.g., CEO, CMO, VP)`
    },
];

export const MODIFIERS = [
    {id: 'riskOrLiability', name: 'Risk or liability'},
    {id: 'wagesLost', name: 'Wages lost'},
    {id: 'childOrElderNeeded', name: 'Childcare or Eldercare needed'},
    {id: 'organizationSize', name: 'Size of organization'},
    {id: 'eventTimeHorizon', name: 'Event time horizon'}
];

export const TRAVEL_REQUIREMENTS = [
    {id: 'caregiverMustAccompany', name: 'A Caregiver Must Accompany'},
    {id: 'travelsWithAnimal', name: 'Travels with a Service Animal'},
    {id: 'additionalDaysNeeded', name: 'Additional 1 - 2 Days of Travel Needed'},
    {id: 'hasMedicalEquipment', name: 'Accompanying Medical Equipment'},
    {id: 'specialDietaryNeeds', name: 'Special Dietary Requirements'},
    {id: 'restBreaksNeeded', name: 'Rest Breaks Needed'},
    {id: 'otherSpecial', name: 'Other'}
];

export const INTERACTION_MODES = [
    {   id: 'inPerson',
        name: 'In Person',
        def: ''
    },
    {   id: 'telephone',
        name: 'Telephone',
        def: ''
    },
    {   id: 'teleconference',
        name: 'Teleconference / Videoconference',
        def: ''
    },
    {   id: 'webMeeting',
        name: 'Web Meeting',
        def: ''
    },
    {   id: 'electronic',
        name: 'Electronic',
        def: ''
    },
    {   id: 'paperBasedMail',
        name: 'Paper-based / Mail',
        def: ''
    },
    {   id: 'other',
        name: 'Other',
        def: ''
    },
];
