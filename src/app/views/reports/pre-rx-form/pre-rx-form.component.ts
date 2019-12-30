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
@Component({
  selector: 'app-pre-rx-form',
  templateUrl: './pre-rx-form.component.html',
  styleUrls: ['./pre-rx-form.component.scss']
})

export class PreRxFormComponent implements OnInit {
  @ViewChild('myInput',{static: false})
myInputVariable: ElementRef;
  private API_URL= environment.apiURL;
  public uploader: FileUploader = new FileUploader({ url: this.API_URL+ '/PP/UploadPerRx',
  formatDataFunction:async ,parametersBeforeFiles  : true,
  });
  response:any;
  username :any;
  constructor(private loader: AppLoaderService,private changeDetector: ChangeDetectorRef,private getcommdata: GetcommdataService,private formbulider: FormBuilder,private http: HttpClient,private alerts: AlertService,private el: ElementRef) { 
    this.username  = JSON.parse(sessionStorage.getItem('userData'));
    var userid = this.username.Data.LoginDetailsDTO_List[0].LoginUserID;
   
    this.uploader.onBeforeUploadItem = (item: FileItem) => {
      this.loader.open();
      item.withCredentials = false;
      this.uploader.options.additionalParameter = {
       UserID: userid,
       type: item.file.type,
      };
    };

    this.uploader.onAfterAddingFile = (file) => { 
      file.withCredentials = false;
    }; 


    this.uploader.onSuccessItem=(item: any, response: any, status: any, headers: any)=>{
      this.loader.close();
      this.alerts.success(response.replace(/['"]+/g, ""));
      this.myInputVariable.nativeElement.value = "";
      this.changeDetector.detectChanges();
    }  
    
    this.uploader.onErrorItem = (item: any, response: any, status: any, headers: any)=> {
      this.loader.close();
      this.alerts.danger(response.replace(/['"]+/g, ""));
      this.myInputVariable.nativeElement.value = "";
      this.changeDetector.detectChanges();
      this.uploader.clearQueue();

    }

    this.uploader.onCompleteAll=()=>{
      this.loader.close();
    }

 
  }

  reset(){
    this.myInputVariable.nativeElement.value = "";
    this.uploader.clearQueue();

  }
  ngOnInit() {
  }

}
