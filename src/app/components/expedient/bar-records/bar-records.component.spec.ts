import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarRecordsComponent } from './bar-records.component';

describe('BarRecordsComponent', () => {
  let component: BarRecordsComponent;
  let fixture: ComponentFixture<BarRecordsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BarRecordsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BarRecordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
