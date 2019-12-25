import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import{LabtechReportComponent} from './labtech-report/labtech-report.component';
import{AttendenceReportComponent} from './attendence-report/attendence-report.component';
import { FileUploadComponent } from '../forms/file-upload/file-upload.component';
import { CaseDocumentComponent } from './case-document/case-document.component';
import { ViewImpressionDocComponent } from './view-impression-doc/view-impression-doc.component';
import { AngularAutoComponent } from './angular-auto/angular-auto.component';



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
        data: { title: 'Upload', breadcrumb: 'UPLOAD RX' }
    }]
  },
  {
    path: '',
    children: [{
        path: 'casedoc',
        component: CaseDocumentComponent,
        data: { title: 'Case', breadcrumb: 'UPLOAD IMPRESSION DOCUMENT' }
    }]
  },
  {
    path: '',
    children: [{
        path: 'viewimpdoc',
        component: ViewImpressionDocComponent,
        data: { title: 'View Impresionn Doc', breadcrumb: 'VIEW IMPRESSION DOCUMENT' }
    }]
  },
  {
    path: '',
    children: [{
        path: 'angularauto',
        component: AngularAutoComponent,
        data: { title: 'View Impresionn Doc', breadcrumb: 'VIEW IMPRESSION DOCUMENT' }
    }]
  }
];
