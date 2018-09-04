import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class LinkedinPageProvider {

  constructor(public http: HttpClient) {
    console.log('Hello LinkedinPageProvider Provider');
  }

  // to get the api response(profile data) from linkedin
  gettheLinkedinUserDetails(token: any): Observable<any> {
    alert(token);
    let headers = new HttpHeaders();
    //headers.append('Content-Type', 'application/x-www-form-urlencoded');
    headers.append('Authorization','Bearer '+token);
    return this.http.get('https://api.linkedin.com/v1/people/~?format=json&oauth2_access_token='+token,{headers: headers})
    

  }

}
