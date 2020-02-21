import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'app/services/user.service';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import swal from 'sweetalert2';
import { User } from 'app/models/data/User';

@Component({
    selector: 'app-user-edit',
    templateUrl: './user-edit.component.html',
    styleUrls: ['./user-edit.component.scss']
})

export class UserEditComponent implements OnInit {
    @ViewChild('f', { static: false }) floatingLabelForm: NgForm;
    @ViewChild('vform', { static: false }) validationForm: FormGroup;

    regularForm: FormGroup;
    item: User;
    documentId: string;

    constructor(
        public firebaseService: UserService,
        private route: ActivatedRoute,
        private fb: FormBuilder,
        private router: Router,
        private toaster: NGXToastrService,
    ) { }

    ngOnInit() {
        this.route.data.subscribe(routeData => {
            const data = routeData.data;
            if (data) {
                this.item = data.payload.data();
                this.documentId = data.payload.id;
                this.createForm();
            }
        });
    }

    createForm() {
        this.regularForm = this.fb.group({
            admin: [this.item.roles.admin, null],
        });
    }

    adminChanged(event) {
        this.item.roles.admin = event.checked;
    }

    onReactiveFormSubmit(value) {
        swal.fire({
            title: 'Are you sure?',
            text: 'Do you want to save this user?',
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#0CC27E',
            cancelButtonColor: '#FF586B',
            confirmButtonText: 'Yes, save changes!',
            cancelButtonText: 'No, go back!',
            confirmButtonClass: 'btn btn-success btn-raised mr-5',
            cancelButtonClass: 'btn btn-danger btn-raised',
            buttonsStyling: false
        }).then((result) => {
            if (result.value) {
                this.firebaseService.updateUser(this.documentId, this.item)
                    .then(
                        res => {
                            this.toaster.userSaved();
                            this.router.navigate(['users/user-list']);
                        }
                    );
            }
        });
    }

    delete() {
        swal.fire({
            title: 'Are you sure you want to delete this user?',
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
        }).then((result) => {
            if (result.value) {
                this.firebaseService.deleteUser(this.documentId)
                    .then(
                        res => {
                            this.toaster.userDeleted();
                            this.router.navigate(['users/user-list']);
                        },
                        err => {
                            console.log(err);
                        }
                    );
            }
        });
    }

    cancel() {
        swal.fire({
            title: 'Go Back?',
            text: 'You may lose any unsaved changes!',
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#0CC27E',
            cancelButtonColor: '#FF586B',
            confirmButtonText: 'Yes, discard changes!',
            cancelButtonText: 'No, go back!',
            confirmButtonClass: 'btn btn-success btn-raised mr-5',
            cancelButtonClass: 'btn btn-danger btn-raised',
            buttonsStyling: false
        }).then((result) => {
            if (result.value) {
                this.router.navigate(['users/user-list']);
            }
        });
    }
}
