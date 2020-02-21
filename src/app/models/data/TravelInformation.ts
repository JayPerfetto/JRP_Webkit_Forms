export interface TravelInformation {
    expectedTravelHours?: number;
    caregiverMustAccompany?: boolean;
    travelsWithAnimal?: boolean;
    additionalDaysNeeded?: boolean;
    hasMedicalEquipment?: boolean;
    specialDietaryNeeds?: boolean;
    restBreaksNeeded?: boolean;
    otherSpecial?: boolean;
    otherSpecialText?: string;
    milage?: string;
    tolls?: string;
    parking?: string;
    trainplane?: string;
    hotel?: string;
    incidental?: string;
    estimatedExpenses?: string;
}
