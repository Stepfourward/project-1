import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { RegisterPage } from '../register/register';
import { LoginPage } from '../login/login';
import { LocationPage} from '../location/location';
import { PolicyPage } from '../policy/policy';
import { TermsofusagePage } from '../termsofusage/termsofusage';
import { LinkedIn, LinkedInLoginScopes } from '@ionic-native/linkedin';
import { AuthService } from '../../services/auth.service';
import { AlertController } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { Http,Headers } from '@angular/http';

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
  redirect_uri = "sf://sfapp.com/callback";
  state = 'hjfdhjGj12j';
  appScope = 'r_basicprofile';

  constructor(public navCtrl: NavController, private  linkedin: LinkedIn, private authservices: AuthService,
    private alertCtrl: AlertController, private http: Http, private platform: Platform,
    private iab: InAppBrowser) {

    this.platform = platform;
    this.http = http;

  }

  ionViewDidLoad() {
    // this.linkedin.hasActiveSession().then((active) => {
    //   this.isLoggedIn = active;
    //   if(this.isLoggedIn === true) {
    //     this.getSelfData();
    //   }
    // });
    window.open('sf://sf-demoapp.com');
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
  // linkedin login
  linkedinLogin() {
    this.platform.ready().then(() => {
      this.linkedinPage().then(success => {
        alert(success.access_token);
      },(error) => {
        alert(error);
      });
    });
  }

  linkedinPage(): Promise<any> {
    var self = this;
    return new Promise((resolve, reject) => {
      var browserRef = window.cordova.iab.open('https://www.linkedin.com/uas/oauth2/authorization?client_id=' + this.clientId + '&redirect_uri=' + this.redirect_uri + '&scope=' + this.appScope + '&response_type=code&state=' + this.state, '_blank', 'location=no,clearsessioncache=yes,clearcache=yes');
      browserRef.addEventListener("loadstart", (event) => {
        if((event.url).indexOf(this.redirect_uri) === 0) {
          try {
            var requestToken = (event.url).split("code=")[1].split("&")[0];
            let headers = new Headers();
            headers.append('Content-Type', 'application/x-www-form-urlencoded');
            this.http.post("https://www.linkedin.com/oauth/v2/accessToken?client_id='81owhlvqu6ukaj'&client_secret='84AtzJD1H7YKiVIl'&redirect_uri=" + this.redirect_uri + "&grant_type=authorization_code&code=" + requestToken,
            {headers: headers})
            .subscribe(function(data){
              resolve(data);
              alert(data);
            })
          } catch(e) {
              setTimeout(function() {
                browserRef.close();
              }, 10);
            }
        }
        else {
          browserRef.addEventListener("exit", function(event) {
            reject("The linkedin sign in flow was canceled");
        });
        } 

      });
      

  });
  }

}
