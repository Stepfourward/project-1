import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { RegisterPage } from '../register/register';
import { LoginPage } from '../login/login';
import { LocationPage} from '../location/location';
import { PolicyPage } from '../policy/policy';
import { TermsofusagePage } from '../termsofusage/termsofusage';
import { LinkedIn, LinkedInLoginScopes } from '@ionic-native/linkedin';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  scopes: LinkedInLoginScopes[] = ['r_basicprofile', 'r_emailaddress', 'rw_company_admin', 'w_share'];
  isLoggedIn: boolean = false;
  selfData = { id:"", firstName:"", lastName:"", emailAddress:"" };

  constructor(public navCtrl: NavController, private  linkedin: LinkedIn, private authservices: AuthService) {

  }

  ionViewDidLoad() {
    // this.linkedin.hasActiveSession().then((active) => {
    //   this.isLoggedIn = active;
    //   if(this.isLoggedIn === true) {
    //     this.getSelfData();
    //   }
    // });
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
    this.linkedin.login(this.scopes, true)
    .then(() => {
        this.isLoggedIn = true;
        this.getSelfData();
    })
    .catch(e => console.log('Error logging in', e));
  }

  // get data from linkedin
  getSelfData() {
    this.linkedin.getRequest('people/~')
        .then(res => {
            this.selfData = res;
            console.log(this.selfData);
            //this.authservices.linkedinAuth(this.selfData);
        })
        .catch(e => console.log(e));
  }


}
