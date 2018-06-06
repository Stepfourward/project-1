import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController  } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { NotificationPage } from '../notification/notification';
import { NativeGeocoder, NativeGeocoderReverseResult, NativeGeocoderForwardResult } from '@ionic-native/native-geocoder';

@IonicPage()
@Component({
  selector: 'page-location',
  templateUrl: 'location.html',
})
export class LocationPage implements OnInit{

	latitude: any;
	longitude: any;
	 

  constructor(public navCtrl: NavController,
     public navParams: NavParams,
     private geolocation: Geolocation,
     public nativeGeocoder: NativeGeocoder,
     public toastCtrl: ToastController
    ) {
     
  }
  ngOnInit() {
    let toast = this.toastCtrl.create({
      message: 'You are now logged in',
      duration: 2500,
      position: 'top'
    });
    toast.present();
  }

  getLocation() {
  	this.geolocation.getCurrentPosition().then((resp) => {
  			this.latitude = resp.coords.latitude;
  			this.longitude = resp.coords.longitude;
  			console.log(this.latitude + "" + this.longitude);
        this.getTheCountryName(this.latitude, this.longitude);
		}).catch((error) => {
  		console.log('Error getting location', error);
  });
    this.navCtrl.push(NotificationPage);
  }
  notnowbtn() {
  	this.navCtrl.push(NotificationPage);
  }

  getTheCountryName(lat,lon) {
    this.nativeGeocoder.reverseGeocode(lat, lon)
    .then((result: NativeGeocoderReverseResult) => console.log(JSON.stringify(result)))
    .catch((error: any) => console.log(error));
    console.log(lat + ""+ lon);
  }

  ionViewDidLoad() {

    console.log('ionViewDidLoad LocationPage');
  }

}
