import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'app/shared/auth/auth.service';
import { FirebaseuiAngularLibraryService } from 'firebaseui-angular';
import swal from 'sweetalert2';
import { User } from 'app/models/data/User';
import * as firebase from 'firebase';

@Component({
    selector: 'app-login-page',
    templateUrl: './login-page.component.html',
    styleUrls: ['./login-page.component.scss']
})

export class LoginPageComponent {

    @ViewChild('f', {static: false}) loginForm: NgForm;

    constructor(private router: Router,
        private route: ActivatedRoute,
        public auth: AuthService,
        private firebaseuiAngularLibraryService: FirebaseuiAngularLibraryService
    ) {
        firebaseuiAngularLibraryService.firebaseUiInstance.disableAutoSignIn();
        if (this.auth.user$) {
            this.router.navigate(['/home']);
        }
    }

    successCallback(event) {
        let user: User;
        if (event.authResult.additionalUserInfo.isNewUser) {
            user = {
                uid: event.authResult.user.uid,
                displayName: event.authResult.user.displayName,
                photoURL: event.authResult.user.photoURL,
                email: event.authResult.user.email,
                roles: {
                    admin: event.authResult.user.email === 'jayperfetto@gmail.com' || event.authResult.user.email === 'perfett_jaso@bentley.edu' ? true : false,
                    standard: true
                }
            }
            user.createdAt = new firebase.firestore.Timestamp(
                Math.floor(new Date().getTime() / 1000),
                Math.floor(new Date().getMilliseconds()));
        } else {
            user = {
                uid: event.authResult.user.uid,
                displayName: event.authResult.user.displayName,
                photoURL: event.authResult.user.photoURL,
                email: event.authResult.user.email,
            }
        }

        user.updatedAt = new firebase.firestore.Timestamp(
            Math.floor(new Date().getTime() / 1000),
            Math.floor(new Date().getMilliseconds()));

        this.auth.updateUserData(user).then(result => {
            this.router.navigate(['/']);
        });
    }

    errorCallback(event) {
        swal.fire(
            'Sign-in Failed!',
            'You were not signed in, please try again.',
            'error'
        ).then(() => {
            this.router.navigate(['/pages/login']);
        })
    }

    // On submit button click
    onSubmit() {
        this.loginForm.reset();
    }
    // On Forgot password link click
    onForgotPassword() {
        this.router.navigate(['forgotpassword'], { relativeTo: this.route.parent });
    }
    // On registration link click
    onRegister() {
        this.router.navigate(['register'], { relativeTo: this.route.parent });
    }
}
