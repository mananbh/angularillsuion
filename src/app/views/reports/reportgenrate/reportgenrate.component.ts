import { Component, OnInit,ChangeDetectorRef } from '@angular/core';
import {GetcommdataService} from '../../../shared/services/getcommdata.service'
import { FormBuilder, FormGroup,FormControl,Validators} from '@angular/forms';
import { AppLoaderService } from '../../../shared/services/app-loader/app-loader.service';
import { DatePipe } from '@angular/common';
import {AllCommunityModules} from '@ag-grid-community/all-modules';
import { HttpClient, HttpParams,HttpHeaders } from '@angular/common/http'; 
@Component({
  selector: 'app-reportgenrate',
  templateUrl: './reportgenrate.component.html',
  styleUrls: ['./reportgenrate.component.scss']
})
export class ReportgenrateComponent implements OnInit {
  dataSource :any;
  constructor(private getcommdata:GetcommdataService,private formbulider: FormBuilder,private loader: AppLoaderService,private datePipe: DatePipe,private http: HttpClient,private changeDetector: ChangeDetectorRef) { }
  registerreport: FormGroup;
  customerreport :any;
  supplierreport :any;
  employeereport :any;
  fromyear :any;
  toyear :any;
  getou :any;
  exportto :any;
  reportlist :any;
  filterallparam:any;
  getcustomer:any;
  getfromdate:any;
  gettodate:any;
  getuser:any;
  UserID:any;
  getfromyear:any;
  gettoyear:any;
  UserName:any;
  getsupplier:any;
  getemployee:any;
  getOU:any;
  GetReportList :any =[];
  CustomerDescription:any;
  SupplierDescription:any;
  EmployeeDescription:any;
  OUDescription:any;
  AllReportsData:any;
  ngOnInit() {
    this.registerreport = this.formbulider.group({
      CustomerTD: ['', [Validators.required]],
      SupplierID: ['', [Validators.required]],
      EmployeeID: ['', [Validators.required]],
      FinaYear: ['', [Validators.required]],
      FromYear: ['', [Validators.required]],
      ToYear: ['', [Validators.required]],
      FromDate: ['', [Validators.required]],
      ToDate: ['', [Validators.required]],
      OU: ['', [Validators.required]],
      ExportTo: ['', [Validators.required]],
    });

    let userdetails:[]=JSON.parse(sessionStorage.getItem('userData'));
    this.UserID  =userdetails["Data"]["LoginDetailsDTO_List"][0].LoginUserID;
    this.UserName   =userdetails["Data"]["LoginDetailsDTO_List"][0].LoginUserID;

    console.log(userdetails["Data"]["LoginDetailsDTO_List"][0]);

    this.registerreport.addControl('UserID', new FormControl());
    this.registerreport.controls["UserID"].setValue(this.UserID);
    this.getcustomerreport(62);
    this.getsupplierreport(61);
    this.getemployeereport(63);
    this.getallotherfilterdata()
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
  getallotherfilterdata(){
    this.getcommdata.getalldatafilterreport().subscribe((data:any) => {
      this.dataSource = JSON.parse(data.objData); 
       this.fromyear =   this.dataSource.Data.FromYear;
       this.toyear =   this.dataSource.Data.ToYear;
       this.getou =   this.dataSource.Data.GetOU;
       this.exportto =   this.dataSource.Data.ExportTo;  
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

  GetCustomerDesc(name){
    this.CustomerDescription = name;
  }
  GetEmployeeDesc(name){
    this.EmployeeDescription = name;
  }
  GetSupplierDesc(name){
    this.SupplierDescription = name;
  }
  GetOUDesc(name){
    this.OUDescription = name;
  }

  getreport(){
    this.GetReportList=[];
    var reportlistdata = (<HTMLInputElement[]><any>document.getElementsByName("reportlistdata"));

    for (let i = 0; i < reportlistdata.length; i++) {
      if (reportlistdata[i].type == "checkbox") {
         if (reportlistdata[i].checked) {
            this.GetReportList.push(reportlistdata[i].value);
          }
        }
      }
     var reportlisttostring = this.GetReportList.toString();
    var newchar = '$#$'
    var reportchangedformat = reportlisttostring.split(',').join(newchar);

    this.registerreport.value.FromDate = this.datePipe.transform(this.registerreport.value.FromDate,"yyyy-MM-dd");
    this.registerreport.value.ToDate = this.datePipe.transform(this.registerreport.value.ToDate,"yyyy-MM-dd");

    this.getfromdate = "Name='From Date' Code='mFromDate' Value='"+this.registerreport.value.FromDate+"' Caption='"+this.registerreport.value.FromDate+"'$#$"
    this.gettodate = "Name='Till Date' Code='mToDate' Value='"+this.registerreport.value.ToDate+"' Caption='"+this.registerreport.value.ToDate+"'$#$"
    this.getcustomer ="Name='Customer' Code= 'mCustomer' Value='"+this.registerreport.value.CustomerTD+"' Caption='"+this.CustomerDescription+"'$#$"
    this.getuser =" Name'User Name' Code='mUserName' Value='"+this.UserID+"' Caption='"+this.UserName+"'"
    this.getfromyear =" Name'From Year' Code='mFromYear' Value='"+this.registerreport.value.FromYear+"' Caption='"+this.registerreport.value.FromYear+"'"
    this.gettoyear =" Name'To Year' Code='mToYear' Value='"+this.registerreport.value.ToYear+"' Caption='"+this.registerreport.value.ToYear+"'"
    this.getsupplier =" Name'Supplier' Code='mSupplier' Value='"+this.registerreport.value.SupplierID+"' Caption='"+this.SupplierDescription+"'"
    this.getemployee =" Name'Employee' Code='mEmployee' Value='"+this.registerreport.value.EmployeeID+"' Caption='"+this.EmployeeDescription+"'"
    this.getOU =" Name'Employee' Code='OU' Value='"+this.registerreport.value.OU+"' Caption='"+this.registerreport.value.OU+"'"
    this.filterallparam = this.getfromdate +this.gettodate+this.getcustomer+this.getuser+this.getfromyear+this.gettoyear+this.getsupplier+this.getemployee;
    console.log( this.filterallparam);

    this.registerreport.addControl('Parameters', new FormControl());
    this.registerreport.controls["Parameters"].setValue(this.filterallparam);
  
    this.registerreport.addControl('ReportList', new FormControl());
    this.registerreport.controls["ReportList"].setValue(reportchangedformat);

    this.registerreport.addControl('ReportUserID ', new FormControl());
    this.registerreport.controls["ReportUserID "].setValue(this.UserName);

      
    this.registerreport.addControl('ReportGroupID ', new FormControl());
    this.registerreport.controls["ReportGroupID "].setValue(this.reportlist[0].GroupCode);

    this.getcommdata.getAllReportsInGrid(this.registerreport.value).subscribe((data:any) => {
         this.AllReportsData =   data;
         }
      );

  }

  
}
