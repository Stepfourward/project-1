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
    this.getjobs.getAppliedjobList().then((data) => {
      console.log('displaying list ' + data);
      for (let values of data) {
        this.char = values.companyTitle.charAt(0);
        this.appliedjobs.push(values);
        console.log(this.appliedjobs);
        
      }
    });
  }

}
