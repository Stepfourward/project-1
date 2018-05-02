import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { LocationPage} from '../location/location';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  mail: string;
  password: string;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  gotoHomepage() {
  	this.navCtrl.push(HomePage);

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  onSignin() {

    



    this.navCtrl.push(LocationPage);
  }



}
