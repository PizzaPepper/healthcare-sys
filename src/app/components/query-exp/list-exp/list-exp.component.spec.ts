import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListExpComponent } from './list-exp.component';

describe('ListExpComponent', () => {
  let component: ListExpComponent;
  let fixture: ComponentFixture<ListExpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListExpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListExpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
