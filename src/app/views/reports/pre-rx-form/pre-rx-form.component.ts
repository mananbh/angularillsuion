import { Component, OnInit,EventEmitter ,ChangeDetectorRef,ViewChild} from '@angular/core';
import { FormBuilder, FormGroup,FormControl,Validators,FormArray } from '@angular/forms';
import { HttpClient, HttpParams,HttpHeaders } from '@angular/common/http'; 
import { AlertService } from 'ngx-alerts';
import { FileUploader, FileItem} from 'ng2-file-upload';
import { AppLoaderService } from '../../../shared/services/app-loader/app-loader.service';
import { async } from '@angular/core/testing';
import {GetcommdataService} from '../../../shared/services/getcommdata.service'
import { isThisISOWeek } from 'date-fns';
import { environment } from '../../../../environments/environment';
import { Directive, AfterViewInit, ElementRef,Input } from '@angular/core';
import { timeout } from 'rxjs/operators';
import { DomSanitizer} from '@angular/platform-browser';
import { DatePipe } from '@angular/common';
import {AllCommunityModules} from '@ag-grid-community/all-modules';

@Component({
  selector: 'app-pre-rx-form',
  templateUrl: './pre-rx-form.component.html',
  styleUrls: ['./pre-rx-form.component.scss']
})

export class PreRxFormComponent implements OnInit {
/*   @ViewChild('myInput',{static: false})
myInputVariable: ElementRef; */
  private API_URL= environment.apiURL;
  i = 0;
  j = 0;
  submitted : any;

  public uploader: FileUploader = new FileUploader({ url: this.API_URL+ '/PP/UploadPerRx',
  formatDataFunction:async ,parametersBeforeFiles  : true,
  allowedMimeType: ['image/jpg', 'image/jpeg','image/png','image/bnp'],
});
  response:any;
  username :any;
  resetdata:any;
  localImageUrl:any=[];
  prerxform: FormGroup;
  dataSource:any;
  messeges:any;
  style = {
    width: '100%',
    height: '100%',
    flex: '1 1 auto'
};
  constructor(private loader: AppLoaderService,private changeDetector: ChangeDetectorRef,private getcommdata: GetcommdataService,private formbulider: FormBuilder,private http: HttpClient,private alerts: AlertService,private el: ElementRef,private sanitizer: DomSanitizer,private datePipe: DatePipe) { 
    this.uploader.onProgressItem = (progress: any) => this.changeDetector.detectChanges();

    this.username  = JSON.parse(sessionStorage.getItem('userData'));
    var userid = this.username.Data.LoginDetailsDTO_List[0].LoginUserID;
    this.uploader.onBeforeUploadItem = (item: FileItem) => {
      //this.loader.open();
      item.file.name = item.file.name;
      item.withCredentials = false;
      this.uploader.options.additionalParameter = {
       UserID: userid,
       type: item.file.type,
      };
    };

    this.uploader.onWhenAddingFileFailed= (item: any, filter: any, options: any) => {
      if(item.rawFile.type!="image/jpg" || item.rawFile.type!="image/jpeg" || item.rawFile.type!="image/png" || item.rawFile.type!="image/bnp"){
        this.alerts.danger("Only Image File can be accepted");
      //  this.myInputVariable.nativeElement.value = "";
      }
    }

    this.uploader.onAfterAddingFile = (file) => {
      this.i++
      file.withCredentials = false;
      console.log(file);
      if(file.file.type!="image/jpg" && file.file.type!="image/jpeg"  && file.file.type!="image/png" && file.file.type!="image/bnp" ){
          this.alerts.danger("Only Image File can be accepted");
      //   this.myInputVariable.nativeElement.value = "";
      }
      file.file.name = "PreRx" + this.i;
      console.log(file);
      let url =  this.sanitizer.bypassSecurityTrustUrl((window.URL) ? window.URL.createObjectURL(file._file) : (window as any).webkitURL.createObjectURL(file._file));
      this.localImageUrl[this.j] = url;
      console.log(this.localImageUrl);
      this.changeDetector.detectChanges();
      this.j++;
    }; 


    this.uploader.onSuccessItem=(item: any, response: any, status: any, headers: any)=>{
      this.loader.close();
      this.alerts.success(response.replace(/['"]+/g, ""));
      this.uploader.removeFromQueue(item)
      console.log(item);
      this.changeDetector.detectChanges();
     /*  this.localImageUrl = [];
      this.j--; */
    }  
    
    this.uploader.onErrorItem = (item: any, response: any, status: any, headers: any)=> {
      this.loader.close();
      this.alerts.danger(response.replace(/['"]+/g, ""));
      this.changeDetector.detectChanges();     
    }

    this.uploader.onCompleteAll=()=>{
      this.loader.close();
      this.getviewprexrxdetails();
      this.localImageUrl = [];
      this.j = 0;
    }
  }

  removeFile(item,k) {
    this.j--;
    this.localImageUrl.splice(k,1);
   console.log(this.localImageUrl);
    this.uploader.removeFromQueue(item);
  }


  reset(){
    this.uploader.clearQueue();
  }
  
  ngOnInit() {
    this.prerxform = this.formbulider.group({
      FromDate: ['', [Validators.required]],
    });
    let dynamincnav:[]=JSON.parse(sessionStorage.getItem('userData'));
    let dynamincnavfetch : [] =dynamincnav["Data"]["LoginDetailsDTO_List"][0].LoginUserID;

    var todaydate = new Date();
    this.prerxform.controls["FromDate"].setValue(todaydate);
    this.prerxform.value.FromDate = this.datePipe.transform(todaydate,"yyyy-MM-dd");

    this.prerxform.addControl('UserID', new FormControl());
    this.prerxform.controls["UserID"].setValue(dynamincnavfetch);
    this.getviewprexrxdetails();
    
  }

  modules = AllCommunityModules;
  tablecolumn = [
    {headerName: 'Pre RX No', field: 'TransactionNumber',filter: true, resizable: true,  width: 150},
    {headerName: 'Status', field: 'Status', width: 120, resizable: true},
    {headerName: 'Path', field: 'Path',maxWidth:10, resizable: true,
    cellRenderer: function(params) {
      //return '<a href="'+params.value+'" target="_blank"><i class="glyphicon glyphicon-cloud"></i> </a>';
      return '<a href="'+params.value+'" target="_blank"><mat-icon class="mat-icon material-icons mat-icon-no-color" role="img" aria-hidden="true">cloud_download</mat-icon><i class="glyphicon glyphicon-cloud"></a>';    
      }  
    },
  ];

  getviewprexrxdetails(){
  

    this.prerxform.value.FromDate = this.datePipe.transform(this.prerxform.value.FromDate,"yyyy-MM-dd");
     this.getcommdata.GetTotalPreRXUploaded(this.prerxform.value).subscribe(data => {
      this.loader.close();
      this.dataSource = data;
      this.changeDetector.detectChanges();
    },
    error  => {
      this.messeges =  "Something Went wrong check your internet or try again after sometime"; 
      this.loader.close();
      this.dataSource = []
      this.alerts.danger(this.messeges);
      this.changeDetector.detectChanges();
    },);
  }

/*  
  onFirstDataRendered(params) {
    params.api.sizeColumnsToFit();
  }
 */

}
