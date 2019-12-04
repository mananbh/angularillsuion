import { Injectable } from '@angular/core';
import { HttpClient, HttpParams,HttpHeaders } from '@angular/common/http'; 

@Injectable({
  providedIn: 'root'
})
export class GetreportdataapiService {
localurl= "http://10.10.0.149/API"
serveurl = 'http://104.211.240.240/labguru_mobile';

  constructor(private http:HttpClient) { }


  fetchattendencerep(getlabgurudata) {
    const httpOptions = {headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return  this.http.post(this.serveurl+'/GetEmployeeAttendanceLog',getlabgurudata,httpOptions);
  } 


}
