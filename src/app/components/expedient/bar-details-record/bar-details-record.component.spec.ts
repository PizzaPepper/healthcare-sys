import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarDetailsRecordComponent } from './bar-details-record.component';

describe('BarDetailsRecordComponent', () => {
  let component: BarDetailsRecordComponent;
  let fixture: ComponentFixture<BarDetailsRecordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BarDetailsRecordComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BarDetailsRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
