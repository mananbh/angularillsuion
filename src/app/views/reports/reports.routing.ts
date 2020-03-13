import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import{LabtechReportComponent} from './labtech-report/labtech-report.component';
import{AttendenceReportComponent} from './attendence-report/attendence-report.component';
import { FileUploadComponent } from '../forms/file-upload/file-upload.component';
import { CaseDocumentComponent } from './case-document/case-document.component';
import { ViewImpressionDocComponent } from './view-impression-doc/view-impression-doc.component';

import { PreRxFormComponent } from './pre-rx-form/pre-rx-form.component';
import { DocumntcollectionComponent } from './documntcollection/documntcollection.component';

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
        data: { title: 'Case', breadcrumb: 'UPLOAD CASE DOCUMENT' }
    }]
  },
  {
    path: '',
    children: [{
        path: 'viewimpdoc',
        component: ViewImpressionDocComponent,
        data: { title: 'View  Documents', breadcrumb: 'VIEW  DOCUMENTS' }
    }]
  },
  {
    path: '',
    children: [{
        path: 'prerxform',
        component: PreRxFormComponent,
        data: { title: 'UPLOAD PRE RX', breadcrumb: 'UPLOAD PRE RX' }
    }]
  },
  {
    path: '',
    children: [{
        path: 'documentcollection',
        component: DocumntcollectionComponent,
        data: { title: 'Document Upload', breadcrumb: 'Document Upload' }
    }]
  }
];
