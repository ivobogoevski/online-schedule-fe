import { Component, OnInit } from '@angular/core';
import { IClass } from 'src/app/shared/models/class.model';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { MatSnackBar } from '@angular/material/snack-bar';
import { trigger, transition, style, animate } from '@angular/animations';
import { forkJoin, Observable } from 'rxjs';
import { NgxSpinnerService } from "ngx-spinner";
import { ClassesService } from 'src/app/shared/services/classes.service';

@Component({
  selector: 'app-classes',
  animations: [
    trigger('myInsertRemoveTrigger', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('500ms', style({ opacity: 1 })),
      ])
    ]),
  ],
  templateUrl: './classes.component.html',
  styleUrls: ['./classes.component.scss'],
})
export class ClassesComponent implements OnInit {
  myClasses: IClass[];
  availableClasses: IClass[];
  displaySpinner = false;
  enableSave = false;
  filteredTerm = '';
  filteredAvailableClasses: IClass[];

  constructor(
    private snackBar: MatSnackBar,
    private classesService: ClassesService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.spinner.show();
    const requests : [Observable<IClass[]>, Observable<IClass[]>] = [this.classesService.getAllClasses(), this.classesService.getStudentClasses()];
    forkJoin<IClass[], IClass[]>(requests).subscribe(res => {
      this.myClasses = res[1];
      this.availableClasses = res[0];
      this.filteredAvailableClasses = this.availableClasses;
      this.spinner.hide();
    });
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      this.enableSave = true;
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }

  filterClasses(term: string) {
    this.filteredTerm = term;
    setTimeout(() => {
      if (this.filteredTerm === term) {
        this.filteredAvailableClasses = this.availableClasses.filter((e) => {
          if (e.Name.toLowerCase().includes(term.toLowerCase()) || e.Teacher.Name.toLowerCase().includes(term.toLowerCase())) {
            return true;
          }
          return false;
        });
      }
    }, 500);
  }

  save() {
    this.displaySpinner = true;
    this.classesService.assignClasses(this.myClasses).subscribe(
      res => {
        this.displaySpinner = false;
        this.enableSave = false;
        this.snackBar.open('Successfuly saved your changes.', null, {duration: 3000, panelClass: 'snack-success'});
      }
    );
  }
}
