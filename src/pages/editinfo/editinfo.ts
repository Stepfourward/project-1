import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SlidesPage } from '../slides/slides';


/**
 * Generated class for the EditinfoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-editinfo',
  templateUrl: 'editinfo.html',
})
export class EditinfoPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditinfoPage');
  }

  toSlides() {
  	this.navCtrl.push(SlidesPage);
  }

}
