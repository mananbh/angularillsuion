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
@Component({
  selector: 'app-pre-rx-form',
  templateUrl: './pre-rx-form.component.html',
  styleUrls: ['./pre-rx-form.component.scss']
})

export class PreRxFormComponent implements OnInit {
/*   @ViewChild('myInput',{static: false})
myInputVariable: ElementRef; */
  private API_URL= environment.apiURL;
  i = 0
  public uploader: FileUploader = new FileUploader({ url: this.API_URL+ '/PP/UploadPerRx',
  formatDataFunction:async ,parametersBeforeFiles  : true,
  allowedMimeType: ['image/jpg', 'image/jpeg','image/png','image/bnp'],
});
  response:any;
  username :any;
  resetdata:any;
  constructor(private loader: AppLoaderService,private changeDetector: ChangeDetectorRef,private getcommdata: GetcommdataService,private formbulider: FormBuilder,private http: HttpClient,private alerts: AlertService,private el: ElementRef) { 
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
     if(file.file.type!="image/jpg" && file.file.type!="image/jpeg"  && file.file.type!="image/png" && file.file.type!="image/bnp" ){
        this.alerts.danger("Only Image File can be accepted");
     //   this.myInputVariable.nativeElement.value = "";
      }
      file.file.name = "PreRx" + this.i;
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
    }

   

  }


  reset(){
    this.uploader.clearQueue();
  }
  
  ngOnInit() {
  }

}
