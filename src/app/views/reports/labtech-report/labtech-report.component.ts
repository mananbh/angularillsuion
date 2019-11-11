import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {GetcommdataService} from '../../../shared/services/getcommdata.service'
export interface State {
  flag: string;
  name: string;
  population: string;
}

@Component({
  selector: 'app-labtech-report',
  templateUrl: './labtech-report.component.html',
  styleUrls: ['./labtech-report.component.scss']
})
export class LabtechReportComponent implements OnInit {
  stateCtrl = new FormControl();
  filteredStates: Observable<State[]>;
  dataSource :any;
  displaytype:[];
  constructor(private getcommdata:GetcommdataService) { 
  }

  ngOnInit() {
    this.getreporttypedata();
  }
  getreporttypedata(){
    this.getcommdata.getReportType().subscribe((data:any) => {
      this.dataSource = JSON.parse(data.objData); 
       this.displaytype =   this.dataSource.Data;
       }
    );
  }
}
