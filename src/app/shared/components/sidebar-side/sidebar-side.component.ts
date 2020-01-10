import { Component, OnInit, OnDestroy, AfterViewInit ,ChangeDetectorRef } from "@angular/core";
import { NavigationService } from "../../../shared/services/navigation.service";
import { ThemeService } from "../../services/theme.service";
import { Subscription } from "rxjs";
import { ILayoutConf, LayoutService } from "app/shared/services/layout.service";
import {  Router } from '@angular/router';

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
  username = [];
  constructor(
    private navService: NavigationService,
    public themeService: ThemeService,
    private layout: LayoutService,
    private changeDetector: ChangeDetectorRef,
    private router: Router,
  ) {}

  ngOnInit() {
    this.dynamincnavfetchmenu = this.dynamincnav["Data"]["MenuDetailDTO_List"];
    this.dynamincnavfetch = this.dynamincnav["Data"]["LoginDetailsDTO_List"][0]["Profile"];
    //console.log(this.dynamincnavfetch.length);
    this.username = this.dynamincnav["Data"]["LoginDetailsDTO_List"][0]["LoginUser"];
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
