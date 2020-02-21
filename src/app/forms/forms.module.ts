import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FormsRoutingModule } from './forms-routing.module';
import { NgbModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { CustomFormsModule } from 'ng2-validation';
import { MatchHeightModule } from '../shared/directives/match-height.directive';
import { ArchwizardModule } from 'angular-archwizard';

import { QuestionnaireComponent } from './questionnaire/questionnaire.component';
import { MatSlideToggleModule, MatSliderModule } from '@angular/material';
import { ReportSummaryComponent } from './report-summary/report-summary.component';
import { ReportSummaryResolver } from './report-summary/report-summary.resolver';
import { QuestionnaireListComponent } from './questionnaire-list/questionnaire-list.component';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { NgxPaginationModule } from 'ngx-pagination';
import { EditQuestionnaireComponent } from './edit-questionnaire/edit-questionnaire.component';
import { EditQuestionnaireResolver } from './edit-questionnaire/edit-questionnaire.resolver';

@NgModule({
    imports: [
        CommonModule,
        FormsRoutingModule,
        ReactiveFormsModule,
        FormsModule,
        ArchwizardModule,
        CustomFormsModule,
        MatchHeightModule,
        NgbModule,
        MatSlideToggleModule,
        MatSliderModule,
        NgbPaginationModule,
        NgxPaginationModule,

    ],
    declarations: [
        QuestionnaireComponent,
        ReportSummaryComponent,
        QuestionnaireListComponent,
        EditQuestionnaireComponent
    ],
    providers: [
        NGXToastrService,
        ReportSummaryResolver,
        EditQuestionnaireResolver
    ]

})
export class FormModule { }
