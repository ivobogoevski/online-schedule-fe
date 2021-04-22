import { trigger, transition, style, animate } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgxSpinnerService } from 'ngx-spinner';
import { IClass } from 'src/app/shared/models/class.model';
import { ExamsService } from 'src/app/shared/services/exams.service';

@Component({
  selector: 'app-colloquies',
  animations: [
    trigger('myInsertRemoveTrigger', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('500ms', style({ opacity: 1 })),
      ])
    ]),
  ],
  templateUrl: './colloquies.component.html',
  styleUrls: ['./colloquies.component.scss']
})
export class ColloquiesComponent implements OnInit {

  classes: IClass[];
  displaySpinner = true;

  constructor(
    private examService: ExamsService,
    private snackBar: MatSnackBar,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.displaySpinner = true;
    this.spinner.show();
    this.examService.getAll(2).subscribe(res => {
      this.classes = res;
      this.displaySpinner = false;
      this.spinner.hide();
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
