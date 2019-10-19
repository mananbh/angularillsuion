import { Component, OnInit, Input } from '@angular/core';

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
  constructor() {}
  ngOnInit() {
    this.dynamincnavfetch = this.dynamincnav["Data"]["MenuDetailDTO_List"];
    console.log(this.dynamincnavfetch);
    this.addMenuItem();

  }
//
  // Only for demo purpose
  addMenuItem() {
    this.menuItems.push({
      name: 'Production',
      type: 'menu',
      tooltip: 'Item',
      icon: 'accessibility',
      state: 'reports',
      sub:[
        {
          name: "Report",
          type: "menu",
          sub: this.dynamincnavfetch//data is fetching in the loop
        },
      ]
    });
  }
}