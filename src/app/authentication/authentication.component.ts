import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from './authentication.service';
import { Router } from '@angular/router';
import { AuthGuardService } from './auth-guard.service';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss']
})
export class AuthenticationComponent implements OnInit {
  public form: FormGroup;
  public processing: boolean;
  private previousUrl: string;

  constructor (private formBuilder: FormBuilder,
               private authService: AuthenticationService,
               private router: Router,
               private authGuard: AuthGuardService) {
    this.processing = false;

    this.createAuthForm();
  }

  ngOnInit () {
    if (this.authGuard.redirectUrl) {
      this.previousUrl = this.authGuard.redirectUrl;
      this.authGuard.redirectUrl = undefined;
    }
  }

  createAuthForm () {
    this.form = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onLoginSubmit () {
    this.processing = true;

    const user = {
      email: this.form.get('email').value,
      password: this.form.get('password').value
    };

    this.authService.login(user)
      .subscribe((data: any) => {
        if (!data.success) {
          this.processing = false;
        } else {
          this.authService.storeUserData(data.token, data.user);

          this.router.navigate([this.previousUrl ? this.previousUrl : '/']);
        }
      }, (err) => {
        console.log(err);
      });
  }
}
