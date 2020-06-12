import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import{LabtechReportComponent} from './labtech-report/labtech-report.component'
import { RouterModule } from '@angular/router';
import{ReportsRouting} from './reports.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {GetcommdataService} from '../../shared/services/getcommdata.service'
import { DatePipe } from '@angular/common';
import { AgGridModule } from '@ag-grid-community/angular';
import { GetreportdataapiService } from './getreportdataapi.service';
import { FileUploadModule } from 'ng2-file-upload';
//import { DataDialogOverviewComponent } from '../../../assets/examples/material/data-dialog/data-dialog-overview/data-dialog-overview.component'

import { 
  MatInputModule,
  MatDatepickerModule, 
  MatNativeDateModule,
  MatListModule,
  MatCardModule,
  MatProgressBarModule,
  MatRadioModule,
  MatCheckboxModule,
  MatButtonModule,
  MatIconModule,
  MatStepperModule,
  MatAutocompleteModule,
  MatFormFieldModule,
  MatSelectModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatMenuModule,
  MatSidenavModule,
  MatToolbarModule,
  MatGridListModule,
 MatTableModule,
 MatTabsModule

  
} from '@angular/material';
import { OwlDateTimeModule, OwlNativeDateTimeModule,OWL_DATE_TIME_LOCALE,OWL_DATE_TIME_FORMATS } from 'ng-pick-datetime';

import { FileUploadComponent } from '../forms/file-upload/file-upload.component';
import { AlertsModule ,AlertsService} from 'angular-alert-module';

import { FlexLayoutModule } from '@angular/flex-layout';
import { QuillModule } from 'ngx-quill';
import { NgSelectModule } from '@ng-select/ng-select';
import { AttendenceReportComponent } from './attendence-report/attendence-report.component';
import { CaseDocumentComponent } from './case-document/case-document.component';
export const MY_NATIVE_FORMATS = {
  fullPickerInput: {year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric'},
  datePickerInput: {year: 'numeric', month: 'numeric', day: 'numeric'},
  timePickerInput: {hour: 'numeric', minute: 'numeric'},
  monthYearLabel: {year: 'numeric', month: 'short'},
  dateA11yLabel: {year: 'numeric', month: 'long', day: 'numeric'},
  monthYearA11yLabel: {year: 'numeric', month: 'long'},
};
import { AlertModule,AlertService } from 'ngx-alerts';
import { ViewImpressionDocComponent } from './view-impression-doc/view-impression-doc.component';
import { AngularAutoComponent } from './angular-auto/angular-auto.component';
import {AutocompleteLibModule} from 'angular-ng-autocomplete';
import { PreRxFormComponent } from './pre-rx-form/pre-rx-form.component';
import { DocumntcollectionComponent } from './documntcollection/documntcollection.component';
import { ReportgenrateComponent } from './reportgenrate/reportgenrate.component';
import { DownloadreportComponent } from './downloadreport/downloadreport.component';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  declarations: [LabtechReportComponent,FileUploadComponent,AttendenceReportComponent, CaseDocumentComponent, ViewImpressionDocComponent, AngularAutoComponent, PreRxFormComponent, DocumntcollectionComponent, ReportgenrateComponent, DownloadreportComponent],
  imports: [
    CommonModule,
    MatInputModule,
    MatDatepickerModule, 
    MatNativeDateModule,
    MatListModule,
    MatCardModule,
    MatProgressBarModule,
    MatRadioModule,
    MatCheckboxModule,
    MatButtonModule,
    MatIconModule,
    MatStepperModule,
    FlexLayoutModule,
    QuillModule,
    FormsModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatSelectModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatMenuModule,
    MatSidenavModule,
    MatToolbarModule,
    MatGridListModule,
    NgSelectModule,
    OwlDateTimeModule, 
    OwlNativeDateTimeModule,
    MatTableModule,
    AgGridModule.withComponents([]),
    RouterModule.forChild(ReportsRouting),
    FileUploadModule,
    AlertModule.forRoot({maxMessages: 1, timeout: 3000, position: 'right'}),
    AutocompleteLibModule,
    MatTabsModule,
    PerfectScrollbarModule,
    ],
  providers: [
    { provide: GetcommdataService, useClass: GetcommdataService },
    {provide: OWL_DATE_TIME_LOCALE, useValue: 'en-SG'},
    {provide: OWL_DATE_TIME_FORMATS, useValue: MY_NATIVE_FORMATS},
    DatePipe,
    GetreportdataapiService,
    AlertService
    
  ],
  /* entryComponents: [
    DataDialogOverviewComponent
  ], */
})
export class ReportsModule { }
