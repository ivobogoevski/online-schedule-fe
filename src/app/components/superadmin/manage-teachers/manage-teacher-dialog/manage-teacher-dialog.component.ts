import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';
import { ITeacher } from 'src/app/shared/models/teacher.model';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { TeacherService } from 'src/app/shared/services/teacher.service';

@Component({
  selector: 'app-manage-teacher-dialog',
  templateUrl: './manage-teacher-dialog.component.html',
  styleUrls: ['./manage-teacher-dialog.component.scss']
})
export class ManageTeacherDialogComponent implements OnInit {

  teacherFormGroup: FormGroup = new FormGroup({
    Email: new FormControl('', [Validators.required, Validators.email]),
    Name: new FormControl('', Validators.required),
    Office: new FormControl('', Validators.required)
  });

  displaySpinner = false;

  matcher = new MyErrorStateMatcher();

  constructor(
    public dialogRef: MatDialogRef<ManageTeacherDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private teacherService: TeacherService,
    private notificationService: NotificationService,
    private snackBar: MatSnackBar,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    if(this.data.teacher) {
      this.teacherFormGroup.get('Email').setValue(this.data.teacher.Email);
      this.teacherFormGroup.get('Name').setValue(this.data.teacher.Name);
      this.teacherFormGroup.get('Office').setValue(this.data.teacher.Office);
      this.teacherFormGroup.addControl('TeacherId', new FormControl(this.data.teacher.TeacherId));
    } else {
      this.teacherFormGroup.addControl('Password', new FormControl('', Validators.required));
    }
  }

  changeTeacherStatus(status) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Are you sure?',
        message: status ? 'Teacher would be able to use his/her account again.' : 'Teacher would not be able to use his/her account anymore.',
      },
      width: '500px'
    });

    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        this.teacherService.changeTeacherStatus(this.data.teacher.TeacherId, status).subscribe((res) => {
          this.snackBar.open('Teacher has been successfully deactivated.', null, {
            duration: 3000,
            panelClass: 'snack-success',
          });
          this.dialogRef.close(true);
        },
        (error) => {
          this.snackBar.open(error.error.message, null, {
            duration: 3000,
            panelClass: 'snack-error',
          });
          this.displaySpinner = false;
        });
      }
    });
  }

  onNoClick() {
    this.dialogRef.close();
  }

  onSubmit() {
    if(this.teacherFormGroup.valid) {
      this.displaySpinner = true;

      if(this.data.teacher){
        this.teacherService.editTeacher(this.teacherFormGroup.value).subscribe( res => {
          this.snackBar.open('Teacher has been successfully updated.', null, {
            duration: 3000,
            panelClass: 'snack-success',
          });
          this.displaySpinner = false;
          this.dialogRef.close(true);
        },
        (error) => {
          this.snackBar.open(error.error.message, null, {
            duration: 3000,
            panelClass: 'snack-error',
          });
          this.displaySpinner = false;
        })
      } else {
        this.teacherService.addTeacher(this.teacherFormGroup.value).subscribe( res => {
          this.snackBar.open('New teacher has been successfully added.', null, {
            duration: 3000,
            panelClass: 'snack-success',
          });
          this.displaySpinner = false;
          this.dialogRef.close(true);
        },
        (error) => {
          this.snackBar.open(error.error.message, null, {
            duration: 3000,
            panelClass: 'snack-error',
          });
          this.displaySpinner = false;
        });
      }
    }
  }

}

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
