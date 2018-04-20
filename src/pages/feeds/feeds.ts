import { Component, ViewChild, ViewChildren, QueryList } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';

import { JobDetailPage } from '../job-detail/job-detail';

import { ModalPage } from '../modal/modal';
import {
  StackConfig,
  DragEvent,
  SwingStackComponent,
  SwingCardComponent
} from 'angular2-swing';
import { HttpClient } from '@angular/common/http';

@IonicPage()
@Component({
  selector: 'page-feeds',
  templateUrl: 'feeds.html',
})
export class FeedsPage {
  @ViewChild('myswing1') swingStack: SwingStackComponent;
  @ViewChildren('mycards1') swingCards: QueryList<SwingCardComponent>;
  stackConfig: StackConfig;
  recentCard: string = '';
  
  
  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController,)
   {
    this.stackConfig = {
      throwOutConfidence: (offset, element: any) => {
        return Math.min(Math.abs(offset) / (element.offsetWidth / 2), 1);
      },
      transform: (element, x, y, r) => {
        this.onItemMove(element, x, y, r);
      },
      throwOutDistance: (d) => {
        return 800;
      }
    };
    
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
  ngAfterViewInit() {
    // Either subscribe in controller or set in HTML
    this.swingStack.throwin.subscribe((event: DragEvent) => {
      event.target.style.background = '#ffffff';
    });

  }
  onItemMove(element, x, y, r) {
    let color = '';
    const abs = Math.abs(x);
    const min = Math.trunc(Math.min(16 * 16 - abs, 16 * 16));
    const hexCode = this.decimalToHex(min, 2);

    if (x > 0) {
      color = '#' + hexCode + 'FF' + hexCode;
    } else {
      color = '#FF' + hexCode + hexCode;
    }

    element.style.background = color;
    element.style['transform'] = `translate3d(0, 0, 0) translate(${x}px, ${y}px) rotate(${r}deg)`;
  }

  
  decimalToHex(d, padding) {
    let hex = Number(d).toString(16);
    const numPadding = typeof (padding) === 'undefined' || padding === null ? 2 : padding;

    while (hex.length < numPadding) {
      hex = '0' + hex;
    }

    return hex;
  }
  

  
  
  
}


