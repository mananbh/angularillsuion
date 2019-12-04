import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendenceReportComponent } from './attendence-report.component';

describe('AttendenceReportComponent', () => {
  let component: AttendenceReportComponent;
  let fixture: ComponentFixture<AttendenceReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AttendenceReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AttendenceReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
