import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { MyErrorStateMatcher } from '../../login/login.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  logInForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required)
  });

  matcher = new MyErrorStateMatcher();

  displaySpinner = false;
  loginType = 'admin';

  constructor(
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit(): void {
    if(this.router.url.includes('superadmin')) {
      this.loginType = 'superadmin';
    }
  }

  onSubmit(){
    if (this.logInForm.valid){
      this.displaySpinner = true;
      if((this.loginType === 'superadmin' && this.logInForm.get('email').value === 'superadmin@fikt.com') || (this.loginType === 'admin' && this.logInForm.get('email').value !== 'superadmin@fikt.com')) {
        this.authService.teacherLogin(this.logInForm.get('email').value, this.logInForm.get('password').value).subscribe(
          res => {
            localStorage.setItem('os_auth', res.token);
            localStorage.setItem('os_auth_refresh', res.refreshToken);
            this.displaySpinner = false;
            this.router.navigateByUrl(`/${this.loginType}/dashboard`);
          },
          error => {
            this.snackBar.open(error.error.message, null, {duration: 3000, panelClass: 'snack-error'});
            this.displaySpinner = false;
          }
        );
      } else {
        this.snackBar.open('Invalid credentials', null, {duration: 3000, panelClass: 'snack-error'});
        this.displaySpinner = false;
      }
    }
  }

}
