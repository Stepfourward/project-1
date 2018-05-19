import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule, IonicPageModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Geolocation } from '@ionic-native/geolocation';
import { NativeGeocoder, NativeGeocoderReverseResult, NativeGeocoderForwardResult } from '@ionic-native/native-geocoder';
import { HttpModule } from '@angular/http';
import { IonTextAvatar } from 'ionic-text-avatar';
import { SwingModule } from 'angular2-swing';
import { IonicSwipeAllModule } from 'ionic-swipe-all';
import { NativePageTransitions, NativeTransitionOptions } from '@ionic-native/native-page-transitions';
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
import { AppliedPage } from '../pages/applied/applied';
import { FailedPage } from '../pages/failed/failed';
import { SavedPage } from '../pages/saved/saved';
import { ModalPage } from '../pages/modal/modal';
import { ValidateService } from '../services/validate.service';
import {FlashMessagesModule} from 'angular2-flash-messages';
import {AuthService} from '../services/auth.service';

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
    JobDetailPage,
    AppliedPage,
    FailedPage,
    SavedPage,
    IonTextAvatar,
    ModalPage,
  ],
  imports: [ 
    FormsModule, 
    BrowserModule,
    IonicModule.forRoot(MyApp),
    FlashMessagesModule.forRoot(),
    HttpModule,
    SwingModule,
    IonicSwipeAllModule,
    // IonicPageModule.forChild(RegisterPage)
   
    

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
    JobDetailPage,
    AppliedPage,
    FailedPage,
    SavedPage,
    ModalPage
    
    
    
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Geolocation,
    NativePageTransitions,
    ValidateService,
    NativeGeocoder,
    AuthService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
