import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormGroupDirective,
  NgForm,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted = form && form.submitted;
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched || isSubmitted)
    );
  }
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  registerForm = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
    index: new FormControl('', Validators.required)
  });

  study = 'KNI';

  matcher = new MyErrorStateMatcher();

  displaySpinner = false;

  constructor(
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {}

  onSubmit() {
    if (this.registerForm.valid) {
      this.displaySpinner = true;
      this.authService
        .register(
          this.registerForm.get('name').value,
          this.registerForm.get('email').value,
          this.registerForm.get('password').value,
          this.study,
          this.registerForm.get('index').value,
        )
        .subscribe(
          res => {
            this.snackBar.open(res.message, null, {
              duration: 3000,
              panelClass: 'snack-success'
            });
            this.displaySpinner = false;
            this.router.navigateByUrl('/login');
          },
          error => {
            this.snackBar.open(error.error.message, null, {
              duration: 3000,
              panelClass: 'snack-error'
            });
            this.displaySpinner = false;
          }
        );
    }
  }
}
