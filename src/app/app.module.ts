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
import { LayoutComponent } from './shared/layout/layout.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ScheduleModule } from './schedule/schedule.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ModalModule } from 'ngx-bootstrap/modal';
import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';
import { AuthNotGuardService } from './authentication/auth-not-guard.service';

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
    ScheduleModule,
  ],
  providers: [
    AuthGuardService,
    AuthNotGuardService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
