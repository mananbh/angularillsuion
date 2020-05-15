import { Component, OnInit ,ChangeDetectorRef} from '@angular/core';
import {GetcommdataService} from '../../../shared/services/getcommdata.service'
import { FormBuilder, FormGroup,FormControl,Validators} from '@angular/forms';
import { AppLoaderService } from '../../../shared/services/app-loader/app-loader.service';
import { DatePipe } from '@angular/common';
import {AllCommunityModules} from '@ag-grid-community/all-modules';
import { HttpClient, HttpParams,HttpHeaders } from '@angular/common/http'; 
@Component({
  selector: 'app-downloadreport',
  templateUrl: './downloadreport.component.html',
  styleUrls: ['./downloadreport.component.scss']
})
export class DownloadreportComponent implements OnInit {
  downloadreports: FormGroup;
  UserID:any;
  UserName:any;
  customerreport :any;
  supplierreport :any;
  employeereport :any;
  dataSource:any;
  fromyear:any;
  toyear:any;
  DownloadReports:any;
  reportlist:any;
  constructor(private getcommdata:GetcommdataService,private formbulider: FormBuilder,private loader: AppLoaderService,private datePipe: DatePipe,private http: HttpClient,private changeDetector: ChangeDetectorRef) { }

  ngOnInit() {
    this.downloadreports = this.formbulider.group({
      ReportGroupID: ['', [Validators.required]],
      ReportID: ['', [Validators.required]],
      StatusID: ['', [Validators.required]],
      CustomerTD: ['', [Validators.required]],
      SupplierID: ['', [Validators.required]],
      EmployeeID: ['', [Validators.required]],
      FromDate: ['', [Validators.required]],
      ToDate: ['', [Validators.required]],
      RequestNo: ['', [Validators.required]],
    });

    let userdetails:[]=JSON.parse(sessionStorage.getItem('userData'));
    this.UserID  =userdetails["Data"]["LoginDetailsDTO_List"][0].LoginUserID;
    this.UserName   =userdetails["Data"]["LoginDetailsDTO_List"][0].LoginUser;


    this.getcustomerreport(62);
    this.getsupplierreport(61);
    this.getemployeereport(63);
    this.getallreportinlist(24009)
  }

  getcustomerreport(SituationID){
    this.getcommdata.getReportGenateData(SituationID).subscribe((data:any) => {
       this.customerreport =   data;
       }
    );
  }

  getsupplierreport(SituationID){
    this.getcommdata.getReportGenateData(SituationID).subscribe((data:any) => {
       this.supplierreport =   data;
       }
    );
  }
  getemployeereport(SituationID){
    this.getcommdata.getReportGenateData(SituationID).subscribe((data:any) => {
       this.employeereport =   data;
       }
    );
  }

  getallreportinlist(SoftwareSubComponentID){
    this.getcommdata.getallreportinlist(SoftwareSubComponentID).subscribe((data:any) => {
       this.reportlist =   data;
       this.changeDetector.detectChanges();
       console.log( this.reportlist);

       }
    );
  }

  getdownloadreport(){
    this.downloadreports.value.FromDate = this.datePipe.transform(this.downloadreports.value.FromDate,"yyyy-MM-dd");
    this.downloadreports.value.ToDate = this.datePipe.transform(this.downloadreports.value.ToDate,"yyyy-MM-dd");
    this.getcommdata.getDownloadReports(this.downloadreports.value).subscribe((data:any) => {
         this.DownloadReports =   data;
         }
      );
  }
  
  modules = AllCommunityModules;
  tablecolumn = [
    {headerName: 'RowNo', field: 'RowNo',filter: true, resizable: true,  width: 300,},
    {headerName: 'RequestNo', field: 'RequestNo',maxWidth:100, resizable: true},
    {headerName: 'ReportName', field: 'ReportName',maxWidth:100, resizable: true},
    {headerName: 'ParamName', field: 'ParamName',maxWidth:100, resizable: true},
    {headerName: 'ParamValue', field: 'RequestNo',maxWidth:100, resizable: true},
    {headerName: 'ReportStatus', field: 'mrStatus',maxWidth:100, resizable: true},
    {headerName: 'RequestDateTime', field: 'RequestDateTime',maxWidth:100, resizable: true},
    {headerName: 'RequestPickTime', field: 'RequestPickTime',maxWidth:100, resizable: true},
    {headerName: 'RequestCompletiontime', field: 'RequestCompletiontime',maxWidth:100, resizable: true},
    {headerName: 'RequestedBy', field: 'RequestedBy',maxWidth:100, resizable: true},
    {headerName: 'Path', field: 'mrdFileLocation',maxWidth:100, resizable: true,
    cellRenderer: function(params) {
      //return '<a href="'+params.value+'" target="_blank"><i class="glyphicon glyphicon-cloud"></i> </a>';
      return '<a href="'+params.value+'" target="_blank"><mat-icon class="mat-icon material-icons mat-icon-no-color" role="img" aria-hidden="true">cloud_download</mat-icon><i class="glyphicon glyphicon-cloud"></a>';    
      }  
    },
  ];


}
