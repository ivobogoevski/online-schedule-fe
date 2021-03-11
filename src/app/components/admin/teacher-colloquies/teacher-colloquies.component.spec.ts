import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherColloquiesComponent } from './teacher-colloquies.component';

describe('TeacherColloquiesComponent', () => {
  let component: TeacherColloquiesComponent;
  let fixture: ComponentFixture<TeacherColloquiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeacherColloquiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherColloquiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
