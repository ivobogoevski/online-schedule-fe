import { trigger, transition, style, animate } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgxSpinnerService } from 'ngx-spinner';
import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';
import { INotification } from 'src/app/shared/models/notification.model';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { EditNotificationComponent } from './edit-notification/edit-notification.component';

@Component({
  selector: 'app-dashboard',
  animations: [
    trigger('myInsertRemoveTrigger', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('500ms', style({ opacity: 1 })),
      ])
    ]),
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  notifications: INotification[] = [];
  displaySpinner = true;

  constructor(
    private notifactionService: NotificationService,
    private snackBar: MatSnackBar,
    private spinner: NgxSpinnerService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getNotifications();
  }

  getNotifications(){
    this.spinner.show();
    this.notifactionService.getAllTeacherNotifications().subscribe( res => {
      this.notifications = res;
      this.displaySpinner = false;
      this.spinner.hide()
    },
    (error) => {
      this.snackBar.open(error.error.message, null, {
        duration: 3000,
        panelClass: 'snack-error',
      });
      this.displaySpinner = false;
      this.spinner.hide();
    });
  }

  deleteNotification(notification: INotification){
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Are you sure?',
        message: 'This will delete selected notification permanently.',
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.notifactionService.deleteNotification(notification.NotificationId).subscribe(res => {
          this.snackBar.open('Notification successfully deleted.', null, {
            duration: 3000,
            panelClass: 'snack-success',
          });
          this.getNotifications();
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

  editNotification(Notification: INotification){
    const dialogRef = this.dialog.open(EditNotificationComponent, {
      width: '400px',
      data: {Notification}
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.getNotifications();
      }
    });
  }

}
