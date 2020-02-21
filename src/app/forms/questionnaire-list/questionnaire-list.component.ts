import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import swal from 'sweetalert2';
import { NgbPaginationConfig } from '@ng-bootstrap/ng-bootstrap';
import { QuestionnaireService } from 'app/services/questionnaire.service';
import { AuthService } from 'app/shared/auth/auth.service';
import { User } from 'app/models/data/User';
import { Questionnaire } from 'app/models/data/Questionnaire';

@Component({
    selector: 'app-questionnaire-list',
    templateUrl: './questionnaire-list.component.html',
    styleUrls: ['./questionnaire-list.component.scss']
})

export class QuestionnaireListComponent implements OnInit {
  currentUser: User;
  searchValue = '';
  items: Array<any>;
  nameFilteredItems: Array<any>;
  page = 1;
  pageSize = 10;
  filter;
  isAdmin = false;

  constructor(
    public firebaseService: QuestionnaireService,
    private router: Router,
    private toaster: NGXToastrService,
    config: NgbPaginationConfig,
    private auth: AuthService
  ) {
    config.boundaryLinks = true;
    this.auth.user$.subscribe((u: User) => {
        this.isAdmin = u.roles.admin;
        this.currentUser = u;
    });
  }

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.firebaseService.getQuestionnaires().subscribe(result => {
      this.items = result;
    });
  }

  viewDetails(item) {
    const questionnaire: Questionnaire = item.payload.doc.data();
    if (this.isAdmin || questionnaire.createUser.uid === this.currentUser.uid) {
        this.router.navigate(['forms/report-summary/' + item.payload.doc.id]);
    } else {
        swal.fire('Uh oh!', 'You are not authorized to view this document!', 'error');
    }
  }

  editCalculation(item) {
    const questionnaire: Questionnaire = item.payload.doc.data();
    if (this.isAdmin || questionnaire.createUser.uid === this.currentUser.uid) {
        this.router.navigate(['forms/edit-questionnaire/' + item.payload.doc.id]);
    } else {
        swal.fire('Uh oh!', 'You are not authorized to view this document!', 'error');
    }
  }

  createQuestionnaire() {
    this.router.navigate(['forms/questionnaire/']);
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
          this.firebaseService.deleteQuestionnaire(id).then(
            res => {
              this.toaster.questionnaireDeleted();
            },
            err => {
              console.log(err);
            }
          );
        }
      });
  }
}

