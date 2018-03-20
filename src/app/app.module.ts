import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutes } from './app.routing';
import { AuthGuardService } from './authentication/auth-guard.service';
import { AuthenticationModule } from './authentication/authentication.module';

import { AppComponent } from './app.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { FooterComponent } from './shared/footer/footer.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ScheduleModule } from './schedule/schedule.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ModalModule } from 'ngx-bootstrap/modal';
import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';
import { AuthNotGuardService } from './authentication/auth-not-guard.service';
import { PermanentClientsModule } from './permanent-clients/permanent-clients.module';
import { LayoutModule } from './shared/layout/layout.module';
import { LayoutComponent } from './shared/layout/layout.component';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    FooterComponent,
    NavbarComponent,
    LayoutComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(AppRoutes),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxDatatableModule,
    ModalModule.forRoot(),
    LoadingBarHttpClientModule,
    AuthenticationModule,
    LayoutModule,
    ScheduleModule,
    PermanentClientsModule,
  ],
  providers: [
    AuthGuardService,
    AuthNotGuardService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
