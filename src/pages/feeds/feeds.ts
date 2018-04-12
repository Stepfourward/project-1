import { Component} from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';

import { JobDetailPage } from '../job-detail/job-detail';
import { ModalPage } from '../modal/modal';
/**
 * Generated class for the FeedsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-feeds',
  templateUrl: 'feeds.html',
})
export class FeedsPage {
  
  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController) {
    
    }

    

  ionViewDidLoad() {
    console.log('ionViewDidLoad FeedsPage');
  }

  openPage() {
    this.navCtrl.push(JobDetailPage);
  }
  showAlert() {
    let modal = this.modalCtrl.create(ModalPage);
    modal.present();
    


  }
  
}
