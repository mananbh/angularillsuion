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
  fetchimpresion: '444';
  myModel: any;

  caseuploadform: FormGroup;
  submitted = false;
  messeges :string
  response:string;
  public uploader: FileUploader = new FileUploader({ url: this.uaturl+ '/api/PP/Upload_Rx?FolderID=8',
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
        parent_id: this.fetchimpresion
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
  onBlurMethod(){
    this.fetchimpresion = this.myModel;
    alert(this.fetchimpresion);
   }
  
}
