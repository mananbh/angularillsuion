import { Component, OnInit, ViewChild } from '@angular/core';
import { TablesService } from '../tables.service';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';

@Component({
  selector: 'app-material-table',
  templateUrl: './material-table.component.html',
  styleUrls: ['./material-table.component.scss']
})
export class MaterialTableComponent implements OnInit {
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  
  displayedColumns: string[] = [];
  dataSource: any;

  constructor(private tableService: TablesService) { }

  ngOnInit() {
    this.displayedColumns = this.tableService.getDataConf().map((c) => c.prop)
    //this.dataSource = new MatTableDataSource(this.tableService.getAll());
  }
  ngAfterViewInit() {
    //this.dataSource.paginator = this.paginator;
    //this.dataSource.sort = this.sort;
  }

  tablecolumn: string[] = ['officeCode', 'office', 'area', 'city_Name', 'station_Name', 'salesTerritory','doctors', 'addressDetail', 'contact_Detail', 'mobile_No', 'gsT_NO', 'paN_NO', 'sales_Zone',
  'warranty_Card_Preference'];
  getcustomerdata(){
   this.tableService.getallcustomerdatapostdata().subscribe((data:any[]) => {
     this.dataSource = new MatTableDataSource(data);      // on data receive populate dataSource.data array
      // console.log(  this.dataSource);
     this.dataSource.paginator = this.paginator;  
       this.dataSource.sort = this.sort;  
      }
   );
 }

}
