import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { FeedsPage } from '../feeds/feeds';
import { MatchesPage} from '../matches/matches';
import { ConversationPage } from '../conversation/conversation';
import { ProfilePage } from '../profile/profile';
import { SettingsPage } from '../settings/settings'; 
/**
 * Generated class for the JobPage tabs.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-job',
  templateUrl: 'job.html'
})
export class JobPage {

  feedsRoot = 'FeedsPage'
  matchesRoot = 'MatchesPage'
  conversationRoot = 'ConversationPage'
  profileRoot = 'ProfilePage'
  settingsRoot = 'SettingsPage'


  constructor(public navCtrl: NavController) {}

}
