import { Component, OnInit,EventEmitter ,ChangeDetectorRef,ViewChild} from '@angular/core';
import { FormBuilder, FormGroup,FormControl,Validators} from '@angular/forms';
import { HttpClient, HttpParams,HttpHeaders } from '@angular/common/http'; 
import { AlertService } from 'ngx-alerts';
import { FileUploader, FileItem} from 'ng2-file-upload';
import { AppLoaderService } from '../../../shared/services/app-loader/app-loader.service';
import { async } from '@angular/core/testing';
import {GetcommdataService} from '../../../shared/services/getcommdata.service'
import { Directive, AfterViewInit, ElementRef,Input } from '@angular/core';
import { environment } from '../../../../environments/environment';

import { timeout } from 'rxjs/operators';
@Component({
  selector: 'app-documntcollection',
  templateUrl: './documntcollection.component.html',
  styleUrls: ['./documntcollection.component.scss']
})
export class DocumntcollectionComponent implements OnInit {
  documentcoll: FormGroup;
  private API_URL= environment.apiURL;
  i = 0
  public uploader: FileUploader = new FileUploader({ url: this.API_URL+ '/PP/UploadDocumentCollection',
  formatDataFunction:async ,parametersBeforeFiles  : true,
  allowedMimeType: ['image/jpg', 'image/jpeg','image/png','image/bnp'],
});
  response:any;
  username :any;
  resetdata:any;
  dataSource:any;
  reporttype:any;
  ngselectloader:boolean;
  constructor(private loader: AppLoaderService,private getcommdata: GetcommdataService,private formbulider: FormBuilder,private http: HttpClient,private alerts: AlertService,private el: ElementRef,private changeDetector: ChangeDetectorRef) {
    this.uploader.onProgressItem = (progress: any) => this.changeDetector.detectChanges();

    this.username  = JSON.parse(sessionStorage.getItem('userData'));
    var userid = this.username.Data.LoginDetailsDTO_List[0].LoginUserID;
    this.uploader.onBeforeUploadItem = (item: FileItem) => {
      //this.loader.open();
      item.file.name = item.file.name;
      item.withCredentials = false;
      this.uploader.options.additionalParameter = {
       UserID: userid,
       CollectionTypeID:this.documentcoll.value.ReporttypeID,
       CollectionRemark:this.documentcoll.value.remarks,
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
     if(file.file.type!="image/jpg" && file.file.type!="image/jpeg"  && file.file.type!="image/png" && file.file.type!="image/bnp" ){
        this.alerts.danger("Only Image File can be accepted");
     //   this.myInputVariable.nativeElement.value = "";
      }
      file.file.name = "Doc" + this.i;
      console.log(file);
    }; 


    this.uploader.onSuccessItem=(item: any, response: any, status: any, headers: any)=>{
      this.loader.close();
      this.alerts.success(response.replace(/['"]+/g, ""));
    //  this.myInputVariable.nativeElement.value = "";
      this.uploader.removeFromQueue(item)
      this.changeDetector.detectChanges();
    }  
    
    this.uploader.onErrorItem = (item: any, response: any, status: any, headers: any)=> {
      this.loader.close();
      this.alerts.danger(response.replace(/['"]+/g, ""));
    //  this.myInputVariable.nativeElement.value = "";
      this.changeDetector.detectChanges();
    }


    this.uploader.onCompleteAll=()=>{
      this.loader.close();
      this.documentcoll.reset();

    }
  }

  ngOnInit() {
    this.documentcoll = this.formbulider.group({
      ReporttypeID: ['', [Validators.required]],
      remarks: ['', [Validators.required]],
    });
    this.getreporttype();
  }

  getreporttype(){
    this.ngselectloader = true;
    this.getcommdata.getReportTypeforDoc().subscribe((data:any) => {
         this.reporttype =   data;    
         this.ngselectloader = false; 
         this.documentcoll.controls['ReporttypeID'].setValue(this.reporttype[0].ID);
         this.changeDetector.detectChanges();

       }
    );
  }

  reset(){
    this.uploader.clearQueue();
  }

  

}
