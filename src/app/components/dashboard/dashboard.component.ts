import { trigger, transition, style, animate } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { IPost } from 'src/app/shared/models/post.model';

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

  posts: IPost[] = [
    {
      Author: 'Ilija Jolevski',
      Date: 2432434323,
      Class: 'Objektno Orientirano Programiranje',
      Content: 'Prviot kolokvium po predmetot Objektno Orientirano Programiranje e zakazan za 11.11.2020. Proverete go vashiot raspored za poveke detali.'
    },
    {
      Author: 'Ilija Jolevski',
      Date: 2432434323,
      Class: 'Objektno Orientirano Programiranje',
      Content: 'Prviot kolokvium po predmetot Objektno Orientirano Programiranje e zakazan za 11.11.2020. Proverete go vashiot raspored za poveke detali.'
    },
    {
      Author: 'Ilija Jolevski',
      Date: 2432434323,
      Class: 'Objektno Orientirano Programiranje',
      Content: 'Prviot kolokvium po predmetot Objektno Orientirano Programiranje e zakazan za 11.11.2020. Proverete go vashiot raspored za poveke detali.'
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
