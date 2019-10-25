import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import{LabtechReportComponent} from './labtech-report/labtech-report.component'
import { RouterModule } from '@angular/router';
import{ReportsRouting} from './reports.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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


import { FlexLayoutModule } from '@angular/flex-layout';
import { QuillModule } from 'ngx-quill';
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
    RouterModule.forChild(ReportsRouting)
  ]
})
export class ReportsModule { }
