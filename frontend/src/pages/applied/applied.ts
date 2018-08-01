import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { JobActionsProvider } from '../../providers/job-actions/job-actions';


@IonicPage()
@Component({
  selector: 'page-applied',
  templateUrl: 'applied.html',
})
export class AppliedPage {

  appliedjobs: Array<any> = [];
  char: String;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private getjobs: JobActionsProvider) {
  }

  ionViewDidLoad() {
    //this.appliedjobs = null;
    console.log('ionViewDidLoad AppliedPage');
    //geting jobs list from jobs action provider
    this.getjobs.getAppliedjobList().subscribe(data => {
      this.appliedjobs = data;
      console.log(this.appliedjobs);
    })
  }

}
