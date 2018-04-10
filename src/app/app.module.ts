import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Geolocation } from '@ionic-native/geolocation';
import { HttpModule } from '@angular/http';


import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import {RegisterPage} from '../pages/register/register';
import { LoginPage } from '../pages/login/login';
import { LocationPage } from '../pages/location/location';
import { NotificationPage } from '../pages/notification/notification';
import { EditinfoPage } from '../pages/editinfo/editinfo';
import { SlidesPage } from '../pages/slides/slides';
import { JobPage } from '../pages/job/job';
import { ChatBoxPage } from '../pages/chat-box/chat-box';

import { JobDetailPage } from '../pages/job-detail/job-detail';



@NgModule({
  declarations: [
    MyApp,
    HomePage,
    RegisterPage,
    LoginPage,
    LocationPage,
    NotificationPage,
    EditinfoPage,
    SlidesPage,
    JobPage,
    ChatBoxPage,
    JobDetailPage
    
    
    
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
    

  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    RegisterPage,
    LoginPage,
    LocationPage,
    NotificationPage,
    EditinfoPage,
    SlidesPage,
    JobPage,
    ChatBoxPage,
    JobDetailPage
    
    
    
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Geolocation,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}