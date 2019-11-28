import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import{LabtechReportComponent} from './labtech-report/labtech-report.component'
import { RouterModule } from '@angular/router';
import{ReportsRouting} from './reports.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {GetcommdataService} from '../../shared/services/getcommdata.service'
import { DatePipe } from '@angular/common';
import { AgGridModule } from '@ag-grid-community/angular';
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
 MatTableModule 

  
} from '@angular/material';
import { OwlDateTimeModule, OwlNativeDateTimeModule,OWL_DATE_TIME_LOCALE,OWL_DATE_TIME_FORMATS } from 'ng-pick-datetime';


import { FlexLayoutModule } from '@angular/flex-layout';
import { QuillModule } from 'ngx-quill';
import { NgSelectModule } from '@ng-select/ng-select';
export const MY_NATIVE_FORMATS = {
  fullPickerInput: {year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric'},
  datePickerInput: {year: 'numeric', month: 'numeric', day: 'numeric'},
  timePickerInput: {hour: 'numeric', minute: 'numeric'},
  monthYearLabel: {year: 'numeric', month: 'short'},
  dateA11yLabel: {year: 'numeric', month: 'long', day: 'numeric'},
  monthYearA11yLabel: {year: 'numeric', month: 'long'},
};
@NgModule({
  declarations: [LabtechReportComponent],
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
    AgGridModule.withComponents([LabtechReportComponent]),
    RouterModule.forChild(ReportsRouting),
  ],
  providers: [
    { provide: GetcommdataService, useClass: GetcommdataService },
    {provide: OWL_DATE_TIME_LOCALE, useValue: 'en-SG'},
    {provide: OWL_DATE_TIME_FORMATS, useValue: MY_NATIVE_FORMATS},
    DatePipe
  ],
})
export class ReportsModule { }
