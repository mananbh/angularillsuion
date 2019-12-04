import { Injectable } from '@angular/core';
import { HttpClient, HttpParams,HttpHeaders } from '@angular/common/http'; 

@Injectable({
  providedIn: 'root'
})
export class GetdatapiService {
  //localpcurl = 'http://localhost:60531';
  //localurl = 'http://10.10.0.149/api/Login?usercode='
  serverloginurl ='http://104.211.240.240/labguru_mobile/Login?usercode='
  header : any;  
  dataSource:any;
  constructor(private http: HttpClient) { 
    const headerSettings: {[name: string]: string | string[]; } = {};  
    this.header = new HttpHeaders(headerSettings);  
  }

   //for login
   doLogin(data){
    return this.http.get(this.serverloginurl+data.username+'&password='+data.password+'&IPAddress=12.27382.4666');
  }


}
