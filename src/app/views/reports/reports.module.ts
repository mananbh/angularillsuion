import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import{LabtechReportComponent} from './labtech-report/labtech-report.component'
import { RouterModule } from '@angular/router';
import{ReportsRouting} from './reports.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {GetcommdataService} from '../../shared/services/getcommdata.service'

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
  
} from '@angular/material';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';


import { FlexLayoutModule } from '@angular/flex-layout';
import { QuillModule } from 'ngx-quill';
import { NgSelectModule } from '@ng-select/ng-select';

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
    RouterModule.forChild(ReportsRouting)
  ],
  providers: [
    { provide: GetcommdataService, useClass: GetcommdataService },
  ],
})
export class ReportsModule { }
