import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { LocationPage} from '../location/location';
import { ValidateService } from '../../services/validate.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import {AuthService} from '../../services/auth.service';
import { ForgotPasswordPage } from '../forgot-password/forgot-password';



@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  toggleFlashMsgs:boolean = true;
  username: String;
  password: String;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private validateService: ValidateService,
    private flashMessage:FlashMessagesService,
    private authService:AuthService,
    public alertCtrl: AlertController) {
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
        this.toggleFlashMsgs = true;
        this.flashMessage.show('You are now logged in', {
          cssClass: 'alert-success',
          timeout: 5000});
       // this.router.navigate(['dashboard']);
       this.toggleFlashMsgs = false;
       this.navCtrl.push(LocationPage);
      } else {
        this.toggleFlashMsgs = true;
        this.flashMessage.show(data.msg, {
          cssClass: 'alert-danger',
          timeout: 55000});
          this.toggleFlashMsgs = false;
       // this.router.navigate(['login']);
         return false;
      }
    });
    
  }
  fp() {
    let prompt = this.alertCtrl.create({
      title: 'Reset Password',
      message: "Enter your email address to reset your password",
      inputs: [
        {
          name: 'emailid',
          placeholder: 'email ID'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Reset',
          handler: data => {
            this.navCtrl.push(ForgotPasswordPage);
          }
        }
      ]
    });
    prompt.present();
  }



}
