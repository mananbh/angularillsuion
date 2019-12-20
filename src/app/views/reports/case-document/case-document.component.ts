import { Component, OnInit,EventEmitter ,ChangeDetectorRef} from '@angular/core';
import { FormBuilder, FormGroup,FormControl,Validators,FormArray } from '@angular/forms';
import { HttpClient, HttpParams,HttpHeaders } from '@angular/common/http'; 
import { AlertsService } from 'angular-alert-module';
import { FileUploader, FileItem} from 'ng2-file-upload';
import { AppLoaderService } from '../../../shared/services/app-loader/app-loader.service';
import { async } from '@angular/core/testing';
import {GetcommdataService} from '../../../shared/services/getcommdata.service'

@Component({
  selector: 'app-case-document',
  templateUrl: './case-document.component.html',
  styleUrls: ['./case-document.component.scss']
})
export class CaseDocumentComponent implements OnInit {
  uaturl = 'http://104.211.240.240/labguru_mobile';
  localurl = 'http://localhost:60531';
  liveurl = 'https://mobileapi.illusiondentallab.com/';
  demovmware = 'http://10.10.0.149/API'
  fetchimpresion: any;
  myModel: any;

  caseuploadform: FormGroup;
  submitted = false;
  messeges :string
  response:string;
  datasource:[];

  public uploader: FileUploader = new FileUploader({ url: this.demovmware+ '/api/PP/Upload_Case?FolderID=9',
  formatDataFunction:async ,parametersBeforeFiles  : true,
})
;
  console = console;
  savepreloadimage :any;

  constructor(private loader: AppLoaderService,private changeDetector: ChangeDetectorRef,private getcommdata: GetcommdataService,private formbulider: FormBuilder,private http: HttpClient,private alerts: AlertsService) { 
   
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

    this.alerts.setDefaults("timeout",1);
    this.uploader.clearQueue();
    this.uploader.response.subscribe( res => this.response = res );
    this.uploader.onProgressItem = (progress: any) => this.changeDetector.detectChanges();
    this.uploader.onAfterAddingFile = (file) => { 
      file.withCredentials = false;
      this.console.log(file);
    }; 

    
  }

  ngOnInit() {
    
  }
  onBlurMethod(event){
    event.stopPropagation();
    event.preventDefault();

    this.fetchimpresion = this.myModel;
    this.getcommdata.getimpresionno(this.fetchimpresion).subscribe(async(data:any) => {
      this.datasource = data;
     if(this.datasource.length==0){
      this.messeges = await "Impresion No Not Found";
      this.alerts.setMessage(this.messeges,'error');
      this.changeDetector.detectChanges();

     }else{
      this.messeges = await "Impresion No Found";
      this.alerts.setMessage(this.messeges,'success');
      this.changeDetector.detectChanges();

     } 
    this.console.log(this.messeges);
    },
   async error  => {
      this.messeges = await "Something wrong"; 
      this.alerts.setMessage(this.messeges,'error');
      this.changeDetector.detectChanges();
    },
     );
    }

    getuploadbutton(){
      if(this.datasource.length==0){
        return false
      }else{
        return true;
      }
    }
   //

}
