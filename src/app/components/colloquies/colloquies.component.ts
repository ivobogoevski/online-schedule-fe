import { trigger, transition, style, animate } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
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
  displaySpinner = false;

  constructor(
    private examService: ExamsService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.displaySpinner = true;
    this.examService.getAll(2).subscribe(res => {
      this.classes = res;
      this.displaySpinner = false;
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
