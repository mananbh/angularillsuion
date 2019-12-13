import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
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
  MatStepperModule
} from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { QuillModule } from 'ngx-quill';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { FileUploadModule } from 'ng2-file-upload';

import { BasicFormComponent } from './basic-form/basic-form.component';
import { RichTextEditorComponent } from './rich-text-editor/rich-text-editor.component';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { DatePipe } from '@angular/common';

import { FormsRoutes } from "./forms.routing";
import { WizardComponent } from './wizard/wizard.component';
import { OwlDateTimeModule, OwlNativeDateTimeModule ,OWL_DATE_TIME_LOCALE,OWL_DATE_TIME_FORMATS } from 'ng-pick-datetime';
import {GetcommdataService} from '../../shared/services/getcommdata.service'
import { AgGridModule } from '@ag-grid-community/angular';

export const MY_NATIVE_FORMATS = {
  fullPickerInput: {year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric'},
  datePickerInput: {year: 'numeric', month: 'numeric', day: 'numeric'},
  timePickerInput: {hour: 'numeric', minute: 'numeric'},
  monthYearLabel: {year: 'numeric', month: 'short'},
  dateA11yLabel: {year: 'numeric', month: 'long', day: 'numeric'},
  monthYearA11yLabel: {year: 'numeric', month: 'long'},
};

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatListModule,
    MatCardModule,
    MatDatepickerModule, 
    MatNativeDateModule,
    MatProgressBarModule,
    MatRadioModule,
    MatCheckboxModule,
    MatButtonModule,
    MatIconModule,
    MatStepperModule,
    FlexLayoutModule,
    QuillModule,
    NgxDatatableModule,
    FileUploadModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    AgGridModule.withComponents([]),
    RouterModule.forChild(FormsRoutes),

  ],
  declarations: [BasicFormComponent, RichTextEditorComponent, FileUploadComponent, WizardComponent],
  providers: [
    { provide: GetcommdataService, useClass: GetcommdataService },
    {provide: OWL_DATE_TIME_LOCALE, useValue: 'en-SG'},
    {provide: OWL_DATE_TIME_FORMATS, useValue: MY_NATIVE_FORMATS},
    DatePipe,
  ],
})
export class AppFormsModule { }