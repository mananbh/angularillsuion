import { Component, OnInit, EventEmitter, Input, Output, Renderer2 } from '@angular/core';
import { ThemeService } from '../../services/theme.service';
import { LayoutService } from '../../services/layout.service';
import { TranslateService } from '@ngx-translate/core';
import { HttpClient, HttpParams,HttpHeaders } from '@angular/common/http'; 
import {GetcommdataService} from '../../../shared/services/getcommdata.service'

export interface logindetails {
  IPAddress: string; // Added
  LoginUserID: number;
  StatusID: boolean;
}
@Component({
  selector: 'app-header-side',
  templateUrl: './header-side.template.html'
})
export class HeaderSideComponent implements OnInit {
  @Input() notificPanel;
  public availableLangs = [{
    name: 'EN',
    code: 'en',
    flag: 'flag-icon-us'
  }, {
    name: 'ES',
    code: 'es',
    flag: 'flag-icon-es'
  }]
  currentLang = this.availableLangs[0];
  dynamincnav:[]=JSON.parse(sessionStorage.getItem('userData'));
  dynamincnavfetch = [];
  username:any;
  loginuserid :any;
  ipaddress:any;
  Logindetails: logindetails;
  public egretThemes;
  public layoutConf:any;
  constructor(
    private themeService: ThemeService,
    private layout: LayoutService,
    public translate: TranslateService,
    private renderer: Renderer2,
    private getcommdata: GetcommdataService,
    private http: HttpClient,

  ) {}
  ngOnInit() {
    this.dynamincnavfetch = this.dynamincnav["Data"]["LoginDetailsDTO_List"][0]["Profile"];
    this.username = this.dynamincnav["Data"]["LoginDetailsDTO_List"][0]["LoginUser"];
    this.loginuserid = this.dynamincnav["Data"]["LoginDetailsDTO_List"][0]["LoginUserID"];
    this.ipaddress = sessionStorage.getItem("ipaddress");
    console.log(this.dynamincnavfetch.length);
    this.egretThemes = this.themeService.egretThemes;
    this.layoutConf = this.layout.layoutConf;
    this.translate.use(this.currentLang.code);
    this.Logindetails = 
    {
      IPAddress: this.ipaddress,
      LoginUserID: this.loginuserid,
      StatusID:false
    }
  }
  setLang(lng) {
    this.currentLang = lng;
    this.translate.use(lng.code);
  }
  changeTheme(theme) {
    // this.themeService.changeTheme(theme);
  }
  toggleNotific() {
    this.notificPanel.toggle();
  }
  toggleSidenav() {
    if(this.layoutConf.sidebarStyle === 'closed') {
      return this.layout.publishLayoutChange({
        sidebarStyle: 'full'
      })
    }
    this.layout.publishLayoutChange({
      sidebarStyle: 'closed'
    })
  }

  toggleCollapse() {
    // compact --> full
    if(this.layoutConf.sidebarStyle === 'compact') {
      return this.layout.publishLayoutChange({
        sidebarStyle: 'full',
        sidebarCompactToggle: false
      }, {transitionClass: true})
    }

    // * --> compact
    this.layout.publishLayoutChange({
      sidebarStyle: 'compact',
      sidebarCompactToggle: true
    }, {transitionClass: true})

  }

  onSearch(e) {
    //   console.log(e)
  }

  signout(){
    console.log(this.Logindetails);
    this.getcommdata.getsignoutlogin(this.Logindetails).subscribe();
    sessionStorage.setItem('isLoggedIn','false');
    sessionStorage.removeItem('userData');    
   }
}