import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { JobActionsProvider } from '../../providers/job-actions/job-actions';


@IonicPage()
@Component({
  selector: 'page-saved',
  templateUrl: 'saved.html',
})
export class SavedPage {

  savedjobs: Array<any> = [];

  constructor(public navCtrl: NavController, public navParams: NavParams,
  private joblist: JobActionsProvider) {
  }

  ionViewDidLoad() {
    console.log('SavedPage');
    //getting and displaying the saved jobs
    this.joblist.getSavedjoblslist().then((data) =>  {
      console.log('displaying saved jobs ' + data);
      for(let values of data) {
        this.savedjobs.push(values);
      }
    });
  }

}
