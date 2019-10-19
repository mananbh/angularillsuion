import { Component, OnInit, Input } from '@angular/core';
import { HttpClient, HttpParams,HttpHeaders } from '@angular/common/http'; 

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.template.html'
})
export class SidenavComponent {
  @Input('items') public menuItems: any[] = [];
  @Input('hasIconMenu') public hasIconTypeMenuItem: boolean;
  @Input('iconMenuTitle') public iconTypeMenuTitle: string;
  //menu detail stored in locastorage while login
  dynamicmenu: [] = JSON.parse(localStorage.getItem('userData'));
menulist :[];
  constructor(private http: HttpClient) {}
  ngOnInit() {
    console.log(this.dynamicmenu["Data"]["MenuDetailDTO_List"]);
    //menu is fetching here
    this.menulist = this.dynamicmenu["Data"]["MenuDetailDTO_List"]

  } 

  // Only for demo purpose
  addMenuItem() {
    this.menuItems.push({
      name: 'ITEM',
      type: 'dropDown',
      tooltip: 'Item',
      icon: 'done',
      state: 'material',
      sub: [
        {name: 'SUBITEM', state: 'cards'},
        {name: 'SUBITEM', state: 'buttons'}
      ]
    });
  }


}