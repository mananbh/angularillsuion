import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LabtechReportComponent } from './labtech-report.component';

describe('LabtechReportComponent', () => {
  let component: LabtechReportComponent;
  let fixture: ComponentFixture<LabtechReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LabtechReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LabtechReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
