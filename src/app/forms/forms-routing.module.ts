import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { QuestionnaireComponent } from './questionnaire/questionnaire.component';
import { ReportSummaryComponent } from './report-summary/report-summary.component';
import { ReportSummaryResolver } from './report-summary/report-summary.resolver';
import { QuestionnaireListComponent } from './questionnaire-list/questionnaire-list.component';
import { EditQuestionnaireComponent } from './edit-questionnaire/edit-questionnaire.component';
import { EditQuestionnaireResolver } from './edit-questionnaire/edit-questionnaire.resolver';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'questionnaire',
        component: QuestionnaireComponent,
        data: {
          title: 'FMV Calculator'
        }
      },
      {
        path: 'questionnaire-list',
        component: QuestionnaireListComponent,
        data: {
          title: 'Past Calculations'
        }
      },
      {
        path: 'edit-questionnaire/:id',
        component: EditQuestionnaireComponent,
        data: {
          title: 'Edit Calculation'
        },
        resolve: { data: EditQuestionnaireResolver }
      },
      {
        path: 'report-summary/:id',
        component: ReportSummaryComponent,
        data: {
          title: 'Report Summary'
        },
        resolve: { data: ReportSummaryResolver }
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FormsRoutingModule { }
