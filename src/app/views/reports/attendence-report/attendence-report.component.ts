import { Component, OnInit } from '@angular/core';
import {GetreportdataapiService} from '../getreportdataapi.service'
import { FormBuilder, FormGroup,FormControl,Validators} from '@angular/forms';
import {AllCommunityModules} from '@ag-grid-community/all-modules';
import { getTreeNoValidDataSourceError } from '@angular/cdk/tree';
import { AppLoaderService } from '../../../shared/services/app-loader/app-loader.service';

@Component({
  selector: 'app-attendence-report',
  templateUrl: './attendence-report.component.html',
  styleUrls: ['./attendence-report.component.scss']
})
export class AttendenceReportComponent implements OnInit {
  modules = AllCommunityModules;
  attendencerep: FormGroup;
  gridApi: any;
  gridColumnApi: any;
  private icons;
  private domLayout;

  private columnDefs;
  private rowClassRules;
  private overlayLoadingTemplate;



  constructor(private getreportata:GetreportdataapiService,private formbulider: FormBuilder,private loader: AppLoaderService) {
    this.columnDefs = [
      {headerName: 'EmployeeCode', field: 'EmployeeCode',filter: true,
      children:[
        {headerName: 'Status', field: 'Flag',valueFormatter: currencyFormatter},
        {headerName: 'Employee', field: 'Employee',filter: true},
      ],
      
    },
      {headerName: 'Employee', field: 'Employee',filter: true},
      {headerName: 'DateTime', field: 'DateTime', editable: true,filter: true},
      {headerName: 'Flag', field: 'Flag', editable: true,filter: true,
      cellStyle: function(params) {
        if (params.value=='UnSuccessful') {
          return {color: 'red'};
           } else {
              return null;
           }
        },
        icons: {
          menu: '<i class="fa fa-shower"/>'
        },   
      },
    ];
    this.domLayout = "autoHeight";
    this.rowClassRules = {
      "sick-days-warning": function(params) {
        var numSickDays = params.data.Flag;
        return numSickDays == 'Successful'
      },
      "sick-days-breach": "data.Flag  == 'UnSuccessful'"
    };
    this.overlayLoadingTemplate =
    '<span class="ag-overlay-loading-center">Please wait while your rows are loading</span>';

   }

  ngOnInit() { 
    this.attendencerep = this.formbulider.group({
      Inout: ['', [Validators.required]]
    });
  }

  getattendencereportdata:any;

   getattendencereport(){
     this.getattendencereportdata = this.getreportata.fetchattendencerep(this.attendencerep.value);
   }



   onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    params.api.resetRowHeights();

  }
}

function currencyFormatter(params) {
  return "rs" + params.value;
}

/*cellRenderer: function(params: { value: string; }) {
  return '<span><i class="material-icons">edit</i>' + params.value + '</span>'
} }*/
