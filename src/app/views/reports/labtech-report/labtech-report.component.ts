import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {map, startWith, filter} from 'rxjs/operators';
import {GetcommdataService} from '../../../shared/services/getcommdata.service'
import { FormBuilder, FormGroup,FormControl,Validators} from '@angular/forms';
import { AppLoaderService } from '../../../shared/services/app-loader/app-loader.service';
import { DatePipe } from '@angular/common';
import {AllCommunityModules} from '@ag-grid-community/all-modules';
import { MatSort, MatTableDataSource, MatPaginator } from '@angular/material';
import { HttpClient, HttpParams,HttpHeaders } from '@angular/common/http'; 


@Component({
  selector: 'app-labtech-report',
  templateUrl: './labtech-report.component.html',
  styleUrls: ['./labtech-report.component.scss']
})
export class LabtechReportComponent implements OnInit {
  movies$;

  dataSource :any;
  labgururepform: FormGroup;
  reporttype:[];
  location:[];
  employee:[];
  department:[];
  process:[];
  labgurureport:any[];
  todateagain:any;
  selected :any;
  EmployeeLoading = false;
  getlabdataSource : any;
  private gridApi;
  private gridColumnApi;
  private overlayLoadingTemplate;
  private overlayNoRowsTemplate;
  constructor(private getcommdata:GetcommdataService,private formbulider: FormBuilder,private loader: AppLoaderService,private datePipe: DatePipe,private http: HttpClient) { 

  }

  tablecolumn = [
    {headerName: 'EmployeeCode', field: 'Code',filter: true},
    {headerName: 'Employee', field: 'Employee',filter: true},
    {headerName: 'Date', field: 'Date', editable: true,filter: true},
    {headerName: 'TimeIn', field: 'TimeIn', editable: true,filter: true,
    cellRenderer: (data) => {
      return data.value ? (new Date(data.value)).toLocaleDateString() : '';
 }},

    {headerName: 'TimeOut', field: 'TimeOut', editable: true,filter: true},
    {headerName: 'TargetPoints', field: 'TargetPoints',filter: true},
    {headerName: 'Department', field: 'Department',filter: true},
    {headerName: 'Process', field: 'Process', editable: true,filter: true},
    {headerName: 'NewPoints', field: 'NewPoints', editable: true,filter: true},

    {headerName: 'OJPoints', field: 'OJPoints', editable: true,filter: true},

    {headerName: 'TotalPoints', field: 'TotalPoints', editable: true},
    {headerName: 'Location', field: 'Location', editable: true },
  
  ];

  modules = AllCommunityModules;

  ngOnInit() {
    this.getreporttypedata();
    this.getlocationdata();
    this.getemployeedata();
    this.getdepartmentdata();
 
    this.labgururepform = this.formbulider.group({
      ReporttypeID: ['', [Validators.required]],
      LocationID: ['', [Validators.required]],
      EmployeeID: ['', [Validators.required]],
      DepartmentID: ['', [Validators.required]],
      ProcessID: ['', [Validators.required]],
      FromDate: ['', [Validators.required]],
      ToDate: ['', [Validators.required]],
    });

  }

  getreporttypedata(){
    this.getcommdata.getReportType().subscribe((data:any) => {
      this.dataSource = JSON.parse(data.objData); 
       this.reporttype =   this.dataSource.Data;
       }
    );
  }
  getlocationdata(){
    this.getcommdata.getLocation().subscribe((data:any) => {
      this.dataSource = JSON.parse(data.objData); 
       this.location =   this.dataSource.Data;      
       }
    );
  }
  getemployeedata(){
    this.EmployeeLoading = true;
    this.getcommdata.getEmployee().subscribe((data:any) => {
      this.dataSource = JSON.parse(data.objData); 
       this.employee =   this.dataSource.Data;
       this.EmployeeLoading = false;
       }
    );
  }

  getdepartmentdata(){

    this.getcommdata.getDepartment().subscribe((data:any) => {
      this.dataSource = JSON.parse(data.objData); 
       this.department =   this.dataSource.Data;
       }
    );
  }

  onFormSubmit(event) {
        event.preventDefault();
      this.labgururepform.value.FromDate = this.datePipe.transform(this.labgururepform.value.FromDate,"yyyy-MM-dd H:mm:ss");
      this.labgururepform.value.ToDate = this.datePipe.transform(this.labgururepform.value.ToDate,"yyyy-MM-dd H:mm:ss");
  /*   this.labgururepform.addControl('FromDate', new FormControl('', Validators.required));
    this.labgururepform.addControl('ToDate', new FormControl('', Validators.required));
    this.labgururepform.patchValue({
      FromDate: this.todatecontrol, 
      ToDate:this.fromdatecontrol
    });
    this.labgururepform.removeControl('fromdate');
    this.labgururepform.removeControl('todate'); */
    //this.getlabgururepdata();
    const getlabgurudata = this.labgururepform.value
    //this.getlabgururepdata(getlabgurudata)

  }

   onChange() {
   this.getcommdata.getProcess(this.selected).subscribe((data:any) => {
    this.dataSource = JSON.parse(data.objData); 
     this.process =   this.dataSource.Data;
     }       
    );
  }

  getlabgururepdata(){

    this.labgururepform.value.FromDate = this.datePipe.transform(this.labgururepform.value.FromDate,"yyyy-MM-dd H:mm:ss");
    this.labgururepform.value.ToDate = this.datePipe.transform(this.labgururepform.value.ToDate,"yyyy-MM-dd H:mm:ss");
    this.labgururepform.value.ReporttypeID =3250

   /*  return new Promise(resolve => {
      //setTimeout(() => {
        this.getcommdata.getallpostdata().subscribe((data:any) => {
          this.dataSource = data; 
            this.labgurureport =  this.dataSource.Data;;
            console.log("called");
            console.log(this.dataSource);

           }
        );
     /// }, 1000);
    }); */

    const httpOptions = {headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    //this.getlabdataSource =   this.http.post(this.localurl+'/GetLabTechnicianPerformanceReport',this.labgururepform.value,httpOptions).map(res => res );
    ;

     /* this.http.post(this.localurl+'/GetLabTechnicianPerformanceReport',this.labgururepform.value,httpOptions).subscribe(
      (data :any)=> {
        this.dataSource = JSON.parse(data.objData)
          this.labgurureport =  this.dataSource.Data;;
          console.log("called");

         }
         ); */


     //    this.dataSource =  this.http.get('http://104.211.240.240/API/api/mAudit'+"/EmployeeInfo");
    
     this.getlabdataSource = this.getcommdata.fetchlabgurureport(this.labgururepform.value);
    console.log(  this.getlabdataSource);
}

onGridReady(params) {
  this.gridApi = params.api;
  this.gridColumnApi = params.columnApi;
  this.getcommdata.fetchlabgurureport(this.labgururepform.value);
  params.api.resetRowHeights();
}
   
  

  
  

}
