import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { LocationPage} from '../location/location';
import { ValidateService } from '../../services/validate.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import {AuthService} from '../../services/auth.service';

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

  username: String;
  password: String;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private validateService: ValidateService,
    private flashMessage:FlashMessagesService,
    private authService:AuthService,) {
  }

  gotoHomepage() {
  	this.navCtrl.push(HomePage);

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  onLoginSubmit(){
    const user = {
      username: this.username,
      password: this.password
    }
console.log(user);
    this.authService.authenticateUser(user).subscribe(data => {
      if(data.success){
        this.authService.storeUserData(data.token, data.user);
        this.flashMessage.show('You are now logged in', {
          cssClass: 'alert-success',
          timeout: 5000});
       // this.router.navigate(['dashboard']);
       this.navCtrl.push(LocationPage);
      } else {
        this.flashMessage.show(data.msg, {
          cssClass: 'alert-danger',
          timeout: 55000});
       // this.router.navigate(['login']);
         return false;
      }
    });
    
  }



}
