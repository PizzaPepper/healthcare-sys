import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QueryExpComponent } from './query-exp.component';

describe('QueryExpComponent', () => {
  let component: QueryExpComponent;
  let fixture: ComponentFixture<QueryExpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QueryExpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QueryExpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
