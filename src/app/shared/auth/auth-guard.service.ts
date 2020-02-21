import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { environment } from 'environments/environment.nhc';
import { Observable } from 'rxjs';
import { tap, map, take } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { User } from 'app/models/data/User';

@Injectable()
export class AuthGuard implements CanActivate {
    user: User;

  constructor(private auth: AuthService, private router: Router) {
    this.auth.user$.subscribe(user => {
        this.user = user;
    });
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
      return this.auth.user$.pipe(
           take(1),
           map(user => !!user),
           tap(loggedIn => {
             if (!loggedIn) {
               this.router.navigate(['/pages/login']);
             } else if (this.user) {
                //  if (!environment.admins.includes(this.user.uid)) {
                //     this.router.navigate(['/pages/error']);
                //  }
             }
         })
    );
  }
}
