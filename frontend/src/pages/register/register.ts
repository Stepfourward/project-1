import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { LocationPage} from '../location/location';
import { ValidateService } from '../../services/validate.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import {AuthService} from '../../services/auth.service';
 // import {Router} from '@angular/router';

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name: 'page-register',
  segment: 'register'
})
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  name:string;
  username:string;
  email:string;
  password:any;

  constructor(public navCtrl: NavController,
     public navParams: NavParams,
     private validateService: ValidateService,
     private flashMessage:FlashMessagesService,
     private authService:AuthService,
    ) {
  }

  goBack() {

  	this.navCtrl.pop();
  }

  gotoSigninPage() {
    this.navCtrl.push(LoginPage);
  }

  onRegisterSubmit(){
    const user = {
      name: this.name,
      email: this.email,
      username: this.username,
      password: this.password
    }
    console.log(user);
    // Required Fields
    if(!this.validateService.validateRegister(user)){
      this.flashMessage.show('Please fill in all fields', {cssClass: 'alert-danger', timeout: 4000});
      this.flashMessage.grayOut(true);
      return false;
    }
    
    // Validate Email
    if(!this.validateService.validateEmail(user.email)){
      this.flashMessage.show('Please use a valid email', {cssClass: 'alert-danger', timeout: 4000});
      this.flashMessage.grayOut(true);
      return false;
    }
    // Register user
    this.authService.registerUser(user).subscribe(data => {
      if(data.success){
       this.flashMessage.show('You are now successfully registered, redirecting to Login page..', {cssClass: 'alert-success', timeout: 4000});
       //setTimeout(function(){
        this.navCtrl.push(LoginPage);
      // },4000)
       
       console.log('sucess');
      } else {
        this.flashMessage.show('Something went wrong', {cssClass: 'alert-danger', timeout: 4000});
       // this.router.navigate(['/register']);
       console.log('faild');
       return false;
      }
    });

  }




  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

}
