import { trigger, transition, style, animate } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { IClass } from 'src/app/shared/models/class.model';
import { IExam } from 'src/app/shared/models/exam.model';

@Component({
  selector: 'app-exams',
  animations: [
    trigger('myInsertRemoveTrigger', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('500ms', style({ opacity: 1 })),
      ])
    ]),
  ],
  templateUrl: './exams.component.html',
  styleUrls: ['./exams.component.scss']
})
export class ExamsComponent implements OnInit {

  classes: IClass[] = [
    {
      Code: 'IKT-113',
      Name: 'Aplikativen softver 1',
      Teacher: { Name: 'Andrijana Bocevska', TeacherId: 1 },
      Exam: { Classroom: 'Amfiteatar', Date: 12345435234 },
    },
    {
      Code: 'IKT-114',
      Name: 'Internet i multimedija',
      Teacher: { Name: 'Zoran Kotevski', TeacherId: 2 },
      Exam: { Classroom: 'Amfiteatar', Date: 12345435234 },
    },
    {
      Code: 'IKT-112',
      Name: 'Voved vo programiranje 1',
      Teacher: { Name: 'Ramona Markoska', TeacherId: 3 },
      Exam: { Classroom: 'Amfiteatar', Date: 12345435234 },
    },
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
