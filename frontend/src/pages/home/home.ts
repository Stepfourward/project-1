import { Component } from '@angular/core';
import { NavController,Platform, IonicPage  } from 'ionic-angular';
import { RegisterPage } from '../register/register';
import { LoginPage } from '../login/login';
import { LocationPage} from '../location/location';
import { PolicyPage } from '../policy/policy';
import { TermsofusagePage } from '../termsofusage/termsofusage';
import { LinkedIn, LinkedInLoginScopes } from '@ionic-native/linkedin';
import { AuthService } from '../../services/auth.service';
import { AlertController } from 'ionic-angular';
import {Http, Headers} from '@angular/http';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { IonicPageModule  } from 'ionic-angular';
import { HttpClient,HttpHeaders } from '@angular/common/http';

declare var window: any;


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  
  scopes: LinkedInLoginScopes[] = ['r_basicprofile', 'r_emailaddress', 'rw_company_admin', 'w_share'];
  isLoggedIn: boolean = false;
  selfData = { id:"", firstName:"", lastName:"", emailAddress:"" };
  clientId = '81owhlvqu6ukaj';
  clientSecret = '84AtzJD1H7YKiVIl';
  redirect_uri = "http://localhost";
  state = 'hjfdhjGj12j';
  appScope = 'r_basicprofile';
  userData: any;
  linkedinURL: any;
  accessToken: any;
  result: any;

  constructor(public navCtrl: NavController, private  linkedin: LinkedIn, private authservices: AuthService,
  private alertCtrl: AlertController, private http: HttpClient, private platform: Platform,
  private iab: InAppBrowser) {

    this.platform = platform;
    this.http = http;
    this.linkedinURL = 'https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id='+this.clientId+'&redirect_uri='+this.redirect_uri+'&state='+this.state+'&scope='+this.appScope;

  }

  ionViewDidLoad() {
    
  }
  
  gotoSignpage() {

    this.navCtrl.push(LoginPage);

  }

  openRegisterPage() {
    this.navCtrl.push(RegisterPage);
  }
// redirect to policy page
  toPolicypage() {
    this.navCtrl.push(PolicyPage);
  }
  totermPage() {
    this.navCtrl.push(TermsofusagePage);
  }
  
  
  linkedinLogin() {
    return new Promise((resolve,reject) => {
      let browser = this.iab.create(this.linkedinURL,'_blank');
      let listner = browser.on('loadstart').subscribe((event: any) => {
        if(event.url.indexOf('oauth/v2/authorization') > -1){
          return;
        }
        if(event.url.indexOf(this.redirect_uri) > -1 ){
          listner.unsubscribe();
          browser.close();
          let token = event.url.split('=')[1].split('&')[0];
          this.accessToken = token;
          resolve(event.url);
          let headers = new Headers();
          headers.append('Content-Type', 'application/x-www-form-urlencoded');
          this.http.post<any>('https://www.linkedin.com/oauth/v2/accessToken?client_id='+this.clientId+'&client_secret='+this.clientSecret+'&grant_type=authorization_code&code='+this.accessToken+'&redirect_uri='+this.redirect_uri,{headers: headers})
          .subscribe(res => {
            this.result = res.json();
          } 
          );
          this.gettheLinkedinUserDetails(this.result["access_token"])
        } else {
          reject("Could not authenticate");
        }
      })
    })
  }

  gettheLinkedinUserDetails(token: string) {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    headers.append('Authorization','Bearer '+token);
    this.http.get('https://api.linkedin.com/v1/people/~:(id,first-name,last-name,email-address,picture-url)?format=json',{headers: headers})
    .subscribe(profileData => {
      alert(profileData + 'hii');
    })
  }


  
}
