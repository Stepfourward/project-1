import { Component, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
//import { Http, Headers, RequestOptions } from '@angular/http';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { Chatmsgs } from '../../services/chatmsgs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';


declare var require: any;

@IonicPage()
@Component({
  selector: 'page-chat-box',
  templateUrl: 'chat-box.html',
})
export class ChatBoxPage {

  answer = "";
  Access_token = "174fda8983514f70b4244fee5575e649";
  messages: Chatmsgs[] = [];
  userId : string;
  botId : string = "bot1";
  projectId : string;
  query: string;
  languageCode : string;
  sessionId: string;

  constructor(public navCtrl: NavController,
      public navParams: NavParams,
      public http: HttpClient,public authServices: AuthService) 
      { 
        this.projectId = 'stepfourward-7e702';
        this.sessionId = 'hjhjhshdd89dj';
        this.languageCode = 'en-US';
        this.query = 'hi';
      }
        

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChatBoxPage');
    // this.authServices.getProfile() .subscribe(profile => {
    //   this.userId = profile._id
    // })
  }
  //to go back
  goBack() {
    this.navCtrl.pop();
  }

  ask(question) {
    this.authServices.dialogflow().subscribe(res => {
      console.log(res);
    })
  }
}
  








