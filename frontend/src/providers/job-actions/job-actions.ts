//import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';

@Injectable()
export class JobActionsProvider {

  jobslist: any;
  failedjoblist: any;
  savedjoblist: any;

  constructor(public http: Http) {
    console.log('Hello JobActionsProvider Provider');
    this.jobslist = null;
    this.failedjoblist = null;
    this.savedjoblist = null;
  }
  //adding jobs from swiping cards from feeds page
  //posting applied job
  addJobList(jobitem) {
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    var selected = {
      companyTitle : jobitem.company,
      jobTitle : jobitem.jobtitle,
      location : jobitem.location
    }
    console.log(selected);
    return this.http.post('http://localhost:3000/api/appliedjobs', selected,{headers: headers})
    .map(res => res.json());
    // .subscribe(data => {
    //   this.jobslist = data;
    // });
  }

  //getting applied jobs form back-end
  getAppliedjobList() {
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.get('http://localhost:3000/api/appliedjobs',{headers: headers})
    .map(res => res.json());
  } 

  //getting failed job
  getfailedjobList() {
    if (this.failedjoblist) {
      return Promise.resolve(this.failedjoblist);
    }
    return new Promise( resolve => {
      let headers = new Headers();
      headers.append('Content-Type','application/json');
      this.http.get('http://localhost:3000/api/failedjobs',{headers: headers})
      .map(res => res.json())
      .subscribe(data => {
        this.failedjoblist = data;
        resolve(this.failedjoblist);
      });
    });
  } 

  //adding failed jobs
  addfailedJobList(jobitem) {
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    var failed = {
      companyTitle : jobitem.company,
      jobTitle : jobitem.jobtitle,
      location : jobitem.location
    }
    console.log(failed);
    this.http.post('http://localhost:3000/api/failedjobs', failed,{headers: headers})
    .map(res => res.json())
    .subscribe(data => {
      this.failedjoblist = data;
    });
  }
  
  //posting saved jobs in list
  addSavedjobList(jobdetails) {
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    let saveddetails = {
      companyTitle: jobdetails.company,
      jobTitle : jobdetails.jobtitle,
      location : jobdetails.location
    }
    console.log(jobdetails);
    this.http.post('http://localhost:3000/api/savedjobslist',saveddetails,{headers: headers})
    .map(res => res.json())
    .subscribe(data => {
      this.savedjoblist = data;
    });
  }

  //getting saved jobs
  getSavedjoblslist() {
    if (this.savedjoblist) {
      return Promise.resolve(this.savedjoblist);
    }
    return new Promise( resolve => {
      let headers = new Headers();
      headers.append('Content-Type','application/json');
      this.http.get('http://localhost:3000/api/savedjobslist',{headers: headers})
      .map(res => res.json())
      .subscribe(data => {
        this.savedjoblist = data;
        resolve(this.savedjoblist);
      });
    });
  }

  
}
