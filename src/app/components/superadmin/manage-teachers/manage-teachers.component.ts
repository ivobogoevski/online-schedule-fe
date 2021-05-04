import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TeacherService } from 'src/app/shared/services/teacher.service';
import { ITeacher } from '../../../shared/models/teacher.model';
import { ManageTeacherDialogComponent } from './manage-teacher-dialog/manage-teacher-dialog.component';

@Component({
  selector: 'app-manage-teachers',
  templateUrl: './manage-teachers.component.html',
  styleUrls: ['./manage-teachers.component.scss']
})
export class ManageTeachersComponent implements AfterViewInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns: string[] = ['TeacherId', 'Name', 'Email', 'Office', 'Active'];
  dataSource: MatTableDataSource<ITeacher>;

  constructor(
    private teacherService: TeacherService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.teacherService.getAllTeachers().subscribe( res => {
      this.dataSource = new MatTableDataSource(res);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  openAddTeacherDialog() {
    const dialogRef = this.dialog.open(ManageTeacherDialogComponent, {
      width: '400px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.teacherService.getAllTeachers().subscribe( res => {
          this.dataSource = new MatTableDataSource(res);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        })
      }
    });
  }

  rowClicked(row) {
    const dialogRef = this.dialog.open(ManageTeacherDialogComponent, {
      width: '400px',
      data: {teacher: row},
      autoFocus: false
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.teacherService.getAllTeachers().subscribe( res => {
          this.dataSource = new MatTableDataSource(res);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        })
      }
    });
  }
}
