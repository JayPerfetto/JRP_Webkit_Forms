import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserListComponent } from './user-list/user-list.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { MatchHeightModule } from 'app/shared/directives/match-height.directive';
import { NgbModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { MatSlideToggleModule, MatSliderModule } from '@angular/material';
import { NgxPaginationModule } from 'ngx-pagination';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { ReportSummaryResolver } from 'app/forms/report-summary/report-summary.resolver';
import { UserManagementRoutingModule } from './user-management-routing.module';
import { UserEditResolver } from './user-edit/user-edit.resolver';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
    declarations: [UserListComponent, UserEditComponent],
    imports: [
        CommonModule,
        UserManagementRoutingModule,
        MatchHeightModule,
        NgbModule,
        MatSlideToggleModule,
        MatSliderModule,
        NgbPaginationModule,
        NgxPaginationModule,
        ReactiveFormsModule,
    ],
    providers: [
        NGXToastrService,
        UserEditResolver
    ]
})
export class UserManagementModule { }
