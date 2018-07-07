import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { JobActionsProvider } from '../../providers/job-actions/job-actions';


@IonicPage()
@Component({
  selector: 'page-failed',
  templateUrl: 'failed.html',
})
export class FailedPage {

  failedjobs: Array<any> = [];

  constructor(public navCtrl: NavController, 
              public navParams: NavParams, public jobfailList: JobActionsProvider) {
  }

  ionViewDidLoad() {
    console.log('Failed jobs Page');
    // getting jobs from job-actions file and displaying
    this.jobfailList.getfailedjobList().then((data) => {
      console.log('displaying failed job list' + data);
       for (let result of data) {
         this.failedjobs.push(result);
         console.log(this.failedjobs);
       }
    });
  }

}
