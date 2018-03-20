import { Routes } from '@angular/router';

import { AuthGuardService } from './authentication/auth-guard.service';
import { LayoutComponent } from './shared/layout/layout.component';
import { AuthenticationComponent } from './authentication/authentication.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { AuthNotGuardService } from './authentication/auth-not-guard.service';
import { PermanentClientsComponent } from './permanent-clients/permanent-clients.component';

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
      {path: 'schedule', component: ScheduleComponent},
      {path: 'permanent-clients', component: PermanentClientsComponent},
      {path: '**', redirectTo: 'schedule', pathMatch: 'full'},
    ]
  },
  {path: '**', redirectTo: '', pathMatch: 'full'}
];
