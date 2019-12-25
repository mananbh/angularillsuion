import { Component, OnInit,EventEmitter ,ChangeDetectorRef} from '@angular/core';
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
  selector: 'app-case-document',
  templateUrl: './case-document.component.html',
  styleUrls: ['./case-document.component.scss']
})



export class CaseDocumentComponent implements OnInit {
  uaturl = 'http://104.211.240.240/labguru_mobile/api';
  localurl = 'http://localhost:60531';
  liveurl = 'https://mobileapi.illusiondentallab.com/api';
  demovmware = 'http://10.10.0.149/API/api'
  fetchimpresion: any;
  myModel: any;
  private focused: boolean = false;

  private API_URL= environment.apiURL;


  caseuploadform: FormGroup;
  submitted = false;
  messeges :string
  response:string;
  datasource:[];
  public uploader: FileUploader = new FileUploader({ url: this.API_URL+ '/PP/Upload_Case?FolderID=9',
  formatDataFunction:async ,parametersBeforeFiles  : true,
})
;
  console = console;
  savepreloadimage :any;

  constructor(private loader: AppLoaderService,private changeDetector: ChangeDetectorRef,private getcommdata: GetcommdataService,private formbulider: FormBuilder,private http: HttpClient,private alerts: AlertService,private el: ElementRef) { 

    this.uploader.onAfterAddingFile = (file) => { 
      file.withCredentials = false;
    };
    this.uploader.onBeforeUploadItem = (item: FileItem) => {
      item.withCredentials = false;
      this.uploader.options.additionalParameter = {
        name: item.file.name,
        Impresionno: this.fetchimpresion
      };
    };

    this.uploader.response.subscribe( res => this.response = res );
    this.uploader.onProgressItem = (progress: any) => this.changeDetector.detectChanges();
    this.uploader.onAfterAddingFile = (file) => { 
      file.withCredentials = false;
      this.console.log(file);
    }; 


    this.uploader.onCompleteAll = () => {
     this.alerts.success("File Uploaded Successfully");
      this.myModel ="";
      this.datasource = [];
      this.changeDetector.detectChanges();
      this.uploader.clearQueue();
    };
     
    /* this.uploader.onSuccessItem = (item: any, response: any, status: any, headers: any)=> {
    
    } */

    this.uploader.onErrorItem = (item: any, response: any, status: any, headers: any)=> {
     // this.alerts.setMessage("Something Wrong check your internet and later",'error');
      this.changeDetector.detectChanges();
    }
    
     if (!el.nativeElement['focus']) {
      throw new Error('Element does not accept focus.');
    }
  }

  ngOnInit() {

  }
  onBlurMethod(event){
    event.preventDefault();
    event.stopPropagation();
    this.fetchimpresion = this.myModel;
    if(this.fetchimpresion){
    this.getcommdata.getimpresionno(this.fetchimpresion).subscribe(async(data:any) => {
    this.datasource = data;
    if(this.datasource.length==0){
      this.myModel =""
      this.messeges = await "Impresion Number Not Found";
      this.alerts.warning(this.messeges);
      this.datasource = [];
      this.changeDetector.detectChanges();

     }else{
      this.messeges = await "Impresion Number Found";
      this.alerts.success(this.messeges);
      this.changeDetector.detectChanges();

     } 
      this.console.log(this.messeges);
    },
    async error  => {
      this.messeges = await "Something wrong"; 
      this.alerts.danger(this.messeges);
      this.changeDetector.detectChanges();
        },
     );
   }else{
    this.messeges ="Kindly Enter Impression number"; 
    this.alerts.info(this.messeges);
    this.changeDetector.detectChanges();
  }
  
}

    getuploadbutton(){
      if(this.datasource.length==0){
        return false
      }else{
        return true;
      }
    }

}



