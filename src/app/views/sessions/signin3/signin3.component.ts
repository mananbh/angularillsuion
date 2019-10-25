import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { egretAnimations } from 'app/shared/animations/egret-animations';
import  {GetdatapiService} from '../../../shared/services/getdatapi.service'
import {  Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { AppLoaderService } from '../../../shared/services/app-loader/app-loader.service';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-signin3',
  templateUrl: './signin3.component.html',
  styleUrls: ['./signin3.component.scss'],
  animations: egretAnimations
})
export class Signin3Component implements OnInit {
  dataSource:any;

  public signupForm: FormGroup;
  constructor(private fb: FormBuilder,private getdata: GetdatapiService,private router: Router,private loader: AppLoaderService,public dialog: MatDialog) {}

  ngOnInit() {
    this.signupForm = this.fb.group({
      username: ["", Validators.required],
      password: ["", Validators.required]
    });
  }
  onSubmit() {
    if (this.signupForm.valid) {
      this.loader.open();
      // do what you want to do with your data
      this.getdata.doLogin(this.signupForm.value).pipe(first()).subscribe((data:any) => {
      this.dataSource = JSON.parse(data.objData); 
      if (this.dataSource.Data.LoginDetailsDTO_List[0].LoginUser.toLowerCase()==this.signupForm.value.username.toLowerCase()) {
        
          sessionStorage.setItem("Islogin",'true');
          localStorage.setItem('userData', JSON.stringify(this.dataSource));
          this.router.navigate(['/dashboard/analytics']);
        } else {
          this.loader.close();
          alert("Wrong Username and Password");
       }
     });
    }
  }

  ngOnDestroy() {
    // if (this.homePS) this.homePS.destroy();
    this.loader.close();
  }
}
