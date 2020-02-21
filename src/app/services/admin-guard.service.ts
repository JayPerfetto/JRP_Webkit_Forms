import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { User } from 'app/models/data/User';
import { Observable } from 'rxjs';
import { tap, map, take } from 'rxjs/operators';
import { AuthService } from 'app/shared/auth/auth.service';

@Injectable({
    providedIn: 'root'
})

export class AdminGuard implements CanActivate {
    user: User;

    constructor(private auth: AuthService, private router: Router) {
        this.auth.user$.subscribe((u: User) => {
             this.user = u;
        });
    }

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        return this.auth.user$.pipe(
            take(1),
            map(user => user.roles.admin),
            tap(isAdmin => {
              if (!isAdmin) {
                this.router.navigate(['/pages/error']);
              }
          })
     );
    }
}
