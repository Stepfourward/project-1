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
<<<<<<< HEAD
  botId : string = "bot1";
  projectId : string;
  query: string;
  languageCode : string;
  sessionId: string;
=======
  botId : string = "bot_default";
  
>>>>>>> 959523183595d5f95159783a2192c14840bb2266

  constructor(public navCtrl: NavController,
      public navParams: NavParams,
      public http: HttpClient,public authServices: AuthService) 
      { 
<<<<<<< HEAD
        this.projectId = 'stepfourward-7e702';
        this.sessionId = 'hjhjhshdd89dj';
        this.languageCode = 'en-US';
        this.query = 'hi';
=======
        
        this.authServices.getProfile() .subscribe(profile => {
          this.userId = profile.user._id;
          //console.log(profile.user._id);
        })
>>>>>>> 959523183595d5f95159783a2192c14840bb2266
      }
        

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChatBoxPage');
<<<<<<< HEAD
    // this.authServices.getProfile() .subscribe(profile => {
    //   this.userId = profile._id
    // })
=======
    
>>>>>>> 959523183595d5f95159783a2192c14840bb2266
  }
  //to go back
  goBack() {
    this.navCtrl.pop();
  }

  ask(question) {
<<<<<<< HEAD
    this.authServices.dialogflow().subscribe(res => {
      console.log(res);
    })
=======
    let queryData = {
      query: question,
      sessionId: this.userId
    }
    let chat = new Chatmsgs(question, this.botId);
    this.messages.push(chat);
    this.authServices.dialogflow(queryData).subscribe(data => {
      if(data.reply) {
        console.log(data.reply);
        let chat = new Chatmsgs(data.reply,this.userId);
        this.messages.push(chat);
      }
      else {
        console.log('sorry! bot is not responding');
      }
    });
>>>>>>> 959523183595d5f95159783a2192c14840bb2266
  }
}
  








