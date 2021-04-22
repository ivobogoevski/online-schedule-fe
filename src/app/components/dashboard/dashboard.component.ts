import { trigger, transition, style, animate } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgxSpinnerService } from 'ngx-spinner';
import { INotification } from 'src/app/shared/models/notification.model';
import { IPost } from 'src/app/shared/models/post.model';
import { NotificationService } from 'src/app/shared/services/notification.service';

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
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.spinner.show();
    this.notifactionService.getAllNotifications().subscribe( res => {
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

}
