import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators,FormControl } from '@angular/forms';
import { egretAnimations } from 'app/shared/animations/egret-animations';
import  {GetdatapiService} from '../../../shared/services/getdatapi.service'
import {  Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { AppLoaderService } from '../../../shared/services/app-loader/app-loader.service';
import { MatDialog } from '@angular/material';
import {GetcommdataService} from '../../../shared/services/getcommdata.service'
import { HttpClient, HttpParams,HttpHeaders } from '@angular/common/http'; 

@Component({
  selector: 'app-signin3',
  templateUrl: './signin3.component.html',
  styleUrls: ['./signin3.component.scss'],
  animations: egretAnimations
})
export class Signin3Component implements OnInit {
  dataSource:any;
  ipAddress:any;

  public signupForm: FormGroup;
  constructor(private fb: FormBuilder,private getdata: GetcommdataService,private router: Router,private loader: AppLoaderService,public dialog: MatDialog,private http: HttpClient) {
    this.http.get<{ip:string}>('https://jsonip.com')
    .subscribe( data => {
      this.ipAddress = data.ip
      sessionStorage.setItem("ipaddress",this.ipAddress);

    })

  }

  ngOnInit() {
    this.signupForm = this.fb.group({
      username: ["", Validators.required],
      password: ["", Validators.required]
    });
    this.signupForm.addControl('ipaddress', new FormControl());

  }
  onSubmit() {
    if (this.signupForm.valid) {
      this.signupForm.value.ipaddress =this.ipAddress;
      this.loader.open();
      // do what you want to do with your data
      this.getdata.doLogin(this.signupForm.value).pipe(first()).subscribe((data:any) => {
      this.dataSource = JSON.parse(data.objData); 
      console.log(this.dataSource);
      var usernamefromapi :string= this.dataSource.Data.LoginDetailsDTO_List[0].ValidationMsg;
      var usernamefromuser :string= this.signupForm.value.username;
      if (usernamefromapi=="") {
       // this.dynamincnavfetch = this.dynamincnav["Data"]["MenuDetailDTO_List"];
      var arraycount = countInObject(this.dataSource.Data.MenuDetailDTO_List)
          sessionStorage.setItem("Islogin",'true');
          sessionStorage.setItem('userData', JSON.stringify(this.dataSource));
          //this.router.onSameUrlNavigation = 'reload';
          if(arraycount==1){
            console.log(this.dataSource.Data.MenuDetailDTO_List[0])
            //this.router.navigate(['/reports/+?this.dataSource.Data.MenuDetailDTO_List[0].url']);
            this.router.navigate(['/reports/'+this.dataSource.Data.MenuDetailDTO_List[0]["url"]]);

          }else{
            this.router.navigate(['/dashboard/analytics']);

          }
        } else {
          this.loader.close();
          alert(usernamefromapi);
       }
     });
    }
  }

  ngOnDestroy() {
    // if (this.homePS) this.homePS.destroy();
    this.loader.close();
  }
}

//funtion to count multi dimensional array
function countInObject(obj) {
  var count = 0;
  // iterate over properties, increment if a non-prototype property
  for(var key in obj) if(obj.hasOwnProperty(key)) count++;
  return count;
}