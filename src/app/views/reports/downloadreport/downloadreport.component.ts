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
  Misreport:any;
  Status:any;
  MisGroupReport:any;
  CustomerLoading:any= true;

  constructor(private getcommdata:GetcommdataService,private formbulider: FormBuilder,private loader: AppLoaderService,private datePipe: DatePipe,private http: HttpClient,private changeDetector: ChangeDetectorRef) { }

  ngOnInit() {
    var todaydate = new Date();
    var onemonthbefordate =   new Date();
    this.downloadreports = this.formbulider.group({
      ReportGroupID: ['', [Validators.required]],
      ReportID: ['0'],
      StatusID: ['99'],
      CustomerTD: [''],
      SupplierID: [''],
      EmployeeID: [''],
      FromDate: ['0', [Validators.required]],
      ToDate: ['0', [Validators.required]],
      RequestNo: ['0'],
    });

    let userdetails:[]=JSON.parse(sessionStorage.getItem('userData'));
    this.UserID  =userdetails["Data"]["LoginDetailsDTO_List"][0].LoginUserID;
    this.UserName   =userdetails["Data"]["LoginDetailsDTO_List"][0].LoginUser;
    this.downloadreports.controls["FromDate"].setValue(onemonthbefordate);
    this.downloadreports.controls["ToDate"].setValue(todaydate);
    this.downloadreports.addControl('LoginUserID', new FormControl());
    this.downloadreports.controls["LoginUserID"].setValue(this.UserID);

    this.getcustomerreport(62);
    this.getsupplierreport(61);
    this.getemployeereport(63);
    this.getallotherfilterdata(0);
  }

  getcustomerreport(SituationID){
    this.getcommdata.getReportGenateData(SituationID).subscribe((data:any) => {
       this.customerreport =   data;
       this.CustomerLoading =  false
       this.changeDetector.detectChanges();

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


  getdownloadreport(){
    this.loader.open();
    this.downloadreports.value.FromDate = this.datePipe.transform(this.downloadreports.value.FromDate,"yyyy-MM-dd");
    this.downloadreports.value.ToDate = this.datePipe.transform(this.downloadreports.value.ToDate,"yyyy-MM-dd");
    this.getcommdata.getDownloadReports(this.downloadreports.value).subscribe((data:any) => {
         this.DownloadReports =   data;
         this.changeDetector.detectChanges();
         this.loader.close();

         }
      );
  }

  getallotherfilterdata(GroupComponentID){
    this.getcommdata.getalldatafilterreport(GroupComponentID).subscribe((data:any) => {
      this.dataSource = JSON.parse(data.objData); 
       this.Status =   this.dataSource.Data.Status;
       this.MisGroupReport =   this.dataSource.Data.Misreportgroup;
       }
    );
  }

  getMisReportByGroupID(GroupComponentID){
    this.getcommdata.getalldatafilterreport(GroupComponentID).subscribe((data:any) => {
       this.Misreport =   this.dataSource.Data.Misreport;
       console.log(this.Misreport);

       }
    );
  }
  
  modules = AllCommunityModules;
  tablecolumn = [
    
    {headerName: 'RowNo', field: 'RowNo',filter: true, resizable: true,  width: 300,},
    {headerName: 'RequestNo', field: 'RequestNo',maxWidth:100, resizable: true},
    {headerName: 'ReportStatus', field: 'mrStatus',maxWidth:100, resizable: true},
    {headerName: 'Path', field: 'mrdFileLocation',maxWidth:100, resizable: true,
    cellRenderer: function(params) {
      //return '<a href="'+params.value+'" target="_blank"><i class="glyphicon glyphicon-cloud"></i> </a>';
      if(params.value !== ""){
      return '<a href="'+params.value+'" target="_blank"><mat-icon class="mat-icon material-icons mat-icon-no-color" role="img" aria-hidden="true">cloud_download</mat-icon><i class="glyphicon glyphicon-cloud"></a>';    
      }
    }
    },
    {headerName: 'ReportName', field: 'ReportName',maxWidth:100, resizable: true},
    {headerName: 'ParamName', field: 'ParamName',maxWidth:100, resizable: true},
    {headerName: 'ParamValue', field: 'RequestNo',maxWidth:100, resizable: true},
    {headerName: 'RequestDateTime', field: 'RequestDateTime',maxWidth:100, resizable: true},
    {headerName: 'RequestPickTime', field: 'RequestPickTime',maxWidth:100, resizable: true},
    {headerName: 'RequestCompletiontime', field: 'RequestCompletiontime',maxWidth:100, resizable: true},
    {headerName: 'RequestedBy', field: 'RequestedBy',maxWidth:100, resizable: true},
  
    
  ];

  getReportsData(value:any){
    if(value){
    this.getMisReportByGroupID(value.ID);
    }else{
      this.downloadreports.controls["ReportID"].setValue('');

      this.Misreport = [];
    }
  }
  omit_special_char(event)
{   
  const charCode = (event.which) ? event.which : event.keyCode;
  if (charCode > 31 && (charCode < 48 || charCode > 57)) {
    return false;
  }
  return true;
}

}
