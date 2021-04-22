import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { forkJoin } from 'rxjs';
import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';
import { IClass } from 'src/app/shared/models/class.model';
import { IExam } from 'src/app/shared/models/exam.model';
import { ClassesService } from 'src/app/shared/services/classes.service';
import { ExamsService } from 'src/app/shared/services/exams.service';
import { AddClassDialogComponent } from '../add-class-dialog/add-class-dialog.component';
import { AddExamComponent } from '../add-exam/add-exam.component';

@Component({
  selector: 'app-edit-class',
  templateUrl: './edit-class.component.html',
  styleUrls: ['./edit-class.component.scss'],
  animations: [
    trigger('myInsertRemoveTrigger', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('500ms', style({ opacity: 1 })),
      ]),
    ]),
  ],
})
export class EditClassComponent implements OnInit {
  editClass: IClass;
  exams: IExam[] = [];
  colloquies: IExam[] = [];
  contentLoaded = false;
  dateNow = new Date().valueOf();

  constructor(
    private classesService: ClassesService,
    private examService: ExamsService,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private spinner: NgxSpinnerService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.spinner.show();
    forkJoin([
      this.classesService.getClassByCode(this.route.snapshot.params.id),
      this.examService.getExamsByClassCode(this.route.snapshot.params.id),
    ]).subscribe(
      (res) => {
        this.editClass = res[0];
        res[1].forEach((e) => {
          if (e.ExamType === 1) {
            this.exams.push(e);
          } else if (e.ExamType === 2) {
            this.colloquies.push(e);
          }
        });
        this.contentLoaded = true;
        this.spinner.hide();
      },
      (error) => {
        this.snackBar.open(error.error.message, null, {
          duration: 3000,
          panelClass: 'snack-error',
        });
        this.spinner.hide();
      }
    );
  }

  openExamsModal(examType: number) {
    const dialogRef = this.dialog.open(AddExamComponent, {
      data: {
        examType,
        classCode: this.editClass.Code,
        classroom: '',
        examDate: '',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.spinner.show();
        this.getExamsByClassCode(examType);
      }
    });
  }

  openEditExamModal(examType: number, exam: IExam) {
    const dialogRef = this.dialog.open(AddExamComponent, {
      data: {
        examType,
        classCode: this.editClass.Code,
        classroom: exam.Classroom,
        examDate: new Date(+exam.ExamDate),
        examID: exam.ExamID,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.spinner.show();
        this.getExamsByClassCode(examType);
      }
    });
  }

  getExamsByClassCode(examType) {
    this.examService
      .getExamsByClassCode(this.route.snapshot.params.id)
      .subscribe(
        (res) => {
          if (examType === 1) {
            this.exams = [];
            res.forEach((e) => {
              if (e.ExamType === 1) {
                this.exams.push(e);
              }
            });
          } else {
            this.colloquies = [];
            res.forEach((e) => {
              if (e.ExamType === 2) {
                this.colloquies.push(e);
              }
            });
          }
          this.spinner.hide();
        },
        (error) => {
          this.snackBar.open(error.error.message, null, {
            duration: 3000,
            panelClass: 'snack-error',
          });
          this.spinner.hide();
        }
      );
  }

  deleteExam(exam: IExam, examType: number) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Are you sure?',
        message: 'This will delete selected exam permanently.',
      }
    });

    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        this.examService.deleteExam(exam.ExamID).subscribe((res) => {
          this.getExamsByClassCode(examType);
        });
      }
    });
  }

  openClassModal(): void {
    const dialogRef = this.dialog.open(AddClassDialogComponent, {
      width: '400px',
      data: {
        class: this.editClass,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.spinner.show();
        this.classesService
          .getClassByCode(this.route.snapshot.params.id)
          .subscribe(
            (res) => {
              this.editClass = res;
              this.spinner.hide();
            },
            (error) => {
              this.snackBar.open(error.error.message, null, {
                duration: 3000,
                panelClass: 'snack-error',
              });
              this.spinner.hide();
            }
          );
      }
    });
  }

  removeClass() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Are you sure you want to delete this class?',
        message:
          "You won't be able to manage this class anymore and this will delete all data related to this class.",
      },
      width: '600px',
    });

    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        this.spinner.show();
        this.classesService.deleteClass(this.route.snapshot.params.id).subscribe( res => {
          this.snackBar.open('Class has been deleted successfully.', null, {
            duration: 3000,
            panelClass: 'snack-success',
          });
          this.spinner.hide();
          this.router.navigateByUrl('/admin/classes')
        },
        (error) => {
          this.snackBar.open(error.error.message, null, {
            duration: 3000,
            panelClass: 'snack-error',
          });
          this.spinner.hide();
        })
      }
    });
  }
}
