import { Component, OnInit,EventEmitter ,ChangeDetectorRef} from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { AppLoaderService } from '../../../shared/services/app-loader/app-loader.service';
import { async } from '@angular/core/testing';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent implements OnInit {
  response:string;
  public uploader: FileUploader = new FileUploader({ url: 'http://localhost:60531/api/PP/Upload_Rx?FolderID=8',
 formatDataFunction:async });

  public hasBaseDropZoneOver: boolean = false;
  console = console;
   constructor(private loader: AppLoaderService,private changeDetector: ChangeDetectorRef) {  
    this.uploader.response.subscribe( res => this.response = res );
    this.uploader.onProgressItem = (progress: any) => this.changeDetector.detectChanges();
  }

  ngOnInit() {
    this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };
    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
         console.log('FileUpload:uploaded:', item, status, response);
     };
    

    this.uploader.onSuccessItem = (item: any, response: any, status: any, headers: any)=> {
      this.changeDetector.detectChanges();
    }
    
  }

  
  public fileOverBase(e:any):void {
    this.hasBaseDropZoneOver = e;
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

}
