import { Component, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { Chatmsgs } from '../../services/chatmsgs';

@IonicPage()
@Component({
  selector: 'page-chat-box',
  templateUrl: 'chat-box.html',
})
export class ChatBoxPage {

  answer = "";
  Access_token = "52c27ccb6d7b4485944bd27ab10d706c";
  messages: Chatmsgs[] = [];
  userId : string = "user1";
  botId : string = "bot1";

  constructor(public navCtrl: NavController,
      public navParams: NavParams,
      public http: Http) 
      { }
        

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChatBoxPage');
    //let message = 'Hi! How can I help you?';
    //this.messages.push(message);
  }
  //to go back
  goBack() {
    this.navCtrl.pop();
  }

  ask(question) {
    try {
      let chat = new Chatmsgs(question,"assets/imgs/user_pic.png",this.userId);
      this.messages.push(chat);
      var headers = new Headers();
      headers.append("Accept", 'application/json');
      headers.append('Content-Type', 'application/json' );
      headers.append('Authorization', 'Bearer ' + this.Access_token)
      let options = new RequestOptions({ headers: headers });
   
      let postParams = {
       "lang": "en",
      "query": question ,
      "sessionId": "12345",
      "timezone": "America/New_York"
      }
      
      try{
      this.http.post("https://api.dialogflow.com/v1/query?v=20150910", postParams, options)
        .subscribe(data => {
          let obj = JSON.parse(data['_body']);
          this.answer = obj.result.fulfillment.speech;
          //console.log(data['_body']);
          console.log(this.answer);
          let chat = new Chatmsgs(this.answer,"assets/imgs/bot_image.png",this.botId);
          this.messages.push(chat);
          
         }, error => {
          console.log(error);// Error getting the data
        });
    }
    catch(e){
      console.log(e);
    }
    }
  
  catch(e){
    console.log(e);
  }
  }
  

}
