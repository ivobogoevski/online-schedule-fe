import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { INotification } from 'src/app/shared/models/notification.model';
import { ClassesService } from 'src/app/shared/services/classes.service';
import { NotificationService } from 'src/app/shared/services/notification.service';

@Component({
  selector: 'app-edit-notification',
  templateUrl: './edit-notification.component.html',
  styleUrls: ['./edit-notification.component.scss']
})
export class EditNotificationComponent implements OnInit {

  notificationFormGroup: FormGroup = new FormGroup({
    Notification: new FormControl(this.data.Notification.NotificationContent, Validators.compose([Validators.required, Validators.maxLength(255)]))
  });

  displaySpinner = false;

  constructor(public dialogRef: MatDialogRef<EditNotificationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private notificationService: NotificationService,
    private snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  onSubmit(){
    if(this.notificationFormGroup.valid) {
      this.displaySpinner = true;
      const notification: INotification = { ...this.data.Notification};
      notification.NotificationContent = this.notificationFormGroup.get('Notification').value;
      notification.EditDate = new Date().valueOf().toString();
      this.notificationService.editNotification(notification).subscribe( res => {
        this.displaySpinner = false;
        this.snackBar.open('Notification has been updated successfully.', null, {
          duration: 3000,
          panelClass: 'snack-success',
        });
        console.log(res);
        this.dialogRef.close(res);
      },
      (error) => {
        this.snackBar.open(error.error.message, null, {
          duration: 3000,
          panelClass: 'snack-error',
        });
        this.displaySpinner = false;
      })
    }
  }

  onNoClick() {
    this.dialogRef.close();
  }

}
