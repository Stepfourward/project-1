import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SlidesPage } from '../slides/slides';
import { FeedsPage } from '../feeds/feeds';
import { Geolocation, Geoposition } from '@ionic-native/geolocation';
import { NativeGeocoder, NativeGeocoderReverseResult } from '@ionic-native/native-geocoder';

@IonicPage()
@Component({
  selector: 'page-editinfo',
  templateUrl: 'editinfo.html',
})
export class EditinfoPage {
  first_name: string;
  last_name: string;
  phone: string;
  email_id: string;
  title: string;
  company: string;
  education: string;
  locationName: any;


  constructor(public navCtrl: NavController,
     public navParams: NavParams, 
     private geolocation: Geolocation,
     private nativeGeocoder: NativeGeocoder) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditinfoPage');
  }

  toSlides() {
  	this.navCtrl.push(SlidesPage);
  }
  closeEditInfoPage() {
    this.navCtrl.push(FeedsPage);
  }
  getlocation() {
    let options = {
      enableHighAccuracy: true
    };
    this.geolocation.getCurrentPosition(options).then((position: Geoposition) => {
      this.getcountry(position);
      console.log(this.locationName);
    }).catch((err) => {
      console.log(err);
    })
    
  }
  getcountry(pos) {
    this.nativeGeocoder.reverseGeocode(pos.coords.latitude, pos.coords.longitude)
    .then((res: NativeGeocoderReverseResult) => {
      this.locationName = res.countryName + "," + res.locality;
    }).catch((err) => {
      console.log(err);
    });
  }

}
