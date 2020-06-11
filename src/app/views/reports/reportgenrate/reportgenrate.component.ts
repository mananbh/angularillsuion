import { Component, OnInit,ChangeDetectorRef,OnDestroy } from '@angular/core';
import {GetcommdataService} from '../../../shared/services/getcommdata.service'
import { FormBuilder, FormGroup,FormControl,Validators} from '@angular/forms';
import { AppLoaderService } from '../../../shared/services/app-loader/app-loader.service';
import { DatePipe } from '@angular/common';
import {AllCommunityModules} from '@ag-grid-community/all-modules';
import { HttpClient, HttpParams,HttpHeaders } from '@angular/common/http'; 
import { AlertService } from 'ngx-alerts';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-reportgenrate',
  templateUrl: './reportgenrate.component.html',
  styleUrls: ['./reportgenrate.component.scss']
})
export class ReportgenrateComponent implements OnInit,OnDestroy{
  dataSource :any;
  constructor(private getcommdata:GetcommdataService,private formbulider: FormBuilder,private loader: AppLoaderService,private datePipe: DatePipe,private http: HttpClient,private changeDetector: ChangeDetectorRef,private alertreq: AlertService) { }
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
  CustomerDescription:any="";
  SupplierDescription:any="";
  EmployeeDescription:any="";
  OUDescription:any;
  AllReportsData:any;
  messeges:any;
  customersubscribe : Subscription
  suppliersubscribe : Subscription
  employeesubscribe : Subscription
  filtersubscribe : Subscription
  reportsubscribe : Subscription
  LoginCompanyID:any;
  LoginRoleTypeID:any;
  LoginReferenceID:any;
  getCompanyid:any;
  getRoletypeid:any;
  getRefid:any;
  getLanguageID:any;
  CustomerLoading:any= true;
  accessfromdate:any;
  accesstodate:any;
  accesscustomer:any;
  accesssupplier:any;
  accessemployee:any;
  accessoou:any;
  accessfinanyear:any;
  accessToyear:any;
  accessfromyear:any;
  accessstatus:any;
  accessallreports:any;

  ngOnInit() {
    var todaydate = new Date();
    var onemonthbefordate =   new Date(new Date().setDate(todaydate.getDate()-30));
    this.registerreport = this.formbulider.group({
      CustomerTD: ['0'],
      SupplierID: ['0'],
      EmployeeID: ['0'],
      FinaYear: [''],
      FromYear: [''],
      ToYear: [''],
      FromDate: ['0', [Validators.required]],
      ToDate: ['0', [Validators.required]],
      OU: [''],
      ExportTo: [''],
    });
    this.registerreport.controls["FromDate"].setValue(onemonthbefordate);
    this.registerreport.controls["ToDate"].setValue(todaydate);
    let userdetails:[]=JSON.parse(sessionStorage.getItem('userData'));
    this.UserID  =userdetails["Data"]["LoginDetailsDTO_List"][0].LoginUserID;
    this.UserName   =userdetails["Data"]["LoginDetailsDTO_List"][0].LoginUser;
    this.LoginCompanyID   =userdetails["Data"]["LoginDetailsDTO_List"][0].LoginCompanyID;
    this.LoginRoleTypeID =userdetails["Data"]["LoginDetailsDTO_List"][0].RoleTypeID;
    this.LoginReferenceID =userdetails["Data"]["LoginDetailsDTO_List"][0].LoginReferenceID;

    console.log(userdetails["Data"]["LoginDetailsDTO_List"][0]);

    this.registerreport.addControl('UserID', new FormControl());
    this.registerreport.controls["UserID"].setValue(this.UserID);
   this.getcustomerreport(62);
   (this.getsupplierreport(61));
   (this.getemployeereport(63));
    (this.getallotherfilterdata());
   (this.getallreportinlist(24009));
   
  }

  getcustomerreport(SituationID){
    this.customersubscribe= this.getcommdata.getReportGenateData(SituationID).subscribe((data:any) => {
       this.customerreport =   data;
       this.CustomerLoading = false;
      this.changeDetector.detectChanges();
       }
    );
  }

  getsupplierreport(SituationID){
    let SupplierLoading = true;

    this.suppliersubscribe=  this.getcommdata.getReportGenateData(SituationID).subscribe((data:any) => {
       this.supplierreport =   data; 
       SupplierLoading = false;
       }
    );
  }
  getemployeereport(SituationID){
    let EmployeeLoading =  true;
     this.employeesubscribe =  this.getcommdata.getReportGenateData(SituationID).subscribe((data:any) => {
       this.employeereport =   data;
       EmployeeLoading =  false
       }
    );
  }
  getallotherfilterdata(){
  this.filtersubscribe=  this.getcommdata.getalldatafilterreport(0).subscribe((data:any) => {
      this.dataSource = JSON.parse(data.objData); 
       this.fromyear =   this.dataSource.Data.FromYear;
       this.toyear =   this.dataSource.Data.ToYear;
       this.getou =   this.dataSource.Data.GetOU;
       this.exportto =   this.dataSource.Data.ExportTo;  
       }
    );
  }

  getallreportinlist(SoftwareSubComponentID){
    let fieldlist
   this.reportsubscribe =  this.getcommdata.getallreportinlist(SoftwareSubComponentID).subscribe((data:any) => {
   
       this.reportlist =   data.GetChkReportsDetail;
       fieldlist =   data.GetChkReportsDetail1;
       this.accesscustomer =   fieldlist[0].IsRequire;
       this.accessfromdate =   fieldlist[1].IsRequire;
       this.accesstodate =   fieldlist[2].IsRequire;
       this.accessallreports =   fieldlist[3].IsRequire;
       this.accessstatus =   fieldlist[4].IsRequire;
       this.accesssupplier =   fieldlist[5].IsRequire;
       this.accessemployee =   fieldlist[6].IsRequire;
       this.accessoou =   fieldlist[7].IsRequire;
       this.accessfinanyear =   fieldlist[8].IsRequire;
       this.accessToyear =   fieldlist[10].IsRequire;
       this.accessfromyear =   fieldlist[9].IsRequire;
       this.changeDetector.detectChanges();
       console.log(this.accessfromdate);
       console.log(fieldlist);

       }
    );
  }

  GetCustomerDesc(val){
    if(val){
      this.CustomerDescription = val.Description;
    }
  }
  GetEmployeeDesc(val){
    if(val){
    this.EmployeeDescription = val.Description;
    }
  }
  GetSupplierDesc(val){
    if(val){
    this.SupplierDescription = val.Description;
    }
  }
  GetOUDesc(val){
    if(val){
    this.OUDescription =  val.Description;
    }
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
      if(this.registerreport.value.FromDate > this.registerreport.value.ToDate){
        this.loader.close();
        this.alertreq.info("From Date should not be less than to date")
        return;
      }

       if(this.GetReportList.length == 0){
        this.alertreq.warning("Kindly select atleast one report")
        return;
       }
     var reportlisttostring = this.GetReportList.toString();
    var newchar = '$#$'
    var reportchangedformat = reportlisttostring.split(',').join(newchar);

    this.registerreport.value.FromDate = this.datePipe.transform(this.registerreport.value.FromDate,"yyyy-MM-dd");
    this.registerreport.value.ToDate = this.datePipe.transform(this.registerreport.value.ToDate,"yyyy-MM-dd");
  
     
    this.getfromdate = "Name='From Date' Code='mFromDate' Value='"+this.registerreport.value.FromDate+"' Caption='"+this.registerreport.value.FromDate+"'$#$"
    this.gettodate = "Name='Till Date' Code='mToDate' Value='"+this.registerreport.value.ToDate+"' Caption='"+this.registerreport.value.ToDate+"'$#$"
    this.getcustomer ="Name='Customer' Code= 'mCustomer' Value='"+this.registerreport.value.CustomerTD+"' Caption='"+this.CustomerDescription+"'$#$"
    this.getuser =" Name='User Name' Code='mUserName' Value='"+this.UserName+"' Caption='"+this.UserName+"'$#$"
    this.getfromyear =" Name='From Year' Code='mFromYear' Value='"+this.registerreport.value.FromYear+"' Caption='"+this.registerreport.value.FromYear+"'$#$"
    this.gettoyear =" Name='To Year' Code='mToYear' Value='"+this.registerreport.value.ToYear+"' Caption='"+this.registerreport.value.ToYear+"'$#$"
    this.getsupplier =" Name='Supplier' Code='mSupplier' Value='"+this.registerreport.value.SupplierID+"' Caption='"+this.SupplierDescription+"'$#$"
    this.getemployee =" Name='Employee' Code='mEmployee' Value='"+this.registerreport.value.EmployeeID+"' Caption='"+this.EmployeeDescription+"'$#$"
    this.getOU =" Name='OU' Code='OU' Value='"+this.registerreport.value.OU+"' Caption='"+this.registerreport.value.OU+"'$#$"
    this.getCompanyid =" Name='LoginCompanyID' Code='mLoginCompanyID' Value='"+this.LoginCompanyID+"' Caption='"+this.LoginCompanyID+"'$#$"
    this.getRoletypeid =" Name='LoginRoleTypeID' Code='mLoginRoleTypeID' Value='"+this.LoginRoleTypeID+"' Caption='"+this.LoginRoleTypeID+"'$#$"
    this.getRefid =" Name='LoginReferenceID' Code='mLoginReferenceID' Value='"+this.LoginReferenceID+"' Caption='"+this.LoginReferenceID+"'$#$"
    this.getLanguageID =" Name='LoginLanguageID' Code='mLoginLanguageID' Value='1' Caption='1'"
    this.filterallparam = this.getfromdate +this.gettodate+this.getcustomer+this.getuser+this.getfromyear+this.gettoyear+this.getsupplier+this.getemployee + this.getOU + this.getCompanyid + this.getRoletypeid+ this.getRefid+ this.getLanguageID;
    console.log( this.filterallparam);

    this.registerreport.addControl('Parameters', new FormControl());
    this.registerreport.controls["Parameters"].setValue(this.filterallparam);
  
    this.registerreport.addControl('ReportList', new FormControl());
    this.registerreport.controls["ReportList"].setValue(reportchangedformat);

    this.registerreport.addControl('ReportUserID', new FormControl());
    this.registerreport.controls["ReportUserID"].setValue(this.UserName);

      
    this.registerreport.addControl('ReportGroupID', new FormControl());
    this.registerreport.controls["ReportGroupID"].setValue(this.reportlist[0].GroupCode);

    this.getcommdata.getAllReportsInGrid(this.registerreport.value).subscribe((data:any) => {
        this.loader.open();
         this.AllReportsData =   data;
          this.alertreq.info("Report Genrated Successfully report no is  " + data[0]["MISRequestNo"])
          this.changeDetector.detectChanges();
          this.loader.close();

         },
         async error  => {
          this.messeges = await "Something wrong"; 
          this.alertreq.danger(this.messeges);
          this.changeDetector.detectChanges();
          this.loader.close();
          },
      );


  }
  ngOnDestroy(){
    if( this.customersubscribe ) this.customersubscribe.unsubscribe();
    if( this.employeesubscribe ) this.employeesubscribe.unsubscribe();
    if( this.reportsubscribe ) this.reportsubscribe.unsubscribe();
    if( this.filtersubscribe ) this.filtersubscribe.unsubscribe();
    if( this.suppliersubscribe ) this.suppliersubscribe.unsubscribe();
  }

  
}
