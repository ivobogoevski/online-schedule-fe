import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ColloquiesComponent } from './colloquies.component';

describe('ColloquiesComponent', () => {
  let component: ColloquiesComponent;
  let fixture: ComponentFixture<ColloquiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ColloquiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ColloquiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
