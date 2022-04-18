import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarFilesComponent } from './bar-files.component';

describe('BarFilesComponent', () => {
  let component: BarFilesComponent;
  let fixture: ComponentFixture<BarFilesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BarFilesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BarFilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
