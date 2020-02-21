import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, ActivatedRoute } from '@angular/router';
import { QuestionnaireService } from 'app/services/questionnaire.service';

@Injectable()
export class EditQuestionnaireResolver implements Resolve<any> {

  constructor(public firebaseService: QuestionnaireService) { }

  resolve(route: ActivatedRouteSnapshot) {

    return new Promise((resolve, reject) => {
      const id = route.paramMap.get('id');
      this.firebaseService.getQuestionnaire(id)
      .subscribe(
        data => {
          resolve(data);
        }
      );
    });
  }
}
