import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { RegisterPage } from '../register/register';
import { LoginPage } from '../login/login';
import { LocationPage} from '../location/location';

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

}
