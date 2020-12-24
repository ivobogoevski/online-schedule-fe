import { trigger, transition, style, animate } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { IClass } from 'src/app/shared/models/class.model';

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
