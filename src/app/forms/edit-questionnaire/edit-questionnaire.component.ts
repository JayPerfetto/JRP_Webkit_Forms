import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators, NgForm, FormBuilder } from '@angular/forms';
import { PARTICIPANT_TYPES, SUBTYPES, ACTIVITIES } from 'app/shared/dropdown-options/participant-types';
import swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
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
import { ActivityInformation } from 'app/models/data/ActivityInformation';
import { ActivityTimeInformation, ActivityTimeDetails } from 'app/models/data/ActivityTimeInformation';
import { OtherConsiderations } from 'app/models/data/OtherConsiderations';
import { ParticipantInformation } from 'app/models/data/ParticipantInformation';
import { RequiredExpertise } from 'app/models/data/RequiredExpertise';
import { TravelInformation } from 'app/models/data/TravelInformation';
import { FairMarketValueInfo } from 'app/models/data/FairMarketValueInfo';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';

@Component({
    selector: 'app-edit-questionnaire',
    templateUrl: './edit-questionnaire.component.html',
    styleUrls: ['./edit-questionnaire.component.scss']
})

export class EditQuestionnaireComponent implements OnInit {
    allParticipantTypes = PARTICIPANT_TYPES;
    allParticipantSubTypes = SUBTYPES;
    totalHours = {};
    percentages = PERCENTAGE_RANGES;
    activities;
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
    questionnaire: Questionnaire;
    activityInformation: ActivityInformation;
    activityTimeInformation: ActivityTimeInformation;
    otherConsiderations: OtherConsiderations;
    participantInformation: ParticipantInformation;
    requiredExpertise: RequiredExpertise;
    travelInformation: TravelInformation;
    fairMarketValueInfo: FairMarketValueInfo;

    constructor(
        private router: Router,
        public questionnaireService: QuestionnaireService,
        private route: ActivatedRoute,
        private toaster: NGXToastrService,
    ) { }

    ngOnInit() {
        this.route.data.subscribe(routeData => {
            const data = routeData.data;
            if (data) {
                this.questionnaire = data.payload.data();
                this.questionnaire.id = data.payload.id;
                this.activityInformation = this.questionnaire.activityInformation;
                this.activityTimeInformation = this.questionnaire.activityTimeInformation;
                this.otherConsiderations = this.questionnaire.otherConsiderations;
                this.participantInformation = this.questionnaire.participantInformation;
                this.requiredExpertise = this.questionnaire.requiredExpertise;
                this.travelInformation = this.questionnaire.travelInformation;
                this.fairMarketValueInfo = this.questionnaire.fairMarketValueInfo;

                this.activities = ACTIVITIES;
            }
        });
    }

    goHome() {
        this.router.navigate(['/']);
    }

    delete(id) {
        swal
            .fire({
                title: 'Are you sure?',
                text: 'You won\'t be able to revert this!',
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#0CC27E',
                cancelButtonColor: '#FF586B',
                confirmButtonText: 'Yes, delete it!',
                cancelButtonText: 'No, cancel!',
                confirmButtonClass: 'btn btn-success btn-raised mr-5',
                cancelButtonClass: 'btn btn-danger btn-raised',
                buttonsStyling: false
            })
            .then(result => {
                if (result.value) {
                    this.questionnaireService.deleteQuestionnaire(id).then(
                        res => {
                            this.toaster.questionnaireDeleted();
                            this.router.navigate(['/home']);
                        },
                        err => {
                            console.log(err);
                        }
                    );
                }
            });
    }

    onCompensationChange(event) {
        this.questionnaire.fairMarketValueInfo.travelTimeHourlyRatePercent = event.target.selectedOptions[0].text;
    }

    onParticipantTypeChange(event) {
        this.participantTypeSelected = true;
        if (this.questionnaire.participantInformation.participantType !== 'Patient Group Representative'
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
                if (result.value) {
                    this.questionnaire.participantInformation.participantType = event.target.selectedOptions[0].text;
                    this.questionnaire.participantInformation.subtype = 'N/A';
                    this.patientGroupRepSelected = true;
                    this.activities = ACTIVITIES;
                    this.resetTimeInfo();
                }
            });
        } else if (this.questionnaire.participantInformation.participantType === 'Patient Group Representative'
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
                        this.questionnaire.participantInformation.participantType = event.target.selectedOptions[0].text;
                        this.questionnaire.participantInformation.subtype = 'N/A';
                        this.patientGroupRepSelected = false;
                        this.activities = ACTIVITIES;
                        this.resetTimeInfo();
                    }
                });
        }
    }

    resetTimeInfo() {
        this.questionnaire.activityTimeInformation.activityTimeRequirements = [];
        this.activities.forEach((activity, i) => {
            const timeDetails: ActivityTimeDetails = {
                activityName: activity.id,
                activityDisplayName: activity.name,
                activity: 0,
                prep: 0,
                post: 0,
                travel: 0,
                eventNumber: 0,
                totalTime: 0
            }
            this.questionnaire.activityTimeInformation.activityTimeRequirements.push(timeDetails);
        });
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
                    if (Object.prototype.hasOwnProperty
                        .call(this.questionnaire.activityTimeInformation.activityTimeRequirements[i], prop)) {
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
                    if (Object.prototype.hasOwnProperty
                        .call(this.questionnaire.activityTimeInformation.activityTimeRequirements[i], prop)) {
                        if (prop !== 'activityName' && prop !== 'activityDisplayName' && prop !== 'totalTime') {
                            this.questionnaire
                                .activityTimeInformation
                                .activityTimeRequirements[i]
                                .totalTime
                            += this.questionnaire
                                .activityTimeInformation
                                .activityTimeRequirements[i][prop];
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

    calculateExpectedHourData() {
        this.questionnaire.activityTimeInformation.expectedHoursPrep = 0;
        this.questionnaire.activityTimeInformation.expectedHoursActivity = 0;
        this.questionnaire.activityTimeInformation.expectedHoursPostActivity = 0;
        this.questionnaire.activityTimeInformation.expectedEvents = 0;
        this.questionnaire.travelInformation.expectedTravelHours = 0;

        this.questionnaire.activityTimeInformation.activityTimeRequirements.forEach(req => {
            this.questionnaire.activityTimeInformation.expectedHoursPrep += req.prep;
            this.questionnaire.activityTimeInformation.expectedHoursActivity += req.activity;
            this.questionnaire.activityTimeInformation.expectedHoursPostActivity += req.post;
            this.questionnaire.activityTimeInformation.expectedEvents += req.eventNumber;
            this.questionnaire.travelInformation.expectedTravelHours += req.travel;
        });

        this.questionnaire.fairMarketValueInfo.expectedHoursOnActivity = this.questionnaire.activityTimeInformation.expectedHoursPrep +
        this.questionnaire.activityTimeInformation.expectedHoursActivity +
        this.questionnaire.activityTimeInformation.expectedHoursPostActivity;

        this.questionnaire.fairMarketValueInfo.hoursOnTravel = this.questionnaire.travelInformation.expectedTravelHours;
    }

    calculateFmvRange() {
        if (!this.patientGroupRepSelected) {
            if (this.questionnaire.participantInformation.hasSeniorLeadership
                && this.questionnaire.participantInformation.hasTreatmentExperience
                && (this.questionnaire.participantInformation.participantType === 'Individual Patient'
                    || this.questionnaire.participantInformation.participantType === 'Individual Caregiver')
            ) {
                this.questionnaire.fairMarketValueInfo.fmvCompensationFrom = FMV_RANGES.patientCaregiver.advancedExpert.from;
                this.questionnaire.fairMarketValueInfo.fmvCompensationTo = FMV_RANGES.patientCaregiver.advancedExpert.to;
            } else if (this.questionnaire.participantInformation.hasTreatmentExperience
                && (this.questionnaire.participantInformation.participantType === 'Individual Patient'
                    || this.questionnaire.participantInformation.participantType === 'Individual Caregiver')
            ) {
                this.questionnaire.fairMarketValueInfo.fmvCompensationFrom = FMV_RANGES.patientCaregiver.expert.from;
                this.questionnaire.fairMarketValueInfo.fmvCompensationTo = FMV_RANGES.patientCaregiver.expert.to;
            } else if (this.questionnaire.participantInformation.participantType === 'Individual Patient'
                || this.questionnaire.participantInformation.participantType === 'Individual Caregiver'
            ) {
                this.questionnaire.fairMarketValueInfo.fmvCompensationFrom = FMV_RANGES.patientCaregiver.individual.from;
                this.questionnaire.fairMarketValueInfo.fmvCompensationTo = FMV_RANGES.patientCaregiver.individual.to;
            }
        } else {
            if (this.questionnaire.participantInformation.hasSeniorLeadership) {
                this.questionnaire.fairMarketValueInfo.fmvCompensationFrom = FMV_RANGES.patientOrg.exec.from;
                this.questionnaire.fairMarketValueInfo.fmvCompensationTo = FMV_RANGES.patientOrg.exec.to;
            } else {
                this.questionnaire.fairMarketValueInfo.fmvCompensationFrom = FMV_RANGES.patientOrg.nonExec.from;
                this.questionnaire.fairMarketValueInfo.fmvCompensationTo = FMV_RANGES.patientOrg.nonExec.to;
            }
        }
    }

    handleSubmit() {
        this.calculateExpectedHourData();
        this.calculateFmvRange();
        this.questionnaireService.updateQuestionnaire(this.questionnaire.id, this.questionnaire)
            .then(r => {
                    swal.fire('Success!', 'Your responses have been saved. Continue to view your report.', 'success')
                        .then(result => {
                            if (result.value) {
                                this.toaster.questionnaireSaved();
                                this.router.navigate([`forms/report-summary/${this.questionnaire.id}`]);
                            }
                        });
            })
            .catch(e => {
                swal.fire('Uh oh!', 'There was an issue saving your responses. Please try again.', 'error');
            });
    }
}
