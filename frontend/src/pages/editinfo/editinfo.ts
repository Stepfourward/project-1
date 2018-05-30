import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA, Injectable } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { SlidesPage } from '../slides/slides';
import { RegisterPage } from '../register/register';
import { Http } from '@angular/http';
import { ValidateService } from '../../services/validate.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import {AuthService} from '../../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidationService } from '../../app/validation.service';
import { HandleUserDataService } from '../../services/handleUserData.service';
import { FeedsPage } from '../feeds/feeds';
/**
 * Generated class for the EditinfoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
import { Geolocation, Geoposition } from '@ionic-native/geolocation';
import { NativeGeocoder, NativeGeocoderReverseResult } from '@ionic-native/native-geocoder';
@Injectable()
@IonicPage()
@Component({
  selector: 'page-editinfo',
  templateUrl: 'editinfo.html',
})
export class EditinfoPage implements OnInit {
  userSpecificData:object = {name: "", email: "", username: ""};
  currentUserData:any;
  editInfoData: any;
  errMsg:string;
  EditPageUserForm: any;
  name:string;
  username:string;
  email:string;
  password:any;
  phone:any;
  first_name: string;
  last_name: string;
  location:any;
  title:string;
  company:string;
  education:string;
  locationName: any;


  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private validateService: ValidateService,
    private flashMessage:FlashMessagesService,
    private authService:AuthService,
    private formBuilder: FormBuilder,
    public userDataService: HandleUserDataService,
    private geolocation: Geolocation,
    private nativeGeocoder: NativeGeocoder
              ) {
      this.EditPageUserForm = this.formBuilder.group({
        'name': ['', Validators.required],
        'username': ['', Validators.required],
        'email': ['', [Validators.required,ValidationService.emailValidator]],
        'title':['',Validators.required],
        'education':['',Validators.required],
        'location':['',Validators.required],
        'company':['',Validators.required],
        'phone':['',Validators.required]
      });
  }
  ionViewDidLoad() {
  }
  ngOnInit() {
    this.currentUserData = {name: "aleem", email: "shaikaleem.aleem@gmail.com", username: "shak", password: "123456"}
    //this.currentUserData = this.userDataService.IncomingUserData;
    console.log(this.currentUserData)

    this.userDataService.userDataHandler.subscribe (
      data => this.editInfoData = data,
      error => this.errMsg = error.statusText
    );
    console.log('editInfoData', this.editInfoData);

    this.authService.getProfile().subscribe( profile => {
     this.userSpecificData = profile.user
     console.log(this.userSpecificData)
    },
    err => {
      console.log(err);
      return false;
    });
    
    
  }

  toSlides() {
  	this.navCtrl.push(SlidesPage);
  }

  onEditFormSubmit(){
    const user = {
      name: this.name,
      email: this.email,
      username: this.username,
      password: this.password,
      phone:this.phone,
      location:this.location,
      title:this.title,
      company:this.company,
      education:this.education
    }
    
   // this.userDataService.getUserData(user);
    if (this.EditPageUserForm.dirty && this.EditPageUserForm.valid) {
          // Required Fields
          // if(!this.validateService.validateRegister(user)){
          //   this.flashMessage.show('Please fill in all fields', {cssClass: 'alert-danger', timeout: 4000});
          //   this.flashMessage.grayOut(true);
          //   return false;
          // }

          // Validate Email
          if(!this.validateService.validateEmail(user.email)){
            this.flashMessage.show('Please use a valid email', {cssClass: 'alert-danger', timeout: 4000});
            this.flashMessage.grayOut(true);
            return false;
          }

          // Register user
          this.authService.registerUser(user).subscribe(data => {
            if(data.success){
            this.flashMessage.show('You are now successfully registered, redirecting to Login page..', {cssClass: 'alert-success', timeout: 4000});
            //setTimeout(function(){
              this.navCtrl.push(LoginPage);
            // },4000)
            
            console.log('sucess');
            } else {
              this.flashMessage.show('Something went wrong', {cssClass: 'alert-danger', timeout: 4000});
            // this.router.navigate(['/register']);
            console.log('faild');
            return false;
            }
          });
    }
    

  }
  closeEditInfoPage() {
    this.navCtrl.push(FeedsPage);
  }
  getlocation() {
    let options = {
      enableHighAccuracy: true
    };
    this.geolocation.getCurrentPosition(options).then((position: Geoposition) => {
      this.locationName = this.getcountry(position);
      console.log(this.locationName);
    }).catch((err) => {
      console.log(err);
    })
    
  }
  getcountry(pos) {
    this.nativeGeocoder.reverseGeocode(pos.coords.latitude, pos.coords.longitude)
    .then((res: NativeGeocoderReverseResult) => {
      return res.countryName + "," + res.locality;
    }).catch((err) => {
      console.log(err);
    });
  }

}
