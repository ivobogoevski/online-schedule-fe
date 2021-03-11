import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { IClass } from 'src/app/shared/models/class.model';
import { ClassesService } from 'src/app/shared/services/classes.service';
import { AddClassDialogComponent } from '../add-class-dialog/add-class-dialog.component';

@Component({
  selector: 'app-edit-class',
  templateUrl: './edit-class.component.html',
  styleUrls: ['./edit-class.component.scss']
})
export class EditClassComponent implements OnInit {

  editClass: IClass;

  constructor(
    private classesService: ClassesService,
    private route: ActivatedRoute,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.classesService.getClassByCode(this.route.snapshot.params.id).subscribe(
      res => console.log(res)
    )
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddClassDialogComponent, {

    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

}
