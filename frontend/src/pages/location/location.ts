import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { NotificationPage } from '../notification/notification';

/**
 * Generated class for the LocationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-location',
  templateUrl: 'location.html',
})
export class LocationPage {

	latitude: any;
	longitude: any;
	 

  constructor(public navCtrl: NavController, public navParams: NavParams,private geolocation: Geolocation) {
  }

  getLocation() {

  	this.geolocation.getCurrentPosition().then((resp) => {
  			this.latitude = resp.coords.latitude;
  			this.longitude = resp.coords.longitude;
  			console.log(this.latitude + "" + this.longitude);
 
		}).catch((error) => {
  		console.log('Error getting location', error);
	});

  }
  notnowbtn() {
  	this.navCtrl.push(NotificationPage);
  }



  ionViewDidLoad() {

    console.log('ionViewDidLoad LocationPage');
  }

}
