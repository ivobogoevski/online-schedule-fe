import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherExamsComponent } from './teacher-exams.component';

describe('TeacherExamsComponent', () => {
  let component: TeacherExamsComponent;
  let fixture: ComponentFixture<TeacherExamsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeacherExamsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherExamsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
