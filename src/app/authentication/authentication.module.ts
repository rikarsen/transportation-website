import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthenticationComponent } from './authentication.component';
import { AuthenticationService } from './authentication.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    AuthenticationComponent
  ],
  providers: [
    AuthenticationService
  ]
})
export class AuthenticationModule {}
