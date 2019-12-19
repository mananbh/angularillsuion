import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import{LabtechReportComponent} from './labtech-report/labtech-report.component';
import{AttendenceReportComponent} from './attendence-report/attendence-report.component';
import { FileUploadComponent } from '../forms/file-upload/file-upload.component';
import { CaseDocumentComponent } from './case-document/case-document.component';


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
  },
  {
    path: '',
    children: [{
        path: 'rxupload',
        component: FileUploadComponent,
        data: { title: 'Upload', breadcrumb: 'UPLOAD' }
    }]
  },
  {
    path: '',
    children: [{
        path: 'casedoc',
        component: CaseDocumentComponent,
        data: { title: 'Case', breadcrumb: 'Doc Upload' }
    }]
  }
];
