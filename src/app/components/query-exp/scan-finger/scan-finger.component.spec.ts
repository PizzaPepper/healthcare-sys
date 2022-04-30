import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScanFingerComponent } from './scan-finger.component';

describe('ScanFingerComponent', () => {
  let component: ScanFingerComponent;
  let fixture: ComponentFixture<ScanFingerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScanFingerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScanFingerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
