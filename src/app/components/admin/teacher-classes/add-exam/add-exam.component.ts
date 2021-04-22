import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { forkJoin } from 'rxjs';
import { IExam } from 'src/app/shared/models/exam.model';
import { ExamsService } from 'src/app/shared/services/exams.service';
import { NotificationService } from 'src/app/shared/services/notification.service';

@Component({
  selector: 'app-add-exam',
  templateUrl: './add-exam.component.html',
  styleUrls: ['./add-exam.component.scss']
})
export class AddExamComponent implements OnInit {

  examFormGroup: FormGroup = new FormGroup({
    ExamDate: new FormControl(this.data.examDate, Validators.required),
    Classroom: new FormControl(this.data.classroom, Validators.required),
    ExamType: new FormControl(this.data.examType, Validators.required),
    ClassCode: new FormControl(this.data.classCode, Validators.required),
    Notification: new FormControl('', Validators.maxLength(255))
  });

  displaySpinner = false;

  dialogTitle = ''

  constructor(
    public dialogRef: MatDialogRef<AddExamComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private examService: ExamsService,
    private notificationService: NotificationService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.data.examType === 1 ? this.dialogTitle = 'Add New Exam' : this.dialogTitle = 'Add New Coloquium';
  }

  onNoClick() {
    this.dialogRef.close();
  }

  onSubmit() {
    if(this.examFormGroup.valid) {
      this.displaySpinner = true;
      const examRequestBody: IExam = {
        ... this.examFormGroup.value
      }
      examRequestBody.ExamDate = new Date(examRequestBody.ExamDate).valueOf().toString();
      if(this.data.examID) {
        examRequestBody.ExamID = this.data.examID;
        this.editExam(examRequestBody);
      } else {
        this.addExam(examRequestBody);
      }
    }
  }

  addExam(examRequestBody) {
    const requests = [this.examService.addExam(examRequestBody)];
    if(this.examFormGroup.get('Notification').value.length){
      const notificationBody = {
        NotificationDate: new Date().valueOf().toString(),
        NotificationContent: this.examFormGroup.get('Notification').value,
        ClassCode: this.examFormGroup.get('ClassCode').value
      }
      requests.push(this.notificationService.createNotification(notificationBody));
    }
    forkJoin(requests).subscribe( res => {
      let examType = 'exam';
      if(this.data.examType === 2) {
        examType = 'colloquium'
      }
      this.snackBar.open(`New ${examType} has been successfully created.`, null, {
        duration: 3000,
        panelClass: 'snack-success',
      });
      this.dialogRef.close(true);
    },
    (error) => {
      this.snackBar.open(error.error.message, null, {
        duration: 3000,
        panelClass: 'snack-error',
      });
      this.displaySpinner = false;
    });
  }

  editExam(examRequestBody) {
    const requests = [this.examService.editExam(examRequestBody)];
    if(this.examFormGroup.get('Notification').value.length){
      const notificationBody = {
        NotificationDate: new Date().valueOf().toString(),
        NotificationContent: this.examFormGroup.get('Notification').value,
        ClassCode: this.examFormGroup.get('ClassCode').value
      }
      requests.push(this.notificationService.createNotification(notificationBody));
    }
    forkJoin(requests).subscribe( res => {
      let examType = 'Exam';
      if(this.data.examType === 2) {
        examType = 'Colloquium'
      }
      this.snackBar.open(`${examType} has been successfully updated.`, null, {
        duration: 3000,
        panelClass: 'snack-success',
      });
      this.dialogRef.close(true);
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
