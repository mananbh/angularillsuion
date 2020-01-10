import { Component, OnInit, Input} from '@angular/core';
import { HttpClient, HttpParams,HttpHeaders } from '@angular/common/http'; 

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.template.html'
})
export class SidenavComponent {
  @Input('items') public menuItems: any[] = [];
  
  @Input('hasIconMenu') public hasIconTypeMenuItem: boolean;
  @Input('iconMenuTitle') public iconTypeMenuTitle: string;
  dynamincnav:[]=JSON.parse(sessionStorage.getItem('userData'));
  dynamincnavfetch = [];
  //menuItems: any[] = [];

  constructor() {}
  ngOnInit() {

    this.dynamincnavfetch = this.dynamincnav["Data"]["MenuDetailDTO_List"];
    //alert(countInObject(this.dynamincnavfetch));
    console.log(this.dynamincnavfetch);
   if(countInObject(this.dynamincnavfetch)==1){
      this.addMenuItem();
    };
  }

  
//
  // Only for demo purpose
  addMenuItem() {
    this.menuItems.push({
      name: this.dynamincnavfetch[0]["name"],
      type: 'singledropdown',
    tooltip: 'Item',
    icon: 'accessibility',
    state: 'reports',
      sub:this.dynamincnavfetch[0]["url"]
    });
  }


}
function countInObject(obj) {
  var count = 0;
  // iterate over properties, increment if a non-prototype property
  for(var key in obj) if(obj.hasOwnProperty(key)) count++;
  return count;
}