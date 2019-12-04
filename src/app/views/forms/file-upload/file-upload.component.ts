import { Component, OnInit,EventEmitter } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';


@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent implements OnInit {
  public uploader: FileUploader = new FileUploader({ url: 'http://localhost:60531/api/Aligners/Upload_Files_new?fileid=88' });
  public hasBaseDropZoneOver: boolean = false;
  console = console;
  constructor() { 
  }

  ngOnInit() {
    this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };
    /*  this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
         console.log('FileUpload:uploaded:', item, status, response);
         alert('File uploaded successfully');
     };  */
    this.uploader.onCompleteAll= () =>{
      alert("Successfull");
     }
  }

  public fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }
}
