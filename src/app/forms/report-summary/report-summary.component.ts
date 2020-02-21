import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {
  SAMPLE_QUESTIONNAIRE,
  Questionnaire
} from 'app/models/data/Questionnaire';
import { ActivityInformation } from 'app/models/data/ActivityInformation';
import { ActivityTimeInformation } from 'app/models/data/ActivityTimeInformation';
import { OtherConsiderations } from 'app/models/data/OtherConsiderations';
import { ParticipantInformation } from 'app/models/data/ParticipantInformation';
import { RequiredExpertise } from 'app/models/data/RequiredExpertise';
import { TravelInformation } from 'app/models/data/TravelInformation';
import { FairMarketValueInfo } from 'app/models/data/FairMarketValueInfo';
import swal from 'sweetalert2';
import { QuestionnaireService } from 'app/services/questionnaire.service';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { ExportAsService, ExportAsConfig } from 'ngx-export-as';
import { NgbPanelChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import { FMV_RANGES } from 'app/shared/data/constants';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-report-summary',
  templateUrl: './report-summary.component.html',
  styleUrls: ['./report-summary.component.scss']
})
export class ReportSummaryComponent implements OnInit {
  acc: any;
  config: ExportAsConfig = {
    type: 'pdf',
    elementId: 'page',
    options: {
        pagebreak: { mode: 'avoid-all' },
        html2canvas:  { scale: 6 },
    }
  };
  pngConfig: ExportAsConfig = {
    type: 'png',
    elementId: 'page',
    options: {
        pagebreak: { mode: 'avoid-all' },
        html2canvas:  { scale: 6 },
    }
  };
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
    private route: ActivatedRoute,
    private questionnaireService: QuestionnaireService,
    private toaster: NGXToastrService,
    private exportAsService: ExportAsService,
    private spinner: NgxSpinnerService,
  ) {}

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
      }
    });
  }

  export() {
    this.spinner.show();
    this.exportAsService
      .save(this.config, `Export_Calculation_${this.questionnaire.id}`)
      .subscribe(() => {
        setTimeout(() => {
            this.spinner.hide();
        }, 1000);
      });
  }

  exportToPng() {
    this.spinner.show();
    this.exportAsService
      .save(this.pngConfig, `Export_Calculation_${this.questionnaire.id}`)
      .subscribe(() => {
        setTimeout(() => {
            this.spinner.hide();
        }, 1000);
    });
  }

  backToList() {
    this.router.navigate(['/forms/questionnaire-list']);
  }

  submitNew() {
    this.router.navigate(['/forms/questionnaire']);
  }

  modify() {
    this.router.navigate([`/forms/edit-questionnaire/${this.questionnaire.id}`]);
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
}
