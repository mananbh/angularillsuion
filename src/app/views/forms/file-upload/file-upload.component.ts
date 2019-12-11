import { Component, OnInit,EventEmitter ,ChangeDetectorRef} from '@angular/core';
import { FileUploader, } from 'ng2-file-upload';
import { AppLoaderService } from '../../../shared/services/app-loader/app-loader.service';
import { async } from '@angular/core/testing';
import { FileUploadModule ,FileItem } from "ng2-file-upload";

import {GetcommdataService} from '../../../shared/services/getcommdata.service'

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent implements OnInit {
    response:string;
    public uploader: FileUploader = new FileUploader({ url: 'http://localhost:60531/api/PP/Upload_Rx?FolderID=8',
    formatDataFunction:async });
    dataSource:any;
    public hasBaseDropZoneOver: boolean = false;
    console = console;
    savepreloadimage :any;

    constructor(private loader: AppLoaderService,private changeDetector: ChangeDetectorRef,private getcommdata: GetcommdataService) {  
    this.uploader.response.subscribe( res => this.response = res );
    this.uploader.onProgressItem = (progress: any) => this.changeDetector.detectChanges();
  }
  ngOnInit() {

this.uploader.onAfterAddingFile = (file) => { 
    file.withCredentials = false; 
      for(var i=0;i<this.dataSource.length;i++){
        if(this.dataSource[i]["ImageName"] == file._file.name){
          this.uploader.queue.push(file);
        }else{
        //  var index: number = this.uploader.queue.indexOf(file);
          //this.uploader.queue.splice(index, 1);
          this.uploader.queue.splice(i, this.uploader.queue.length);
        }
     }
  }; 
 
  /* this.uploader.onAfterAddingFile = ((value) => {
    value.withCredentials = false;
    this.uploader.setOptions({
        url: AppModule.API_URL + 'imageUpload',
        authToken: this.getToken()
    });
    value.upload();

    let name;

    value.onSuccess = (res) => {
        name = JSON.parse(res);
    };

    value.remove = () => {
        this.http.delete(AppModule.API_URL + 'delete/' + name).subscribe((res) => {
            var index: number = this.uploader.queue.indexOf(value, 0);
            if (index > -1) {
                this.uploader.queue.splice(index, 1);
            }
        });
    };

}) */

/*   this.uploader.onAfterAddingFile = (value) => {
    value.withCredentials = false;
    for(var i=0;i<this.dataSource.length;i++){
      if(this.dataSource[i]["ImageName"] == value._file.name){
    value.remove = () => {
            var index: number = this.uploader.queue.indexOf(value, 0);
            if (index > -1) {
                this.uploader.queue.splice(index, 1);
            }
    };
  }
} */

/* 
  this.uploader.onBeforeUploadItem = (file) => { file.withCredentials = false; 
      for(var i=0;i<this.dataSource.length;i++){
        if(this.dataSource[i]["ImageName"] !== file._file.name){
          this.uploader.removeFromQueue(file);
        }
     }
   }; */

    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
         console.log('FileUpload:uploaded:', item, status, response);
         this.savepreloadimage =  [];
     };

  
    this.uploader.onSuccessItem = (item: any, response: any, status: any, headers: any)=> {
        this.changeDetector.detectChanges();
    }

    this.getiamgename();
}

  
/*   onAfterAddingFile = (file) => {
    this.console.log(file);
    for(var i=0;i<this.dataSource.length;i++){

      if (this.dataSource[i]["ImageName"] == file._file.name){
        this.uploader.queue.push[this.dataSource[i]["ImageName"]]
      } 
  }
} */
  public fileOverBase(e:any):void {
    this.hasBaseDropZoneOver = e;
  }

    getiamgename() {
      this.getcommdata.getimagenameapi().subscribe((data:[]) => {
      this.dataSource =data; 
      });
    }

}

/*   this.uploader.onBuildItemForm = (fileItem: any, form: any) => {
    form.append('Field1', this.filedValue); //note comma separating key and value
    form.append('Field2', this.filedValue2);
   }; 
   
   this.uploader.onBuildItemForm = (fileItem: any, form: any) => {

      form.append('Year' , this.year);

      form.append(' Business' , this.business);

      form.append('Renewal' , this.renewal);

     };

    this.uploader.uploadAll();

    this.uploader.onSuccessItem = (item: any, response: string, status: number, headers: any): any => {

   if(response){

    console.log("response"+JSON.stringify(response));

  }

 }
   */

    /*  let latestFile = this.uploader.queue[this.uploader.queue.length-1]
           this.uploader.queue = []; 
           this.uploader.queue.push(latestFile); */
          //this.console.log(this.uploader.queue.length-1)


