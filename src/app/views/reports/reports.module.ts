import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import{LabtechReportComponent} from './labtech-report/labtech-report.component'
import { RouterModule } from '@angular/router';
import{ReportsRouting} from './reports.routing';
@NgModule({
  declarations: [LabtechReportComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(ReportsRouting)
  ]
})
export class ReportsModule { }
