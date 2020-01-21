import { Component, OnInit, OnDestroy, AfterViewInit ,ChangeDetectorRef } from "@angular/core";
import { NavigationService } from "../../../shared/services/navigation.service";
import { ThemeService } from "../../services/theme.service";
import { Subscription } from "rxjs";
import { ILayoutConf, LayoutService } from "app/shared/services/layout.service";
import {  Router } from '@angular/router';
import { HttpClient, HttpParams,HttpHeaders } from '@angular/common/http'; 
import {GetcommdataService} from '../../../shared/services/getcommdata.service'

export interface logindetails {
  IPAddress: string; // Added
  LoginUserID: number;
  StatusID: boolean;
}
@Component({
  selector: "app-sidebar-side",
  templateUrl: "./sidebar-side.component.html"
})


export class SidebarSideComponent implements OnInit, OnDestroy, AfterViewInit {
  public menuItems: any[];
  public hasIconTypeMenuItem: boolean;
  public iconTypeMenuTitle: string;
  private menuItemsSub: Subscription;
  public layoutConf: ILayoutConf;
  dynamincnav:[]=JSON.parse(sessionStorage.getItem('userData'));
  dynamincnavfetch = [];
  dynamincnavfetchmenu = [];
  username : any;
  loginuserid :any;
  ipaddress:any;
  Logindetails: logindetails;
  constructor(
    private navService: NavigationService,
    public themeService: ThemeService,
    private layout: LayoutService,
    private changeDetector: ChangeDetectorRef,
    private router: Router,
    private getcommdata: GetcommdataService,
    private http: HttpClient,

  ) {}

  ngOnInit() {
    this.dynamincnavfetchmenu = this.dynamincnav["Data"]["MenuDetailDTO_List"];
    this.dynamincnavfetch = this.dynamincnav["Data"]["LoginDetailsDTO_List"][0]["Profile"];
    //console.log(this.dynamincnavfetch.length);
    this.username = this.dynamincnav["Data"]["LoginDetailsDTO_List"][0]["LoginUser"];
    this.loginuserid = this.dynamincnav["Data"]["LoginDetailsDTO_List"][0]["LoginUserID"];
    this.ipaddress = sessionStorage.getItem("ipaddress");
    //console.log(this.dynamincnavfetch);
    //this.iconTypeMenuTitle = this.navService.iconTypeMenuTitle;
    this.menuItemsSub = this.navService.menuItems$.subscribe(menuItem => {
      if(countInObject(this.dynamincnavfetchmenu)!==1){
        this.menuItems = menuItem;
      }else{
        this.menuItems =[];
      }
      //Checks item list has any icon type.
      this.hasIconTypeMenuItem = !!this.menuItems.filter(
        item => item.type === "icon"
      ).length;
    });
    this.layoutConf = this.layout.layoutConf;
    this.changeDetector.detectChanges();
    this.Logindetails = 
      {
        IPAddress: this.ipaddress,
        LoginUserID: this.loginuserid,
        StatusID:false
      }
  
    
  }
  ngAfterViewInit() {}
  ngOnDestroy() {
    if (this.menuItemsSub) {
      this.menuItemsSub.unsubscribe();
    }
  }
  toggleCollapse() {
    if (
      this.layoutConf.sidebarCompactToggle
    ) {
        this.layout.publishLayoutChange({
        sidebarCompactToggle: false
      });
    } else {
        this.layout.publishLayoutChange({
            // sidebarStyle: "compact",
            sidebarCompactToggle: true
          });
    }
  }

  signedout(){
    console.log(this.Logindetails);
    this.getcommdata.getsignoutlogin(this.Logindetails).subscribe();
    sessionStorage.setItem('isLoggedIn','false');
    sessionStorage.removeItem('userData');    
  }

   
}

function countInObject(obj) {
  var count = 0;
  // iterate over properties, increment if a non-prototype property
  for(var key in obj) if(obj.hasOwnProperty(key)) count++;
  return count;
}
