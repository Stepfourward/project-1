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
    return this.http.get('https://api.linkedin.com/v1/people/~:(id,first-name,last-name,email-address,picture-url)?format=json&oauth2_access_token='+token,{headers: headers})
    
  }

  // sending linkedin profile data to database
  postLinkedinData(profileData) {
    let headers = new HttpHeaders();
    headers.append('Content-Type','application/json');
    return this.http.post('http://192.168.0.105:3000/api/linkedinuser',profileData,{headers: headers})
    
  }

  // facebook details to db -------------------------
  postFacebookData(userData) {
    //alert(userData);
    let headers = new HttpHeaders();
    headers.append('Content-Type','application/json');
    return this.http.post('http://192.168.0.105:3000/api/facebookuser',userData,{headers: headers})
  
  }

}
