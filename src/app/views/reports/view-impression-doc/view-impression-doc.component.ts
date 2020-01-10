import { Component, OnInit,ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup,FormControl,Validators,FormArray } from '@angular/forms';
import { DatePipe } from '@angular/common';
import {GetcommdataService} from '../../../shared/services/getcommdata.service'
import {AllCommunityModules} from '@ag-grid-community/all-modules';
import { AlertService } from 'ngx-alerts';
import { AppLoaderService } from '../../../shared/services/app-loader/app-loader.service';
import { async } from '@angular/core/testing';

@Component({
  selector: 'app-view-impression-doc',
  templateUrl: './view-impression-doc.component.html',
  styleUrls: ['./view-impression-doc.component.scss']
})
export class ViewImpressionDocComponent implements OnInit {
  viewimpression: FormGroup;
  messeges : any;
  submitted : any;
  dataSource:any;
  private gridApi;
  private gridColumnApi;
  private defaultColDef;
  private rowData;

  modules = AllCommunityModules;
  tablecolumn = [
    {headerName: 'Impression No', field: 'ImpressionNo',filter: true, resizable: true,  
    minWidth:50,
  maxWidth:200},
    {headerName: 'File name', field: 'FileName',maxWidth:200, resizable: true},
    {headerName: 'Download', field: 'Download',maxWidth:200, resizable: true,
    cellRenderer: function(params) {
      //return '<a href="'+params.value+'" target="_blank"><i class="glyphicon glyphicon-cloud"></i> </a>';
      return '<a href="'+params.value+'" target="_blank"><mat-icon class="mat-icon material-icons mat-icon-no-color" role="img" aria-hidden="true">cloud_download</mat-icon><i class="glyphicon glyphicon-cloud"></a>';    
      }  
    },
  ];


  constructor(private loader: AppLoaderService,private changeDetector: ChangeDetectorRef,private getcommdata: GetcommdataService,private formbulider: FormBuilder,private datePipe: DatePipe,private alerts: AlertService) { 
    this.defaultColDef = { resizable: true };

  }

  ngOnInit() {
    this.loader.open();
    this.viewimpression = this.formbulider.group({
      FromDate: ['', [Validators.required]],
      ToDate: ['', [Validators.required]],
    });
    this.viewimpression.addControl('FolderID', new FormControl());
    this.viewimpression.controls["FolderID"].setValue(9);

    var todaydate = new Date();
    this.viewimpression.controls["FromDate"].setValue(todaydate);
    this.viewimpression.controls["ToDate"].setValue(todaydate);

    this.viewimpression.value.FromDate = this.datePipe.transform(todaydate,"yyyy-MM-dd");
    this.viewimpression.value.ToDate = this.datePipe.transform(todaydate,"yyyy-MM-dd");
    this.getcommdata.getviewimpresiondata(this.viewimpression.value).subscribe(data => {
      this.loader.close();
      this.dataSource = data;
      this.changeDetector.detectChanges();
    },
    error  => {
      this.loader.close();
      this.messeges =  "Something Went wrong check your internet or try again after sometime"; 
      this.alerts.danger(this.messeges);
      this.changeDetector.detectChanges();
    },
    );
   // this.viewimpression.value.FromDate = this.datePipe.transform(,"yyyy-MM-dd");
    //this.viewimpression.value.ToDate = this.datePipe.transform(this.viewimpression.value.ToDate,"yyyy-MM-dd");
  }

  getviewuploadimpression(){
    if(this.viewimpression.value.FromDate > this.viewimpression.value.ToDate){
      this.loader.close();
      this.alerts.info("From Date Cannot be more than to date")
      return; 
    }
    this.viewimpression.value.FromDate = this.datePipe.transform(this.viewimpression.value.FromDate,"yyyy-MM-dd");
    this.viewimpression.value.ToDate = this.datePipe.transform(this.viewimpression.value.ToDate,"yyyy-MM-dd");
     this.getcommdata.getviewimpresiondata(this.viewimpression.value).subscribe(data => {
      this.dataSource = data;
      this.changeDetector.detectChanges();
    },
    error  => {
      this.messeges =  "Something Went wrong check your internet or try again after sometime"; 
      this.alerts.danger(this.messeges);
      this.changeDetector.detectChanges();
    },);
  }

    onFirstDataRendered(params) {
      params.api.sizeColumnsToFit();
    }

}
