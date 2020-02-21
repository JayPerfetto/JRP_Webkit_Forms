import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})

export class FormsHelperService {

    constructor() { }

    findInvalidControls(form) {
        const invalid = [];
        const controls = form.controls;
        for (const name in controls) {
            if (controls[name].invalid) {
                invalid.push(name);
            }
        }
        return invalid;
    }
}
