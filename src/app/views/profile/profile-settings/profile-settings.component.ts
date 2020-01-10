import { Component, OnInit } from '@angular/core';
import { FileUploader,FileItem } from 'ng2-file-upload';
import { environment } from '../../../../environments/environment';
import { AlertService } from 'ngx-alerts';

@Component({
  selector: 'app-profile-settings',
  templateUrl: './profile-settings.component.html',
  styleUrls: ['./profile-settings.component.css']
})
export class ProfileSettingsComponent implements OnInit {
  private API_URL= environment.apiURL;

  username:any;
  public uploader: FileUploader = new FileUploader({  url: this.API_URL+ '/PP/Upload_Profile'});
  public hasBaseDropZoneOver: boolean = false;
  constructor(private alerts: AlertService) { 
   
  }

  ngOnInit() {
    this.username  = JSON.parse(sessionStorage.getItem('userData'));
    var userid = this.username.Data.LoginDetailsDTO_List[0].LoginUserID;
    var code = this.username.Data.LoginDetailsDTO_List[0].Code;
    this.uploader.onBeforeUploadItem = (item: FileItem) => {
      console.log(item);
      //this.loader.open();
        item.withCredentials = false;
        this.uploader.options.additionalParameter = {
        userid: userid,
        code: code,
      };
   }

   this.uploader.onSuccessItem=(item: any, response: any, status: any, headers: any)=>{
    this.alerts.success("Image Uploaded Success fully kindly Login Again for changes");
    this.uploader.clearQueue();

   }

   this.uploader.onErrorItem = (item: any, response: any, status: any, headers: any)=> {
     this.alerts.danger("Image Not Upload kindly try again");
  //  this.myInputVariable.nativeElement.value = "";
  }

  this.uploader.onWhenAddingFileFailed= (item: any, filter: any, options: any) => {
    if(item.rawFile.type!="image/jpg" && item.rawFile.type!="image/jpeg"){
      this.alerts.info("Only Image with JPG/JPEG File can be accepted");
    //  this.myInputVariable.nativeElement.value = "";
    }
  }

  this.uploader.onAfterAddingFile = (file) => {
    file.withCredentials = false;
   if(file.file.type!="image/jpg" && file.file.type!="image/jpeg" ){
      this.alerts.info("Only Image with JPG/JPEG File can be accepted");
      this.uploader.clearQueue();
   //   this.myInputVariable.nativeElement.value = "";
    }
  }; 


  }
  public fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  

}
