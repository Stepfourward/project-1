import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class JobsDataProvider {

  data: any;

  constructor(public http: Http) {
    this.data = null;
  }

  getJobDetails() {
    if(this.data) {
      return Promise.resolve(this.data);
    }
    return new Promise(resolve =>{
      let headers = new Headers();
      headers.append('Content-Type','application/json');
      this.http.get('http://localhost:3000/api/jobdetail',{headers: headers})
      .map(res => res.json())
      .subscribe(data => {
        this.data = data;
        resolve(this.data);
      });
    });
  }

  

}
