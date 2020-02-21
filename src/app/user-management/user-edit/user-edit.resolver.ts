import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, ActivatedRoute } from '@angular/router';
import { UserService } from 'app/services/user.service';

@Injectable()
export class UserEditResolver implements Resolve<any> {

    constructor(public firebaseService: UserService) { }

    resolve(route: ActivatedRouteSnapshot) {
        return new Promise((resolve, reject) => {
            const id = route.paramMap.get('id');
            this.firebaseService.getUser(id)
                .subscribe(
                    data => {
                        resolve(data);
                    }
                );
        });
    }
}
