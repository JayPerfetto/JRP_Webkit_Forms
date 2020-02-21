import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import swal from 'sweetalert2';
import { NgbPaginationConfig } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from 'app/services/user.service';

@Component({
    selector: 'app-user-list',
    templateUrl: './user-list.component.html',
    styleUrls: ['./user-list.component.scss']
})

export class UserListComponent implements OnInit {
  items: Array<any>;
  page = 1;
  pageSize = 10;

  constructor(
    public firebaseService: UserService,
    private router: Router,
    private toaster: NGXToastrService,
    config: NgbPaginationConfig
  ) {
    config.boundaryLinks = true;
  }

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.firebaseService.getUsers().subscribe(result => {
      this.items = result;
    });
  }

  viewDetails(item) {
    this.router.navigate(['users/edit/' + item.payload.doc.id]);
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
          this.firebaseService.deleteUser(id).then(
            res => {
              this.toaster.userDeleted();
            },
            err => {
              console.log(err);
            }
          );
        }
      });
  }
}


