import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageTeacherDialogComponent } from './manage-teacher-dialog.component';

describe('ManageTeacherDialogComponent', () => {
  let component: ManageTeacherDialogComponent;
  let fixture: ComponentFixture<ManageTeacherDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageTeacherDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageTeacherDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
