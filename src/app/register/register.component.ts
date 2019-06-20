import {Component} from '@angular/core';
import {AuthService} from '../core/auth.service';
import {Router, Params} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  registerForm: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';

  constructor(
    public authService: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.createForm();
  }

  createForm() {
    this.registerForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  tryFacebookLogin() {
    this.authService.doFacebookLogin()
      .then(res => {
          this.router.navigate(['/user']);
        }, err => console.log(err)
      );
  }


  tryGoogleLogin() {
    this.authService.doGoogleLogin()
      .then(res => {
          this.router.navigate(['/user']);
        }, err => console.log(err)
      );
  }
  tryLogin(value) {
    this.authService.doLogin(value)
      .then(res => {
        this.router.navigate(['/user']);
      }, err => {
        console.log(err);
        this.errorMessage = err.message;
      });
  }
  tryRegister(value) {
    this.authService.doRegister(value)
      .then(res => {
        this.errorMessage = '';
        this.successMessage = 'Your account has been created';
        setTimeout(() => {
          this.tryLogin(value);
        }, 3000);
      }, err => {
        console.log(err);
        this.errorMessage = err.message;
        this.successMessage = '';
      });
  }

}
