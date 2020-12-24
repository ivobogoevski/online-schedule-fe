import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

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

  constructor(
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  onSubmit(){
    if (this.logInForm.valid){
      this.displaySpinner = true;
      this.authService.login(this.logInForm.get('email').value, this.logInForm.get('password').value).subscribe(
        res => {
          localStorage.setItem('os_auth', res.token);
          localStorage.setItem('os_auth_refresh', res.refreshToken);
          this.displaySpinner = false;
          this.router.navigateByUrl('/');
        },
        error => {
          this.snackBar.open(error.error.message, null, {duration: 3000, panelClass: 'snack-error'});
          this.displaySpinner = false;
        }
      );
    }
  }

}
