import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-add-class-dialog',
  templateUrl: './add-class-dialog.component.html',
  styleUrls: ['./add-class-dialog.component.scss']
})
export class AddClassDialogComponent implements OnInit {

  classFormGroup: FormGroup = new FormGroup({
    Code: new FormControl('', Validators.required),
    Name: new FormControl('', Validators.required),
    Study: new FormControl('', Validators.required),
    Semester: new FormControl('', Validators.compose([Validators.required, Validators.min(1)])),
    Classroom: new FormControl('', Validators.required),
    ClassDate: new FormControl('', Validators.required),
    ExerciseRoom: new FormControl('', Validators.required),
    ExerciseDate: new FormControl('', Validators.required)
  });

  displaySpinner = false;

  constructor(
    public dialogRef: MatDialogRef<AddClassDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
  }

  onNoClick() {
    this.dialogRef.close();
  }

  onSubmit() {
    if(this.classFormGroup.valid) {
      this.displaySpinner = true;
      setTimeout(() => {
        this.dialogRef.close();
      }, 1500);
    }
  }

}
