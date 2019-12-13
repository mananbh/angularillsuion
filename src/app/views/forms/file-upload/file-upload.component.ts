import { Component, OnInit,EventEmitter ,ChangeDetectorRef} from '@angular/core';
import { FileUploader, } from 'ng2-file-upload';
import { AppLoaderService } from '../../../shared/services/app-loader/app-loader.service';
import { async } from '@angular/core/testing';
import { FileUploadModule ,FileItem } from "ng2-file-upload";
import { FormBuilder, FormGroup,FormControl,Validators} from '@angular/forms';
import { DatePipe } from '@angular/common';
import {GetcommdataService} from '../../../shared/services/getcommdata.service'
import { HttpClient, HttpParams,HttpHeaders } from '@angular/common/http'; 
import {AllCommunityModules} from '@ag-grid-community/all-modules';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent implements OnInit {
    uaturl = 'http://104.211.240.240/labguru_mobile';
    localurl = 'http://localhost:60531';
    rximageupload: FormGroup;

    response:string;
    public uploader: FileUploader = new FileUploader({ url: this.localurl+ '/api/PP/Upload_Rx?FolderID=8',
    formatDataFunction:async ,autoUpload : false,
  })
  ;
    dataSource:[];
    public hasBaseDropZoneOver: boolean = false;
    console = console;
    savepreloadimage :any;
    dataSource2:any;
    fileHashes: string[] = [];
    getFileHash (file: File): string {
      return file.name;
     }
    constructor(private loader: AppLoaderService,private changeDetector: ChangeDetectorRef,private getcommdata: GetcommdataService,private formbulider: FormBuilder,private datePipe: DatePipe,private http: HttpClient) {  
      this.uploader.clearQueue();
      this.uploader.response.subscribe( res => this.response = res );
      this.uploader.onProgressItem = (progress: any) => this.changeDetector.detectChanges();
      this.uploader.onAfterAddingFile = (file) => { 
      file.withCredentials = false;
      const hash = this.getFileHash(file._file);
      this.console.log(this.dataSource);
      if(this.dataSource !== undefined){
      for(var i=0;i<this.dataSource.length;i++){
            var str : string = (this.dataSource[i]["ImageName"]) ;
            var index = str.localeCompare(file._file.name) 
            //var checkindex: number = this.uploader.queue.indexOf(file, 0);
              if(index  == 0){
                this.uploader.queue.push(file);
              }
        }
        if (this.fileHashes.indexOf(hash) !== -1) {
            this.fileHashes.push(hash);
        } else {
            this.uploader.removeFromQueue(file);
    
        }
      }else{
          setTimeout(function() { alert("Kindly Select data") }, 50);
        this.uploader.clearQueue();
      }
      
    }; 
    
  }


  modules = AllCommunityModules;
  tablecolumn = [
    {headerName: 'ImpressionNo', field: 'ImpressionNo',filter: true},
    {headerName: 'ImageName', field: 'ImageName',filter: true},
    {headerName: 'PhysicalFilePath', field: 'PhysicalFilePath', filter: true},
    {headerName: 'ImageAvailable', field: 'ImageAvailable',filter: true}
  ];

  ngOnInit() {
    this.rximageupload = this.formbulider.group({
    FromDate: ['', [Validators.required]],
    ToDate: ['', [Validators.required]],
  });

  this.rximageupload.addControl('OrganizationUnitID', new FormControl());
    this.rximageupload.addControl('CustomerID', new FormControl());
    this.rximageupload.addControl('ImpressionNo', new FormControl());
    this.rximageupload.addControl('Attribute', new FormControl());
    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
         console.log('FileUpload:uploaded:', item, status, response);
         this.savepreloadimage =  [];
     };

  
    this.uploader.onSuccessItem = (item: any, response: any, status: any, headers: any)=> {
        this.changeDetector.detectChanges();
    }

    this.uploader.onErrorItem = (item: any, response: any, status: any, headers: any)=> {
      this.changeDetector.detectChanges();
    }

  }
  public fileOverBase(e:any):void {
    this.hasBaseDropZoneOver = e;
  }

  getiamgename() {
    this.getcommdata.getimagenameapi(this.rximageupload.value).subscribe((data:[]) => {
    this.dataSource =data; 
      });
  }

    async  getrximagereport(){
      this.rximageupload.value.OrganizationUnitID = 7;
      this.rximageupload.value.CustomerID = 2059;
      this.rximageupload.value.ImpressionNo = "";
      this.rximageupload.value.Attribute = "";
      this.rximageupload.value.FromDate = this.datePipe.transform(this.rximageupload.value.FromDate,"yyyy-MM-dd");
      this.rximageupload.value.ToDate = this.datePipe.transform(this.rximageupload.value.ToDate,"yyyy-MM-dd");
      this.dataSource2 =  this.getcommdata.getimagenameapi(this.rximageupload.value).toPromise();
      this.getiamgename();
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

