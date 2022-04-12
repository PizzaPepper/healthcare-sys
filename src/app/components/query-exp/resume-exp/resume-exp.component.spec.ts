import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumeExpComponent } from './resume-exp.component';

describe('ResumeExpComponent', () => {
  let component: ResumeExpComponent;
  let fixture: ComponentFixture<ResumeExpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResumeExpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResumeExpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
