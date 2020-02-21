import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserListComponent } from './user-list/user-list.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { UserEditResolver } from './user-edit/user-edit.resolver';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'user-list',
        component: UserListComponent,
        data: {
          title: 'User Management'
        }
      },
      {
        path: 'edit/:id',
        component: UserEditComponent,
        data: {
          title: 'Edit User'
        },
        resolve: { data: UserEditResolver }
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserManagementRoutingModule { }
