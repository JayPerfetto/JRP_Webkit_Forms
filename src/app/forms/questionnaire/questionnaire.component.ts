import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, NgForm, FormBuilder } from '@angular/forms';
import { PARTICIPANT_TYPES, SUBTYPES, ACTIVITIES } from 'app/shared/dropdown-options/participant-types';
import swal from 'sweetalert2';
import { Router } from '@angular/router';
import { Questionnaire, SAMPLE_QUESTIONNAIRE } from 'app/models/data/Questionnaire';
import { QuestionnaireService } from 'app/services/questionnaire.service';
import {
    FMV_RANGES,
    PERCENTAGE_RANGES,
    EXPERTISE_OPTIONS,
    PGR_ATTRIBUTES,
    MODIFIERS,
    TRAVEL_REQUIREMENTS,
    INTERACTION_MODES
} from 'app/shared/data/constants';
import { ActivityTimeDetails } from 'app/models/data/ActivityTimeInformation';

@Component({
    selector: 'app-questionnaire',
    templateUrl: './questionnaire.component.html',
    styleUrls: ['./questionnaire.component.scss']
})

export class QuestionnaireComponent implements OnInit {
    allParticipantTypes = PARTICIPANT_TYPES;
    allParticipantSubTypes = SUBTYPES;
    totalHours = {};
    percentages = PERCENTAGE_RANGES;
    activities = ACTIVITIES;
    expertiseOptions = EXPERTISE_OPTIONS;
    pgrAttributes = PGR_ATTRIBUTES;
    modifiers = MODIFIERS;
    travelRequirements = TRAVEL_REQUIREMENTS;
    interactionModes = INTERACTION_MODES;
    otherSelected;
    participantTypeSelected;
    otherSpecialSelected;
    otherSpecialChecked = false;
    patientGroupRepSelected = false;
    questionnaire: Questionnaire = SAMPLE_QUESTIONNAIRE;

    constructor(
        private router: Router,
        public questionnaireService: QuestionnaireService,
    ) { }

    ngOnInit() { }

    onCompensationChange(event) {
        this.questionnaire.fairMarketValueInfo.travelTimeHourlyRatePercent = event.target.selectedOptions[0].text;
    }

    setActivitiesForType() {
        this.activities = ACTIVITIES;
        this.activities.forEach((a, i) => {
            const timeInfo: ActivityTimeDetails = {
                activityName: a.id,
                activityDisplayName: a.name,
                prep: 0,
                activity: 0,
                post: 0,
                travel: 0,
                eventNumber: 0,
                totalTime: 0
            };
            this.questionnaire.activityTimeInformation.activityTimeRequirements.push(timeInfo);
        });
    }

    onParticipantTypeChange(event) {
        if (this.questionnaire.participantInformation.participantType &&
            this.questionnaire.participantInformation.participantType !== 'Patient Group Representative'
        && event.target.selectedOptions[0].text === 'Patient Group Representative') {
            swal
            .fire({
                title: 'Are you sure?',
                text: 'Selecting this will reset your activity time responses!',
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#0CC27E',
                cancelButtonColor: '#FF586B',
                confirmButtonText: 'Yes, proceed with selection!',
                cancelButtonText: 'No, cancel!',
                confirmButtonClass: 'btn btn-success btn-raised mr-5',
                cancelButtonClass: 'btn btn-danger btn-raised',
                buttonsStyling: false
            })
            .then(result => {
                console.log(result);
                if (result.value) {
                    this.participantTypeSelected = true;
                    this.questionnaire.participantInformation.participantType = event.target.selectedOptions[0].text;
                    this.questionnaire.participantInformation.subtype = 'N/A';
                    this.patientGroupRepSelected = true;
                    this.setActivitiesForType();
                }
            });
        } else if (this.questionnaire.participantInformation.participantType &&
            this.questionnaire.participantInformation.participantType === 'Patient Group Representative'
            && event.target.selectedOptions[0].text !== 'Patient Group Representative') {
                swal
                .fire({
                    title: 'Are you sure?',
                    text: 'Selecting this will reset your activity time responses!',
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#0CC27E',
                    cancelButtonColor: '#FF586B',
                    confirmButtonText: 'Yes, proceed with selection!',
                    cancelButtonText: 'No, cancel!',
                    confirmButtonClass: 'btn btn-success btn-raised mr-5',
                    cancelButtonClass: 'btn btn-danger btn-raised',
                    buttonsStyling: false
                })
                .then(result => {
                    if (result.value) {
                        this.participantTypeSelected = true;
                        this.questionnaire.participantInformation.participantType = event.target.selectedOptions[0].text;
                        this.questionnaire.participantInformation.subtype = 'N/A';
                        this.patientGroupRepSelected = false;
                        this.setActivitiesForType();
                    }
                });
        } else {
            this.questionnaire.participantInformation.participantType = event.target.selectedOptions[0].text;
            this.questionnaire.participantInformation.subtype = 'N/A';
            this.patientGroupRepSelected = false;
            this.participantTypeSelected = true;
            this.setActivitiesForType();
        }
    }

    onParticipantSubTypeChange(event) {
        this.questionnaire.participantInformation.subtype = event.target.selectedOptions[0].text;
    }

    onOtherTravelInfoChange(event) {
        this.questionnaire.travelInformation.estimatedExpenses = '';

        if (event.target.type === 'number') {
            this.questionnaire.travelInformation[event.target.name] = event.target.valueAsNumber || 0;
        } else {
            this.questionnaire.travelInformation[event.target.name] = event.target.value;
        }

        for (const prop in this.questionnaire.travelInformation) {
            if (Object.prototype.hasOwnProperty.call(this.questionnaire.travelInformation, prop)) {
                if (!isNaN(this.questionnaire.travelInformation[prop]) && prop !== 'estimatedExpenses') {
                    this.questionnaire.travelInformation.estimatedExpenses += Number(this.questionnaire.travelInformation[prop]) || 0;
                }
            }
        }
    }

    onOtherInteractionTextChange(event) {
        this.questionnaire.activityInformation.otherText = event.target.value;
    }

    onActivityTimeChange(event) {
        const split = event.target.name.split('_');
        const value = event.target.valueAsNumber;
        for (let i = 0; i < this.questionnaire.activityTimeInformation.activityTimeRequirements.length; i++) {
            if (this.questionnaire.activityTimeInformation.activityTimeRequirements[i].activityName === split[0]) {
                for (const prop in this.questionnaire.activityTimeInformation.activityTimeRequirements[i]) {
                    if (Object.prototype.hasOwnProperty.call(this.questionnaire.activityTimeInformation.activityTimeRequirements[i], prop)) {
                        if (prop === split[1]) {
                            this.questionnaire.activityTimeInformation.activityTimeRequirements[i].activityName = split[0];
                            this.questionnaire.activityTimeInformation.activityTimeRequirements[i].activityDisplayName = this.activities
                            .filter(act => {
                                return act.id === split[0];
                            })[0].name;
                            this.questionnaire.activityTimeInformation.activityTimeRequirements[i][split[1]] = Number(value) || 0;
                        }
                    }
                }

                this.questionnaire.activityTimeInformation.activityTimeRequirements[i].totalTime = 0;

                for (const prop in this.questionnaire.activityTimeInformation.activityTimeRequirements[i]) {
                    if (Object.prototype.hasOwnProperty.call(this.questionnaire.activityTimeInformation.activityTimeRequirements[i], prop)) {
                        if (prop !== 'activityName' && prop !== 'activityDisplayName' && prop !== 'totalTime') {
                            this.questionnaire.activityTimeInformation.activityTimeRequirements[i].totalTime += this.questionnaire.activityTimeInformation.activityTimeRequirements[i][prop];
                        }
                    }
                }

                this.totalHours[split[0]] = this.questionnaire.activityTimeInformation.activityTimeRequirements[i].totalTime;
            }
        }
    }

    onPrepDescriptionChange(event) {
        this.questionnaire.activityTimeInformation.prepDescription = event.target.value;
    }

    onPostEngagementDescriptionChange(event) {
        this.questionnaire.activityTimeInformation.postEngagementDescription = event.target.value;
    }

    onOtherTravelTextChange(event) {
        this.questionnaire.travelInformation.otherSpecialText = event.target.value;
    }

    onExpertiseChange(event) {
        if (this.questionnaire.requiredExpertise[event.target.name]) {
            this.questionnaire.requiredExpertise[event.target.name] = !this.questionnaire.requiredExpertise[event.target.name];
        } else {
            this.questionnaire.requiredExpertise[event.target.name] = true;
        }
    }

    onPgrAttributeChange(event) {
        if (this.questionnaire.participantInformation[event.target.name]) {
            this.questionnaire.participantInformation[event.target.name] = !this.questionnaire.participantInformation[event.target.name];
        } else {
            this.questionnaire.participantInformation[event.target.name] = true;
        }
    }

    onTravelRequirementsChange(event) {
        this.otherSpecialSelected = event.target.name;
        this.otherSpecialChecked = event.target.checked;
        if (this.questionnaire.travelInformation[event.target.name]) {
            this.questionnaire.travelInformation[event.target.name] = !this.questionnaire.travelInformation[event.target.name];
        } else {
            this.questionnaire.travelInformation[event.target.name] = true;
        }
    }

    onModifiersChange(event) {
        if (this.questionnaire.otherConsiderations[event.target.name]) {
            this.questionnaire.otherConsiderations[event.target.name] = !this.questionnaire.otherConsiderations[event.target.name];
        } else {
            this.questionnaire.otherConsiderations[event.target.name] = true;
        }
    }

    handleInteractionChange(event) {
        this.otherSelected = event.target.value;
        for (const prop in this.questionnaire.activityInformation) {
            if (Object.prototype.hasOwnProperty.call(this.questionnaire.activityInformation, prop)) {
                if (prop === event.target.value) {
                    this.questionnaire.activityInformation[prop] = true;
                } else {
                    this.questionnaire.activityInformation[prop] = false;
                }
            }
        }
    }

    handleAccommodationChange(event) {
        this.otherSpecialSelected = event.target.value;
        for (const prop in this.questionnaire.travelInformation) {
            if (Object.prototype.hasOwnProperty.call(this.questionnaire.travelInformation, prop)) {
                if (isNaN(this.questionnaire.travelInformation[prop]) && prop !== 'estimatedExpenses') {
                    if (prop === event.target.value) {
                        this.questionnaire.activityInformation[prop] = true;
                    } else {
                        this.questionnaire.activityInformation[prop] = false;
                    }
                }
            }
        }
    }

    handleSubmit() {
        console.log(this.questionnaire);
        this.questionnaireService.createQuestionnaire(this.questionnaire)
        .then(r => {
            if (r.id) {
                swal.fire('Success!', 'Your responses have been saved. Continue to view your report.', 'success')
                .then(result => {
                    if (result.value) {
                        this.router.navigate([`forms/report-summary/${r.id}`]);
                    }
                });
            } else {
                swal.fire('Uh oh!', 'There was an issue saving your responses. Please try again.', 'error');
            }
        });

    }
}
