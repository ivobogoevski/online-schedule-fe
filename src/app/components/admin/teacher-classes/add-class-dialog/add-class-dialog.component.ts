import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IClass } from 'src/app/shared/models/class.model';
import { ClassesService } from 'src/app/shared/services/classes.service';
import jwt_decode from 'jwt-decode';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-add-class-dialog',
  templateUrl: './add-class-dialog.component.html',
  styleUrls: ['./add-class-dialog.component.scss']
})
export class AddClassDialogComponent implements OnInit {

  classFormGroup: FormGroup = new FormGroup({
    Code: new FormControl('', Validators.required),
    Name: new FormControl('', Validators.required),
    Study: new FormControl('', Validators.required),
    Semester: new FormControl('', Validators.compose([Validators.required, Validators.min(1)])),
    Classroom: new FormControl('', Validators.required),
    ClassDate: new FormControl('', Validators.required),
    ExerciseRoom: new FormControl('', Validators.required),
    ExerciseDate: new FormControl('', Validators.required)
  });

  displaySpinner = false;

  constructor(
    public dialogRef: MatDialogRef<AddClassDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private classesService: ClassesService,
    private notificationService: NotificationService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    if(this.data.class) {
      this.classFormGroup.get('Code').setValue(this.data.class.Code);
      this.classFormGroup.get('Name').setValue(this.data.class.Name);
      this.classFormGroup.get('Study').setValue(this.data.class.Study);
      this.classFormGroup.get('Semester').setValue(this.data.class.Semester);
      this.classFormGroup.get('Classroom').setValue(this.data.class.Classroom);
      this.classFormGroup.get('ClassDate').setValue(new Date(+this.data.class.ClassDate));
      this.classFormGroup.get('ExerciseRoom').setValue(this.data.class.ExerciseRoom);
      this.classFormGroup.get('ExerciseDate').setValue(new Date(+this.data.class.ExerciseDate));
      this.classFormGroup.addControl('Notification', new FormControl('', Validators.maxLength(255)));
    }
  }

  onNoClick() {
    this.dialogRef.close();
  }

  onSubmit() {
    if(this.classFormGroup.valid) {
      this.displaySpinner = true;
      const addClassRequestBody: IClass = {
        ... this.classFormGroup.value
      }
      addClassRequestBody.ClassDate = new Date(addClassRequestBody.ClassDate).valueOf().toString();
      addClassRequestBody.ExerciseDate = new Date(addClassRequestBody.ExerciseDate).valueOf().toString();
      if(this.data.class){
        const requests = [this.classesService.editClass(addClassRequestBody)];
        if(this.classFormGroup.get('Notification').value.length){
          const notificationBody = {
            NotificationDate: new Date().valueOf().toString(),
            NotificationContent: this.classFormGroup.get('Notification').value,
            ClassCode: this.classFormGroup.get('Code').value
          }
          requests.push(this.notificationService.createNotification(notificationBody));
        }
        forkJoin(requests).subscribe( res => {
          this.snackBar.open('Class has been successfully updated.', null, {
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
        this.classesService.addClass(addClassRequestBody).subscribe( res => {
          const teacher: any = jwt_decode(localStorage.getItem('os_auth'));
          const assignClassToTeacherRequestBody = {
            ClassCode: addClassRequestBody.Code,
            TeacherId: teacher.UserID
          }
          this.classesService.assignClassToTeacher(assignClassToTeacherRequestBody).subscribe( res => {
            this.snackBar.open('New class has been successfully added.', null, {
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
