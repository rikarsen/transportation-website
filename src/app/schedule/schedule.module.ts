import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScheduleComponent } from './schedule.component';
import { ScheduleService } from './schedule.service';
import { FileUploadModule } from 'ng2-file-upload';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ScheduleEditComponent } from './modals/schedule-edit/schedule-edit.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FileUploadModule,
    NgxDatatableModule,
    ReactiveFormsModule
  ],
  declarations: [
    ScheduleComponent,
    ScheduleEditComponent
  ],
  providers: [
    ScheduleService
  ],
  entryComponents: [
    ScheduleEditComponent
  ]
})
export class ScheduleModule {}
