import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.template.html'
})
export class SidenavComponent {
  @Input('items') public menuItems: any[] = [];
  @Input('hasIconMenu') public hasIconTypeMenuItem: boolean;
  @Input('iconMenuTitle') public iconTypeMenuTitle: string;
  dynamincnav:[]=JSON.parse(localStorage.getItem('userData'));
  dynamincnavfetch = [];
  constructor() {}
  ngOnInit() {
    this.dynamincnavfetch = this.dynamincnav["Data"]["MenuDetailDTO_List"];
    console.log(this.dynamincnavfetch);
  }
//
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