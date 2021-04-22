import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IClass } from 'src/app/shared/models/class.model';
import { ClassesService } from 'src/app/shared/services/classes.service';
import { AddClassDialogComponent } from './add-class-dialog/add-class-dialog.component';

@Component({
  selector: 'app-teacher-classes',
  animations: [
    trigger('myInsertRemoveTrigger', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('500ms', style({ opacity: 1 })),
      ])
    ]),
  ],
  templateUrl: './teacher-classes.component.html',
  styleUrls: ['./teacher-classes.component.scss']
})
export class TeacherClassesComponent implements OnInit {

  classes: IClass[];
  displaySpinner = false;

  constructor(
    private classesService: ClassesService,
    private snackBar: MatSnackBar,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getClasses();
  }

  getClasses(){
    this.displaySpinner = true;
    this.classesService.getTeacherClasses().subscribe(res => {
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

  openNewClassDialog() {
    const dialogRef = this.dialog.open(AddClassDialogComponent, {
      width: '400px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.getClasses();
      }
    });
  }

}
