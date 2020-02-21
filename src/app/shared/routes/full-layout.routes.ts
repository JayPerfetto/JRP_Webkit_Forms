import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../auth/auth-guard.service';
import { AdminGuard } from 'app/services/admin-guard.service';

// Route for content layout with sidebar, navbar and footer.

export const Full_ROUTES: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    loadChildren: () => import('../../dashboard/dashboard.module').then(m => m.DashboardModule),
  },
  {
    path: 'forms',
    canActivate: [AuthGuard],
    loadChildren: () => import('../../forms/forms.module').then(m => m.FormModule)
  },
  {
    path: 'users',
    canActivate: [AuthGuard, AdminGuard],
    loadChildren: () => import('../../user-management/user-management.module').then(m => m.UserManagementModule)
  },
  {
    path: 'components',
    canActivate: [AuthGuard],
    loadChildren: () => import('../../components/ui-components.module').then(m => m.UIComponentsModule)
  },
];
