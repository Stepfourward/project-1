import { Component, ViewChild, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { LocationPage} from '../location/location';
import { FlashMessagesService } from 'angular2-flash-messages';
import {AuthService} from '../../services/auth.service';
import { NgZone } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidateService } from '../../services/validate.service';
import { ValidationService } from '../../app/validation.service';

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
export class LoginPage implements OnInit {
  toggleFlashMsgsVariable:boolean = false;
  userForm: any;
  username: any;
  password: any;
  readUsernames:boolean = false;
  readPswd: boolean = false;
  _timeout: any = null;
  ErrorMsgStatus: boolean = false;
   name1: any = '';
   name2: any = '';
  
  // formgroup: FormGroup;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private validateService: ValidateService,
    private flashMessage:FlashMessagesService,
    private authService:AuthService,public lc: NgZone,
    private formBuilder: FormBuilder,
    ) {
      this.userForm = this.formBuilder.group({
        'username': ['', Validators.required],
        'password': ['', [Validators.required, ValidationService.passwordValidator]]
        
      });
}
  ngOnInit() {
   
  } 
  clearErr(event) {
    this.ErrorMsgStatus = false;
  }

  gotoHomepage() {
  	this.navCtrl.push(HomePage);

  }

  ionViewDidLoad() {
    
  }

  // getTheValue(k) {
  //   this.showVal = true;
  // }

  readUserName() {
    this._timeout  = null;
    if(this._timeout){ //if there is already a timeout in process cancel it
      window.clearTimeout(this._timeout);
    }
    this.readUsernames = true;
    this._timeout = window.setTimeout(() => {
       this._timeout = null;
       this.lc.run(() => this.name1 = this.username);
       this.readUsernames = false;
    },2000);
 }
 readPassword() {
  this._timeout  = null;
  if(this._timeout){ //if there is already a timeout in process cancel it
    window.clearTimeout(this._timeout);
  }
  this.readPswd = true;
  this._timeout = window.setTimeout(() => {
     this._timeout = null;
     this.lc.run(() => this.name2 = this.password);
     this.readPswd = false;
  },2000);
}

  onLoginSubmit(){
    const user = {
    username: this.username,
    password: this.password
    }

  if (this.userForm.dirty && this.userForm.valid) {
    this.authService.authenticateUser(user).subscribe(data => {
      if(data.success){
      this.authService.storeUserData(data.token, data.user);
      this.toggleFlashMsgsVariable = true;
      this.flashMessage.show('You are now logged in', {
      cssClass: 'alert-success',
      timeout: 5000});
      // this.router.navigate(['dashboard']);
      //  this.toggleFlashMsgsVariable = false;
      this.navCtrl.push(LocationPage);
      } else {
      this.toggleFlashMsgsVariable = true;
      this.flashMessage.show(data.msg, {
      cssClass: 'alert-danger',
      timeout: 55000});
      //      this.toggleFlashMsgsVariable = false;
      // this.router.navigate(['login']);
      this.ErrorMsgStatus = true;
      return false;
      }
    });
  }
  }
}
