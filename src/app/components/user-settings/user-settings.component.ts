import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormGroupDirective,
  NgForm,
  Validators,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import jwt_decode from 'jwt-decode';
import { AuthService } from 'src/app/shared/services/auth.service';
import { MyErrorStateMatcher } from '../login/login.component';
import { trigger, transition, animate, style } from '@angular/animations';

export class PasswordMatch implements ErrorStateMatcher {
  isErrorState(
    control: any | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted = form && form.submitted;
    if (
      form.form.controls.newPassword.value !==
      form.form.controls.confirmPassword.value
    ) {
      control.errors = {};
      control.errors.match = true;
    } else if (control.errors) {
      delete control.errors.match;
    }
    return !!(
      (control && control.invalid && (control.touched || isSubmitted)) ||
      (control &&
        (control.touched || isSubmitted) &&
        form.form.controls.newPassword.value !==
          form.form.controls.confirmPassword.value)
    );
  }
}

@Component({
  selector: 'app-user-settings',
  animations: [
    trigger('myInsertRemoveTrigger', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('500ms', style({ opacity: 1 })),
      ]),
    ]),
  ],
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.scss'],
})
export class UserSettingsComponent implements OnInit {
  user;
  userType;
  editMode = false;
  changePasswordMode = false;

  userForm: FormGroup;

  changePasswordForm = new FormGroup({
    password: new FormControl('', Validators.required),
    newPassword: new FormControl('', Validators.required),
    confirmPassword: new FormControl('', Validators.required),
  });

  matcher = new MyErrorStateMatcher();
  passwordMatcher = new PasswordMatch();

  displaySpinner = false;

  constructor(
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.setUserInfo();
  }

  enableEditMode() {
    this.editMode = true;
    this.userForm = new FormGroup({
      name: new FormControl(this.user.Name, Validators.required),
      email: new FormControl(this.user.Email, [
        Validators.required,
        Validators.email,
      ]),
    });
    if (this.userType === 1) {
      this.userForm.addControl(
        'index',
        new FormControl(this.user.IndexNumber, Validators.required)
      );
    } else if (this.userType === 2) {
      this.userForm.addControl(
        'office',
        new FormControl(this.user.Office, Validators.required)
      );
    }
  }

  onSubmit() {
    if (this.userForm.valid) {
      this.displaySpinner = true;
      if (this.userType === 1) {
        this.authService
          .update(
            this.userForm.get('name').value,
            this.userForm.get('email').value,
            this.userForm.get('index').value,
            this.user.Study
          )
          .subscribe(
            (res) => {
              this.snackBar.open(
                'Information has been successfully updated.',
                null,
                {
                  duration: 3000,
                  panelClass: 'snack-success',
                }
              );
              localStorage.setItem('os_auth', res.token);
              localStorage.setItem('os_auth_refresh', res.refreshToken);
              this.displaySpinner = false;
              this.setUserInfo();
              this.editMode = false;
            },
            (error) => {
              this.snackBar.open(error.error.message, null, {
                duration: 3000,
                panelClass: 'snack-error',
              });
              this.displaySpinner = false;
            }
          );
      } else if(this.userType === 2) {
        this.authService
        .teacherUpdate(
          this.userForm.get('name').value,
          this.userForm.get('email').value,
          this.userForm.get('office').value
        )
        .subscribe(
          (res) => {
            this.snackBar.open(
              'Information has been successfully updated.',
              null,
              {
                duration: 3000,
                panelClass: 'snack-success',
              }
            );
            localStorage.setItem('os_auth', res.token);
            localStorage.setItem('os_auth_refresh', res.refreshToken);
            this.displaySpinner = false;
            this.setUserInfo();
            this.editMode = false;
          },
          (error) => {
            this.snackBar.open(error.error.message, null, {
              duration: 3000,
              panelClass: 'snack-error',
            });
            this.displaySpinner = false;
          }
        );
      }
    }
  }

  changePassword() {
    if (
      this.changePasswordForm.valid &&
      this.changePasswordForm.get('confirmPassword').value ===
        this.changePasswordForm.get('newPassword').value
    ) {
      this.displaySpinner = true;
      this.authService
        .changePassword(
          this.changePasswordForm.get('password').value,
          this.changePasswordForm.get('newPassword').value
        )
        .subscribe(
          (res) => {
            localStorage.setItem('os_auth', res.token);
            localStorage.setItem('os_auth_refresh', res.refreshToken);
            this.snackBar.open(
              'Information has been successfully updated.',
              null,
              {
                duration: 3000,
                panelClass: 'snack-success',
              }
            );
            this.changePasswordMode = false;
            this.displaySpinner = false;
            this.changePasswordForm.reset();
          },
          (error) => {
            this.snackBar.open(error.error.message, null, {
              duration: 3000,
              panelClass: 'snack-error',
            });
            this.displaySpinner = false;
          }
        );
    }
  }

  setUserInfo() {
    this.user = jwt_decode(localStorage.getItem('os_auth'));
    const rt: any = jwt_decode(localStorage.getItem('os_auth_refresh'));
    if (this.user.IndexNumber && rt.Type === '1') {
      this.userType = 1;
    } else if (this.user.Office && rt.Type === '0') {
      this.userType = 2;
    }
  }

  cancelChangePassword() {
    this.changePasswordMode = false;
    this.changePasswordForm.reset();
  }
}
