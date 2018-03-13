import { Routes } from '@angular/router';

import { AuthGuardService } from './authentication/auth-guard.service';
import { LayoutComponent } from './shared/layout/layout.component';
import { AuthenticationComponent } from './authentication/authentication.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { AuthNotGuardService } from './authentication/auth-not-guard.service';

export const AppRoutes: Routes = [
  {
    path: 'authentication',
    canActivate: [AuthNotGuardService],
    component: AuthenticationComponent
  },
  {
    path: '',
    canActivate: [AuthGuardService],
    component: LayoutComponent,
    children: [
      {path: '', component: ScheduleComponent},
    ]
  },
  {path: '**', redirectTo: '', pathMatch: 'full'}
];
