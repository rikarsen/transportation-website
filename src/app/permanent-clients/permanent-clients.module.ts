import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PermanentClientsComponent } from './permanent-clients.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { PermanentClientsService } from './permanent-clients.service';

@NgModule({
  imports: [
    CommonModule,
    NgxDatatableModule
  ],
  declarations: [
    PermanentClientsComponent
  ],
  providers: [
    PermanentClientsService
  ]
})
export class PermanentClientsModule {}
