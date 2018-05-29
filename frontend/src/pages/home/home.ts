import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { RegisterPage } from '../register/register';
import { LoginPage } from '../login/login';
import { LocationPage} from '../location/location';
import { PolicyPage } from '../policy/policy';
import { TermsofusagePage } from '../termsofusage/termsofusage';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

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

}
