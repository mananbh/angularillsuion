import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import{LabtechReportComponent} from './labtech-report/labtech-report.component';
import{AttendenceReportComponent} from './attendence-report/attendence-report.component';



export const ReportsRouting: Routes = [
  {
    path: '',
    children: [{
      path: 'prrep',
      component: LabtechReportComponent,
      data: { title: 'Report', breadcrumb: 'Lab Tech report' }
    }]
  },
  {
    path: '',
    children: [{
      path: 'attenrep',
      component: AttendenceReportComponent,
      data: { title: 'Report', breadcrumb: 'Attendence report Log' }
    }]
  }
];
