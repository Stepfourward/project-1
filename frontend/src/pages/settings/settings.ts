import { Component, ViewChild, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { FlashMessagesService } from 'angular2-flash-messages';
import {AuthService} from '../../services/auth.service';
import { TermsofusagePage } from '../termsofusage/termsofusage';
import { PolicyPage } from '../policy/policy';


@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {

  userSpecificId: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private flashMessage:FlashMessagesService,
    private authService:AuthService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingsPage');
  }
  onLogOutClick() {
    this.authService.logout();
    this.navCtrl.push(HomePage);

  }
  gotoTermsPage() {
    this.navCtrl.push(TermsofusagePage);
  }

  gotoPolicyPage() {
    this.navCtrl.push(PolicyPage);
  }

  //to delete account
  deleteAccount() {
    this.authService.getProfile().subscribe(profile => {
      this.userSpecificId = profile.user;
    });
    this.authService.deleteUser(this.userSpecificId._id).subscribe(data => {
      if(data.success) {
        this.navCtrl.push(HomePage);
      }
      else{
        alert('something went wrong');
      }
    })
  }

}
