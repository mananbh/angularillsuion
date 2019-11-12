import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {GetcommdataService} from '../../../shared/services/getcommdata.service'
import { FormBuilder, FormGroup,FormControl,Validators} from '@angular/forms';
import { AppLoaderService } from '../../../shared/services/app-loader/app-loader.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-labtech-report',
  templateUrl: './labtech-report.component.html',
  styleUrls: ['./labtech-report.component.scss']
})
export class LabtechReportComponent implements OnInit {
  public selectedMoment2 = new FormControl(new Date());

  dataSource :any;
  flag:number =0;
  labgururepform: FormGroup;
  reporttype:[];
  location:[];
  employee:[];
  department:[];
  process:[];
  constructor(private getcommdata:GetcommdataService,private formbulider: FormBuilder,private loader: AppLoaderService,private datePipe: DatePipe) { 
  }

  ngOnInit() {
    this.getreporttypedata();
    this.getlocationdata();
    this.getemployeedata();
    this.getdepartmentdata();
    this.getprocessdata();
    this.labgururepform = this.formbulider.group({
      reptype: ['', [Validators.required]],
      locationget: ['', [Validators.required]],
      employeeid: ['', [Validators.required]],
      department: ['', [Validators.required]],
      process: ['', [Validators.required]],
      fromdate: ['', [Validators.required]],
      todate: ['', [Validators.required]],
    });
  }

  getreporttypedata(){
    this.getcommdata.getReportType().subscribe((data:any) => {
      this.dataSource = JSON.parse(data.objData); 
       this.reporttype =   this.dataSource.Data;
        this.flag =this.flag + 1;
       }
    );
  }
  getlocationdata(){
    this.getcommdata.getLocation().subscribe((data:any) => {
      this.dataSource = JSON.parse(data.objData); 
       this.location =   this.dataSource.Data;
       this.flag= this.flag + 1;
      
       }
    );
  }
  getemployeedata(){
    this.getcommdata.getEmployee().subscribe((data:any) => {
      this.dataSource = JSON.parse(data.objData); 
       this.employee =   this.dataSource.Data;
       this.flag=this.flag + 1;
       if( this.flag==5){
        this.loader.close();
        }else{
          this.loader.open();
        }
       }
    );
  }
  
  getdepartmentdata(){

    this.getcommdata.getDepartment().subscribe((data:any) => {
      this.dataSource = JSON.parse(data.objData); 
       this.department =   this.dataSource.Data;
       this.flag= this.flag + 1;;
       this.loader.close();
       }
    );
  }

  getprocessdata(){
    this.getcommdata.getProcess().subscribe((data:any) => {
      this.dataSource = JSON.parse(data.objData); 
       this.process =   this.dataSource.Data;
       this.flag= this.flag + 1;
       }       
    );
  }

  onFormSubmit() {
    var todatecontrol = this.datePipe.transform(this.labgururepform.value.todate,"dd-MM-yyyy H:mm");
    var fromdatecontrol = this.datePipe.transform(this.labgururepform.value.fromdate,"dd-MM-yyyy H:mm");
    this.labgururepform.addControl('todatenew', new FormControl('', Validators.required));
    this.labgururepform.addControl('fromdatenew', new FormControl('', Validators.required));
    this.labgururepform.patchValue({
      todatenew: todatecontrol, 
      fromdatenew: fromdatecontrol
    });
    const labgururepdata =  this.labgururepform.value;
    console.log(labgururepdata)
  }
}
