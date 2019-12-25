import { Component, OnInit } from '@angular/core';
import {GetcommdataService} from '../../../shared/services/getcommdata.service'

@Component({
  selector: 'app-angular-auto',
  templateUrl: './angular-auto.component.html',
  styleUrls: ['./angular-auto.component.scss']
})
export class AngularAutoComponent implements OnInit {
  dataSource :any;
  constructor(private getcommdata: GetcommdataService) { }
  keyword = 'name';
  data = [
     {
       id: 1,
       name: 'Usa'
     },
     {
       id: 2,
       name: 'England'
     }
  ];
  ngOnInit() {
    
  }

  
  selectEvent(item) {
    // do something with selected item
  }
 
  onChangeSearch(val: string) {
    this.getcommdata.getallpostdata().subscribe(data => {
      this.dataSource = data
    });
  }
  
  onFocused(e){
    // do something when input is focused
    
  }

}
