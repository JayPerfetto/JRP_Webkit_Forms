
import { ToastrService } from 'ngx-toastr';
import { Injectable } from '@angular/core';

@Injectable()
export class NGXToastrService {
    constructor(public toastr: ToastrService) { }
    // Success Type
    userSaved() {
        this.toastr.success('User Saved!', 'Success!');
    }

    // Deleted Type
    userDeleted() {
        this.toastr.error('User Deleted.', 'Deleted!');
    }

    // Success Type
    historySaved() {
        this.toastr.success('Measure History Saved!', 'Success!');
    }

    // Deleted Type
    historyDeleted() {
        this.toastr.error('Measure History Deleted.', 'Deleted!');
    }

    // Success Type
    personSaved() {
        this.toastr.success('Person Saved!', 'Success!');
    }

    // Deleted Type
    personDeleted() {
        this.toastr.error('Person Deleted.', 'Deleted!');
    }

    // Success Type
    questionnaireSaved() {
        this.toastr.success('Questionnaire Saved!', 'Success!');
    }

    // Deleted Type
    questionnaireDeleted() {
        this.toastr.error('Questionnaire Deleted.', 'Deleted!');
    }

    // Success Type
    entitySaved() {
        this.toastr.success('Entity Saved!', 'Success!');
    }

    // Deleted Type
    entityDeleted() {
        this.toastr.error('Entity Deleted.', 'Deleted!');
    }

    // Success Type
    contractSaved() {
        this.toastr.success('Contract Saved!', 'Success!');
    }

    // Deleted Type
    contractDeleted() {
        this.toastr.error('Contract Deleted.', 'Deleted!');
    }

    // Success Type
    measureSaved() {
        this.toastr.success('Measure Saved!', 'Success!');
    }

    // Deleted Type
    measureDeleted() {
        this.toastr.error('Measure Deleted.', 'Deleted!');
    }

    // Success Type
    providerSaved() {
        this.toastr.success('Provider Saved!', 'Success!');
    }

    // Deleted Type
    providerDeleted() {
        this.toastr.error('Provider Deleted.', 'Deleted!');
    }


    // Success Type
    typeSuccess() {
        this.toastr.success('You are awesome!', 'Success!');
    }

    // Success Type
    typeInfo() {
        this.toastr.info('We do have the Kapua suite available.', 'Turtle Bay Resort');
    }

    // Success Type
    typeWarning() {
        this.toastr.warning('My name is Inigo Montoya. You killed my father, prepare to die!');
    }

    // Success Type
    typeError() {
        this.toastr.error('I do not think that word means what you think it means.', 'Inconceivable!');
    }

    // Custom Type
    typeCustom() {
        this.toastr.success('<span class="text-danger">Message in red.</span>', null, { enableHtml: true });
    }

    // Progress bar
    progressBar() {
        this.toastr.info('We do have the Kapua suite available.', 'Turtle Bay Resort', { 'progressBar': true });
    }

    // Timeout
    timeout() {
        this.toastr.error('I do not think that word means what you think it means.', 'Timeout!', { 'timeOut': 2000 });
    }


    // Dismiss toastr on Click
    dismissToastOnClick() {
        this.toastr.info('We do have the Kapua suite available.', 'Turtle Bay Resort', { 'tapToDismiss': true });
    }

    // Remove current toasts using animation
    clearToast() {
        this.toastr.clear()
    }

    // Show close button
    showCloseButton() {
        this.toastr.info('Have fun storming the castle!', 'Miracle Max Says', { closeButton: true });
    }

    // Enable  HTML
    enableHtml() {
        this.toastr.info('<i>Have fun <b>storming</b> the castle!</i>', 'Miracle Max Says', { enableHtml: true });
    }

    // Title Class
    titleClass() {
        this.toastr.info('Have fun storming the castle!', 'Miracle Max Says', { titleClass: 'h3' });
    }

    // Message Class
    messageClass() {
        this.toastr.info('Have fun storming the castle!', 'Miracle Max Says', { messageClass: 'text-uppercase' });
    }

}
