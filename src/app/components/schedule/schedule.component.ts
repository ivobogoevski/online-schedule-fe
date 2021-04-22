import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ISchedule } from 'src/app/shared/models/schedule.model';
import * as moment from 'moment';
import { ClassesService } from 'src/app/shared/services/classes.service';

@Component({
  selector: 'app-schedule',
  animations: [
    trigger('myInsertRemoveTrigger', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('500ms', style({ opacity: 1 })),
      ])
    ]),
  ],
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent implements OnInit {

  schedule: ISchedule = {
    Monday: [],
    Tuesday: [],
    Wednesday: [],
    Thursday: [],
    Friday: []
  }

  constructor(
    private classesService: ClassesService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.spinner.show();
    this.classesService.getStudentClasses().subscribe(
      res => {
        res.forEach( e => {
          switch (moment(+e.ClassDate).isoWeekday()) {
            case 1:
              e.ClassDate = moment(+e.ClassDate).format('HH:mm');
              e.Type = 'Lecture';
              this.schedule.Monday.push({...e});
              break;
            case 2:
              e.ClassDate = moment(+e.ClassDate).format('HH:mm');
              e.Type = 'Lecture';
              this.schedule.Tuesday.push({...e});
              break;
            case 3:
              e.ClassDate = moment(+e.ClassDate).format('HH:mm');
              e.Type = 'Lecture';
              this.schedule.Wednesday.push({...e});
              break;
            case 4:
              e.ClassDate = moment(+e.ClassDate).format('HH:mm');
              e.Type = 'Lecture';
              this.schedule.Thursday.push({...e});
              break;
            case 5:
              e.ClassDate = moment(+e.ClassDate).format('HH:mm');
              e.Type = 'Lecture';
              this.schedule.Friday.push({...e});
              break;
          }

          if(e.ExerciseDate) {
            switch (moment(+e.ExerciseDate).isoWeekday()) {
              case 1:
                e.ExerciseDate = moment(+e.ExerciseDate).format('HH:mm');
                e.Type = 'Exercise';
                this.schedule.Monday.push(e);
                break;
              case 2:
                e.ExerciseDate = moment(+e.ExerciseDate).format('HH:mm');
                e.Type = 'Exercise';
                this.schedule.Tuesday.push(e);
                break;
              case 3:
                e.ExerciseDate = moment(+e.ExerciseDate).format('HH:mm');
                e.Type = 'Exercise';
                this.schedule.Wednesday.push(e);
                break;
              case 4:
                e.ExerciseDate = moment(+e.ExerciseDate).format('HH:mm');
                e.Type = 'Exercise';
                this.schedule.Thursday.push(e);
                break;
              case 5:
                e.ExerciseDate = moment(+e.ExerciseDate).format('HH:mm');
                e.Type = 'Exercise';
                this.schedule.Friday.push(e);
                break;
            }
          }
        });
        this.spinner.hide();
      }
    );
  }

}
