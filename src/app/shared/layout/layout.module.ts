import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ScheduleComponent } from '../../schedule/schedule.component';
import { PermanentClientsComponent } from '../../permanent-clients/permanent-clients.component';
import { LayoutComponent } from './layout.component';
import { AuthGuardService } from '../../authentication/auth-guard.service';

const routes: Routes = [
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

@NgModule({
  imports: [
    // RouterModule.forChild(routes),
  ],
  declarations: []
})
export class LayoutModule {}
